import { Context, Service, ServiceSchema } from 'moleculer';
import type {
  DbAdapter,
  DbServiceSettings,
  MoleculerDbMethods,
} from 'moleculer-db';
import type MongoDbAdapter from 'moleculer-db-adapter-mongo';
import { SMART_CITY_DB_NAME } from '../constants';
import { createDbServiceMixin } from '../mixins/db.mixin';
import { AQIData } from './aqi.service';

export enum AlertAction {
  EMAIL = 'email',
  // This can be extended to other actions like SMS, push notifications, etc.
}

export type AlertMetadata = {
  email: string;
};

export type Alert = {
  _id: string;
  contaminant: string;
  lowerThreshold: number;
  upperThreshold: number;
  action: AlertAction;
  metadata: AlertMetadata;
  message: string;
  createdAt: Date;
};

export type ActionCreateParams = Partial<AlertMetadata>;

interface AlertsSettings extends DbServiceSettings {
  indexes?: Record<string, number>[];
}

interface AlertsThis extends Service<AlertsSettings>, MoleculerDbMethods {
  adapter: DbAdapter | MongoDbAdapter;
}

const AlertsService: ServiceSchema<AlertsSettings> = {
  name: 'alerts',
  // version: 1

  /**
   * Mixins
   */
  mixins: [createDbServiceMixin(SMART_CITY_DB_NAME, 'alerts')],

  events: {
    'aqi.created': {
      async handler(this: AlertsThis, ctx: Context<AQIData>) {
        this.broker.logger.info('Received AQI data:', ctx.params);
        const alertsForPm2_5 = (await this.adapter.find({
          query: {
            contaminant: 'pm2_5',
            lowerThreshold: { $lte: ctx.params.pm2_5 },
            upperThreshold: { $gte: ctx.params.pm2_5 },
          },
        })) as Alert[];
        const alertsForPm10 = (await this.adapter.find({
          query: {
            contaminant: 'pm10',
            lowerThreshold: { $lte: ctx.params.pm10 },
            upperThreshold: { $gte: ctx.params.pm10 },
          },
        })) as Alert[];
        const alertsForCo = (await this.adapter.find({
          query: {
            contaminant: 'co',
            lowerThreshold: { $lte: ctx.params.co },
            upperThreshold: { $gte: ctx.params.co },
          },
        })) as Alert[];
        const alerts: Alert[] = [
          ...alertsForPm2_5,
          ...alertsForPm10,
          ...alertsForCo,
        ];
        for (const alert of alerts) {
          if (alert.action === AlertAction.EMAIL) {
            this.broker.logger.info('Sending email to:', alert.metadata.email);
            // Send an email to the alert.metadata.email
            if (process.env.MAIL_ENABLED === 'true') {
              this.broker.call('mail.send', {
                to: alert.metadata.email,
                template: 'alerts',
                language: 'es',
                data: {
                  message: alert.message,
                  contaminant: alert.contaminant,
                  lowerThreshold: alert.lowerThreshold,
                  upperThreshold: alert.upperThreshold,
                  value: (ctx.params as any)[alert.contaminant],
                },
              });
            } else {
              this.broker.logger.warn('Email sending is disabled');
            }
          } else {
            this.broker.logger.warn('Unsupported action:', alert.action);
          }
        }
      },
    },
  },

  /**
   * Settings
   */
  settings: {
    // Available fields in the responses
    fields: [
      '_id',
      'contaminant',
      'lowerThreshold',
      'upperThreshold',
      'action',
      'metadata',
      'message',
      'createdAt',
    ],

    indexes: [{ contaminant: 1 }, { createdAt: 1 }],
  },

  /**
   * Action Hooks
   */
  hooks: {},

  /**
   * Actions
   */
  actions: {
    get: false,
    insert: false,
    create: {
      rest: 'POST /',
      params: {
        contaminant: 'string',
        lowerThreshold: 'number',
        upperThreshold: 'number',
        action: 'string',
        metadata: {
          type: 'object',
          props: {
            email: 'email',
          },
        },
        message: { type: 'string', optional: true },
      },
      async handler(
        this: AlertsThis,
        ctx: Context<
          {
            contaminant: string;
            lowerThreshold: number;
            upperThreshold: number;
            action: AlertAction;
            metadata: AlertMetadata;
            message?: string;
          },
          Alert
        >
      ) {
        this.logger.info('Creating a new alert', ctx.params);
        const entity = {
          ...ctx.params,
          createdAt: new Date(),
        };
        await this.validateEntity(entity);
        return this.adapter.insert(entity);
      },
    },
    update: {
      rest: 'PUT /:id',
      params: {
        id: 'string',
        contaminant: { type: 'string', optional: true },
        lowerThreshold: { type: 'number', optional: true },
        upperThreshold: { type: 'number', optional: true },
        action: { type: 'string', optional: true },
        metadata: {
          type: 'object',
          props: {
            email: { type: 'email', optional: true },
          },
          optional: true,
        },
        message: { type: 'string', optional: true },
      },
      async handler(
        this: AlertsThis,
        ctx: Context<
          {
            id: string;
            contaminant?: string;
            lowerThreshold?: number;
            upperThreshold?: number;
            action?: AlertAction;
            metadata?: AlertMetadata;
            message?: string;
          },
          Alert
        >
      ) {
        this.logger.info('Updating an alert', ctx.params);
        const entity = await this.adapter.updateById(ctx.params.id, {
          $set: ctx.params,
        });
        return entity;
      },
    },
  },

  /**
   * Fired after database connection establishing.
   */
  async afterConnected(this: AlertsThis) {
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

export default AlertsService;
