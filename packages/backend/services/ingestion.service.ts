import { SensorData } from '@smart-city-unal/shared-types';
import { Context, Errors, Service, ServiceSchema } from 'moleculer';
import type {
  DbAdapter,
  DbServiceSettings,
  MoleculerDbMethods,
} from 'moleculer-db';
import type MongoDbAdapter from 'moleculer-db-adapter-mongo';
import { SMART_CITY_DB_NAME } from '../constants';
import { createDbServiceMixin } from '../mixins/db.mixin';
import { SensorStatus } from '@smart-city-unal/shared-types';

export type SensorCollectedData = {
  _id: string;
  createdAt: Date;
} & SensorData;

export type ActionCreateParams = {
  sensorId: string;
  data: Partial<SensorCollectedData>;
};

interface SensorCollectedDataSettings extends DbServiceSettings {
  indexes?: Record<string, number>[];
}

interface IngestionThis
  extends Service<SensorCollectedDataSettings>,
    MoleculerDbMethods {
  adapter: DbAdapter | MongoDbAdapter;
}

const IngestionService: ServiceSchema<SensorCollectedDataSettings> = {
  name: 'ingestion',
  // version: 1

  /**
   * Mixins
   */
  mixins: [createDbServiceMixin(SMART_CITY_DB_NAME, 'sensor-data')],

  /**
   * Settings
   */
  settings: {
    // Available fields in the responses
    fields: [
      '_id',
      'date',
      'uid',
      'name',
      'description',
      'lat',
      'lon',
      'metadata',
      'co',
      'co2',
      'pm10',
      'pm5',
      'pm2_5',
      'hr',
      'temperature',
      'createdAt',
    ],

    indexes: [{ uid: 1 }, { name: 1 }, { createdAt: 1 }],
  },

  /**
   * Action Hooks
   */
  hooks: {},

  /**
   * Actions
   */
  actions: {
    list: false,
    get: false,
    update: false,
    remove: false,
    create: false,
    insert: false,
    recordSensorData: {
      rest: 'POST /:sensorId/data',
      params: {
        sensorId: 'string',
        data: {
          type: 'object',
          props: {
            date: 'string',
            uid: 'string',
            name: 'string',
            description: { type: 'string', optional: true },
            lat: { type: 'number', optional: true },
            lon: { type: 'number', optional: true },
            metadata: {
              type: 'object',
              props: {
                type: 'string',
              },
            },
            co: { type: 'number', optional: true },
            co2: { type: 'number', optional: true },
            pm10: { type: 'number', optional: true },
            pm2_5: { type: 'number', optional: true },
            hr: { type: 'number', optional: true },
            temperature: { type: 'number', optional: true },
          },
        },
      },
      async handler(ctx: Context<ActionCreateParams>) {
        this.broker.logger.info('Processing sensor data', ctx.params);
        /**
       * Example data:
          {
            "data": {
              "date": "2024-08-14T02:50:54.014Z",
              "uid": "AQ02",
              "name": "AirQualityUnit02",
              "description": "Air quality station in Duitama 2",
              "lat": 5.808055396578313,
              "lon": -73.04021022387752,
              "metadata": {
                "type": "air_quality_standard"
              },
              "co": 27,
              "co2": 461,
              "pm10": 1,
              "pm2_5": 29,
              "pm5": 10,
              "hr": 78.33,
              "temperature": 20
            },
            "sensorId": "AQ02"
          }
       */
        // TODO: implement cache here
        // Check if the sensor exists
        const sensor: any = await this.broker.call('sensors.findByCustomId', {
          customId: ctx.params.sensorId,
        });
        if (!sensor) {
          throw new Errors.MoleculerClientError('Sensor not found!', 422, '', [
            { field: 'sensorId', message: 'not found' },
          ]);
        }

        if (sensor.status === SensorStatus.WAITING) {
          // Activate the sensor
          await this.broker.call('sensors.update', {
            id: sensor._id,
            status: SensorStatus.ACTIVE,
          });
        }

        // Save the data
        const data = await this.adapter.insert({
          ...ctx.params.data,
          createdAt: new Date(),
        });

        return data;
      },
    },
    listSensorData: {
      rest: 'GET /',
      params: {
        // Filter by sensorId
        sensorId: { type: 'string', optional: true },
        // Filter by date range
        startDate: { type: 'string', optional: true },
        endDate: { type: 'string', optional: true },
      },
      async handler(
        ctx: Context<{
          sensorId?: string;
          startDate?: string;
          endDate?: string;
        }>
      ): Promise<SensorCollectedData[]> {
        const { sensorId, startDate, endDate } = ctx.params;
        const query = {
          ...(sensorId && { uid: sensorId }),
          ...(startDate &&
            endDate && {
              createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
            }),
          ...(startDate &&
            !endDate && { createdAt: { $gte: new Date(startDate) } }),
          ...(endDate &&
            !startDate && { createdAt: { $lte: new Date(endDate) } }),
        };
        const result = await this.adapter.find({
          query,
          // Sort by createdAt in descending order
          sort: { createdAt: -1 },
        });
        const transformed = await this.transformDocuments(
          ctx,
          ctx.params,
          result
        );
        return transformed;
      },
    },
  },

  /**
   * Fired after database connection establishing.
   */
  async afterConnected(this: IngestionThis) {
    if ('collection' in this.adapter) {
      if (this.settings.indexes) {
        await Promise.all(
          this.settings.indexes.map((index) =>
            (<MongoDbAdapter>this.adapter).collection.createIndex(index)
          )
        );
      }
    }
  },
};

export default IngestionService;
