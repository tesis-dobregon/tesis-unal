import { Context, Errors, Service, ServiceSchema } from 'moleculer';
import type {
  DbAdapter,
  DbServiceSettings,
  MoleculerDbMethods,
} from 'moleculer-db';
import type MongoDbAdapter from 'moleculer-db-adapter-mongo';
import type { DbServiceMethods } from '../mixins/db.mixin';
import { createDbServiceMixin } from '../mixins/db.mixin';

export enum SensorStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface SensorEntity {
  _id: string;
  /**
   * The custom ID of the sensor given by the user in the UI.
   */
  customId: string;
  /**
   * The user ID that owns the sensor.
   */
  userId: string;
  /**
   * The name of the sensor.
   */
  name: string;
  /**
   * The type of the sensor.
   */
  type: string;
  /**
   * The status of the sensor.
   */
  status: SensorStatus;
  /**
   * The frequency of the measurement in seconds.
   * It is used to determine how often the sensor should be polled.
   * The default value is 60 seconds.
   * The minimum value is 1 second.
   */
  measurementFrequency: number;
  /**
   * The location of the sensor.
   */
  location?: {
    /**
     * The latitude of the sensor.
     */
    lat: number;
    /**
     * The longitude of the sensor.
     */
    lon: number;
  };
  createdAt: Date;
}

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
  mixins: [createDbServiceMixin('sensors')],

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
    create: false,
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
            409,
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
    processData: {
      async handler(ctx: Context<ActionQuantityParams>) {
        this.logger.info('Processing sensor data', ctx.params);

        /**
        const { id, value } = ctx.params;

        const sensor = await this.adapter.findById(id);

        if (!sensor) {
          throw new Errors.MoleculerClientError('Sensor not found!', 404, '', [
            { field: 'id', message: 'not found' },
          ]);
        }
        */
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
          customId: 'sensor-1',
          userId: 'user-1',
          name: 'Temperature Sensor',
          type: 'temperature',
          status: SensorStatus.WAITING,
          measurementFrequency: 60,
          location: { lat: 0, lon: 0 },
          createdAt: new Date(),
        },
        {
          customId: 'sensor-2',
          userId: 'user-1',
          name: 'Humidity Sensor',
          type: 'humidity',
          status: SensorStatus.WAITING,
          measurementFrequency: 60,
          location: { lat: 0, lon: 0 },
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
