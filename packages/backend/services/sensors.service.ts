import { Context, Errors, Service, ServiceSchema } from 'moleculer';
import type {
  DbAdapter,
  DbServiceSettings,
  MoleculerDbMethods,
} from 'moleculer-db';
import type MongoDbAdapter from 'moleculer-db-adapter-mongo';
import { SMART_CITY_DB_NAME } from '../constants';
import type { DbServiceMethods } from '../mixins/db.mixin';
import { createDbServiceMixin } from '../mixins/db.mixin';
import { SensorEntity, SensorStatus } from '@smart-city-unal/shared-types';

export type ActionCreateParams = Partial<SensorEntity>;

// TODO: change me for the type of sensor data
export interface ActionQuantityParams {
  id: string;
  value: number;
}

interface SensorSettings extends DbServiceSettings {
  indexes?: Record<string, number>[];
}

interface SensorsThis extends Service<SensorSettings>, MoleculerDbMethods {
  adapter: DbAdapter | MongoDbAdapter;
}

const SensorsService: ServiceSchema<SensorSettings> & {
  methods: DbServiceMethods;
} = {
  name: 'sensors',
  // version: 1

  /**
   * Mixins
   */
  mixins: [createDbServiceMixin(SMART_CITY_DB_NAME, 'sensors')],

  /**
   * Settings
   */
  settings: {
    // Available fields in the responses
    fields: [
      '_id',
      'customId',
      'name',
      'type',
      'status',
      'location',
      'measurementFrequency',
      'createdAt',
    ],

    // Validator for the `create` & `insert` actions.
    entityValidator: {
      customId: 'string|min:3',
      name: 'string|min:3',
      location: {
        type: 'object',
        props: {
          lat: 'number',
          lon: 'number',
        },
        optional: true,
      },
      // Measurement frequency in seconds
      measurementFrequency: { type: 'number', min: 0, optional: true },
    },

    indexes: [{ name: 1 }],
  },

  /**
   * Action Hooks
   */
  hooks: {
    before: {
      /**
       * Register a before hook for the `create` action.
       * It sets a default value for the measurementFrequency field.
       */
      // create(ctx: Context<ActionCreateParams>) {
      //   ctx.params.measurementFrequency = 60;
      // },
    },
  },

  /**
   * Actions
   */
  actions: {
    /**
     * The "moleculer-db" mixin registers the following actions:
     *  - list
     *  - find
     *  - count
     *  - create
     *  - insert
     *  - update
     *  - remove
     */
    // --- ADDITIONAL ACTIONS ---
    list: {
      cache: false,
    },
    create: process.env.NODE_ENV === 'test' ? true : false,
    register: {
      rest: 'POST /',
      params: {
        name: 'string|min:3',
        customId: 'string|min:3',
        type: 'string',
        location: {
          type: 'object',
          props: {
            lat: 'number',
            lon: 'number',
          },
          optional: true,
        },
        measurementFrequency: { type: 'number', min: 0, optional: true },
      },
      async handler(ctx: Context<ActionCreateParams>) {
        this.logger.info('Registering a new user', ctx.params);

        const entity = {
          ...ctx.params,
          status: SensorStatus.WAITING,
          createdAt: new Date(),
        };

        await this.validateEntity(entity);

        const foundByCustomId = await this.adapter.findOne({
          customId: entity.customId,
        });

        // TODO: validate sensor type
        if (foundByCustomId) {
          throw new Errors.MoleculerClientError(
            'Custom ID is exist!',
            422,
            '',
            [{ field: 'customId', message: 'is exist' }]
          );
        }

        const doc = await this.adapter.insert(entity);
        const transformedSensor = await this.transformDocuments(
          ctx,
          ctx.params,
          doc
        );
        await this.entityChanged('created', transformedSensor, ctx);

        return transformedSensor;
      },
    },
    findByCustomId: {
      rest: 'GET /:customId',
      async handler(ctx: Context<{ customId: string }>) {
        const sensor = await this.adapter.findOne({
          customId: ctx.params.customId,
        });

        // Do not throw an error if the sensor is not found for load tests
        if (!sensor && process.env.NODE_ENV !== 'test') {
          throw new Errors.MoleculerClientError('Sensor not found', 404, '', [
            { field: 'customId', message: 'not found' },
          ]);
        }

        return this.transformDocuments(ctx, {}, sensor);
      },
    },
  },

  /**
   * Methods
   */
  methods: {
    /**
     * Loading sample data to the collection.
     * It is called in the DB.mixin after the database
     * connection establishing & the collection is empty.
     */
    async seedDB(this: SensorsThis) {
      await this.adapter.insertMany([
        {
          customId: 'AQ00',
          userId: 'user-1',
          name: 'AirQualityUnit00',
          type: 'air_quality_standard',
          status: SensorStatus.ACTIVE,
          measurementFrequency: 120,
          location: { lat: 5.833644803443941, lon: -73.01971685262258 },
          createdAt: new Date(),
        },
        {
          customId: 'AQ01',
          userId: 'user-1',
          name: 'AirQualityUnit01',
          type: 'air_quality_standard',
          status: SensorStatus.ACTIVE,
          measurementFrequency: 120,
          location: { lat: 5.822111411690199, lon: -73.04992465374539 },
          createdAt: new Date(),
        },
        {
          customId: 'AQ02',
          userId: 'user-1',
          name: 'AirQualityUnit02',
          type: 'air_quality_standard',
          status: SensorStatus.WAITING,
          measurementFrequency: 120,
          location: {
            lat: 5.83307471269905,
            lon: -73.0268232217087,
          },
          createdAt: new Date(),
        },
      ]);
    },
  },

  /**
   * Fired after database connection establishing.
   */
  async afterConnected(this: SensorsThis) {
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

export default SensorsService;
