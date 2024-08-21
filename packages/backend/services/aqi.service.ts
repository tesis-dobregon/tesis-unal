// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Schedule from 'moleculer-schedule';
import { Service, ServiceSchema } from 'moleculer';
import type {
  DbAdapter,
  DbServiceSettings,
  MoleculerDbMethods,
} from 'moleculer-db';
import type MongoDbAdapter from 'moleculer-db-adapter-mongo';
import { createDbServiceMixin } from '../mixins/db.mixin';
import { SensorCollectedData } from './ingestion.service';
import { SMART_CITY_DB_NAME } from '../constants';

export type AQIData = {
  _id: string;
  pm2_5: number;
  pm10: number;
  o3: number;
  no2: number;
  co: number;
  so2: number;
  createdAt: Date;
};

export enum Pollutants {
  PM2_5 = 'PM2.5',
  PM10 = 'PM10',
  O3 = 'O3',
  NO2 = 'NO2',
  CO = 'CO',
  SO2 = 'SO2',
}

export type ActionCreateParams = Partial<AQIData>;

interface AQISettings extends DbServiceSettings {
  indexes?: Record<string, number>[];
}

interface AQIThis extends Service<AQISettings>, MoleculerDbMethods {
  adapter: DbAdapter | MongoDbAdapter;
}

const AQIService: ServiceSchema<AQISettings> = {
  name: 'aqi',
  // version: 1,

  /**
   * Mixins
   */
  mixins: [createDbServiceMixin(SMART_CITY_DB_NAME, 'aqi'), Schedule],

  jobs: [
    // TODO: recompute AQI every exact hour (e.g. 1:00, 2:00, 3:00, etc.)
    // 0 * * * *
    // Recompute AQI every 1 minute
    {
      // rule: '* * * * *',
      // rule: '*/5 * * * * *',
      rule: '0 * * * *',
      handler: 'compute',
    },
  ],

  /**
   * Settings
   */
  settings: {
    // Available fields in the responses
    fields: ['_id', 'pm2_5', 'pm10', 'o3', 'no2', 'co', 'so2', 'createdAt'],

    // Validator for the `create` & `insert` actions.
    entityValidator: {
      pm2_5: { type: 'number', min: 0, optional: true },
      pm10: { type: 'number', min: 0, optional: true },
      o3: { type: 'number', min: 0, optional: true },
      no2: { type: 'number', min: 0, optional: true },
      co: { type: 'number', min: 0, optional: true },
      so2: { type: 'number', min: 0, optional: true },
    },

    indexes: [{ createdAt: 1 }],
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
    update: false,
    remove: false,
    create: false,
    insert: false,
  },
  methods: {
    // ******** NOTE ***********
    // Currently the data collected by the sensors only includes the values for pm10, pm2_5 and co so
    // the AQI will be calculated only for those contaminants.
    // The code can be extended to include the calculation of the AQI for the rest of the contaminants
    async compute() {
      // The AQI for pm10 and pm2_5 is calculated based on the average of the last 24 hours
      const dataFromLast24Hours: SensorCollectedData[] = await this.broker.call(
        'ingestion.listSensorData',
        {
          query: {
            createdAt: {
              $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        }
      );
      // Get the sum of the pm10 and pm2_5 values for the last 24 hours
      const { pm10Sum, pm2_5Sum } = dataFromLast24Hours.reduce(
        (acc, data) => {
          acc.pm10Sum += data.pm10 ?? 0;
          acc.pm2_5Sum += data.pm2_5 ?? 0;
          return acc;
        },
        { pm10Sum: 0, pm2_5Sum: 0 }
      );
      // Calculate the average of the pm10 and pm2_5 values for the last 24 hours
      const totalDataFromLast24Hours = dataFromLast24Hours.length;
      const pm10Average = pm10Sum / totalDataFromLast24Hours;
      const pm2_5Average = pm2_5Sum / totalDataFromLast24Hours;
      // Calculate the AQI for pm10 and pm2_5
      const aqiForPm10 = this.calculateAqi(Pollutants.PM10, pm10Average);
      const aqiForPm2_5 = this.calculateAqi(Pollutants.PM2_5, pm2_5Average);
      // The AQI for co is calculated based on the average of the last 8 hours
      const dataFromLast8Hours: SensorCollectedData[] = await this.broker.call(
        'ingestion.listSensorData',
        {
          query: {
            createdAt: {
              $gte: new Date(Date.now() - 8 * 60 * 60 * 1000),
            },
          },
        }
      );
      // Get the sum of the co values for the last 8 hours
      const coSum = dataFromLast8Hours.reduce(
        (acc, data) => (acc += data.co ?? 0),
        0
      );
      // Calculate the average of the co values for the last 8 hours
      const totalDataFromLast8Hours = dataFromLast8Hours.length;
      const coAverage = coSum / totalDataFromLast8Hours;
      // Calculate the AQI for co
      const aqiForCo = this.calculateAqi(Pollutants.CO, coAverage);
      this.broker.logger.info(
        `AQI for pm10: ${aqiForPm10}, AQI for pm2_5: ${aqiForPm2_5}, AQI for co: ${aqiForCo}`
      );
      // TODO: publish event to be listened by the alerts service
      // Then persist the data in the database
      const aqi = await this.adapter.insert({
        pm2_5: aqiForPm2_5,
        pm10: aqiForPm10,
        co: aqiForCo,
        createdAt: new Date(),
      });

      // Generate an event to be listened by the alerts service
      this.broker.emit('aqi.created', aqi);

      return aqi;
    },
    // The calculation of the AQI is based on the following formula:
    // IDEAM formula - https://www.ideam.gov.co/documents/24155/125494/35-HM+%C3%8Dndice+calidad+aire+3+FI.pdf/6c0c641a-0c9a-430d-9c37-93d3069c595b
    calculateAqi(pollutant: Pollutants, value: number) {
      // this.broker.logger.info('calculating AQI');
      const { PCAlto, PCBajo, IAlto, IBajo } = this.getPollutantValues(
        pollutant,
        value
      );
      return ((IAlto - IBajo) / (PCAlto - PCBajo)) * (value - PCBajo) + IBajo;
    },
    getPollutantValues(pollutant: string, value: number) {
      switch (pollutant) {
        case Pollutants.PM2_5:
          return this.getAqiPm2_5(value);
        case Pollutants.PM10:
          return this.getAqiPm10(value);
        case Pollutants.O3:
          return this.getAqiO3(value);
        case Pollutants.NO2:
          return this.getAqiNo2(value);
        case Pollutants.CO:
          return this.getAqiCo(value);
        case Pollutants.SO2:
          return this.getAqiSo2(value);
        default:
          throw new Error('Invalid pollutant');
      }
    },
    // Logic to calculate AQI for pm2_5 pollutant - 24 hours
    getAqiPm2_5(pm2_5: number) {
      if (pm2_5 >= 0 && pm2_5 <= 12) {
        return { PCAlto: 12, PCBajo: 0, IAlto: 50, IBajo: 0 };
      }
      if (pm2_5 > 12 && pm2_5 <= 37) {
        return { PCAlto: 37, PCBajo: 13, IAlto: 100, IBajo: 51 };
      }
      if (pm2_5 > 37 && pm2_5 <= 55) {
        return { PCAlto: 55, PCBajo: 38, IAlto: 150, IBajo: 101 };
      }
      if (pm2_5 > 55 && pm2_5 <= 150) {
        return { PCAlto: 150, PCBajo: 56, IAlto: 200, IBajo: 151 };
      }
      if (pm2_5 > 150 && pm2_5 <= 250) {
        return { PCAlto: 250, PCBajo: 151, IAlto: 300, IBajo: 201 };
      }
      if (pm2_5 > 250 && pm2_5 <= 500) {
        return { PCAlto: 500, PCBajo: 251, IAlto: 500, IBajo: 301 };
      }
      throw new Error('Invalid value for pm2_5');
    },
    // Logic to calculate AQI for pm10 pollutant - 24 hours
    getAqiPm10(pm10: number) {
      if (pm10 >= 0 && pm10 <= 54) {
        return { PCAlto: 54, PCBajo: 0, IAlto: 50, IBajo: 0 };
      }
      if (pm10 > 54 && pm10 <= 154) {
        return { PCAlto: 154, PCBajo: 55, IAlto: 100, IBajo: 51 };
      }
      if (pm10 > 154 && pm10 <= 254) {
        return { PCAlto: 254, PCBajo: 155, IAlto: 150, IBajo: 101 };
      }
      if (pm10 > 254 && pm10 <= 354) {
        return { PCAlto: 354, PCBajo: 255, IAlto: 200, IBajo: 151 };
      }
      if (pm10 > 354 && pm10 <= 424) {
        return { PCAlto: 424, PCBajo: 355, IAlto: 300, IBajo: 201 };
      }
      if (pm10 > 424 && pm10 <= 604) {
        return { PCAlto: 604, PCBajo: 425, IAlto: 500, IBajo: 301 };
      }
      throw new Error('Invalid value for pm10');
    },
    // Logic to calculate AQI for o3 pollutant - 8 hours
    getAqiO3(o3: number) {
      if (o3 >= 0 && o3 <= 106) {
        return { PCAlto: 106, PCBajo: 0, IAlto: 50, IBajo: 0 };
      }
      if (o3 > 106 && o3 <= 138) {
        return { PCAlto: 138, PCBajo: 107, IAlto: 100, IBajo: 51 };
      }
      if (o3 > 138 && o3 <= 167) {
        return { PCAlto: 167, PCBajo: 139, IAlto: 150, IBajo: 101 };
      }
      if (o3 > 167 && o3 <= 207) {
        return { PCAlto: 207, PCBajo: 168, IAlto: 200, IBajo: 151 };
      }
      if (o3 > 207 && o3 <= 393) {
        return { PCAlto: 393, PCBajo: 208, IAlto: 300, IBajo: 201 };
      }
      if (o3 > 393) {
        return { PCAlto: 393, PCBajo: 394, IAlto: 500, IBajo: 301 };
      }
      throw new Error('Invalid value for o3');
    },
    // Logic to calculate AQI for no2 pollutant - 1 hour
    getAqiNo2(no2: number) {
      if (no2 >= 0 && no2 <= 100) {
        return { PCAlto: 100, PCBajo: 0, IAlto: 50, IBajo: 0 };
      }
      if (no2 > 100 && no2 <= 189) {
        return { PCAlto: 189, PCBajo: 101, IAlto: 100, IBajo: 51 };
      }
      if (no2 > 189 && no2 <= 677) {
        return { PCAlto: 677, PCBajo: 190, IAlto: 150, IBajo: 101 };
      }
      if (no2 > 677 && no2 <= 1221) {
        return { PCAlto: 1221, PCBajo: 678, IAlto: 200, IBajo: 151 };
      }
      if (no2 > 1221 && no2 <= 2349) {
        return { PCAlto: 2349, PCBajo: 1222, IAlto: 300, IBajo: 201 };
      }
      if (no2 > 2349 && no2 <= 3853) {
        return { PCAlto: 3853, PCBajo: 2350, IAlto: 500, IBajo: 301 };
      }
      throw new Error('Invalid value for no2');
    },
    // Logic to calculate AQI for co pollutant - 8 hours
    getAqiCo(co: number) {
      if (co >= 0 && co <= 4.4) {
        return { PCAlto: 4.4, PCBajo: 0, IAlto: 50, IBajo: 0 };
      }
      if (co > 4.4 && co <= 9.4) {
        return { PCAlto: 9.4, PCBajo: 4.5, IAlto: 100, IBajo: 51 };
      }
      if (co > 9.4 && co <= 12.4) {
        return { PCAlto: 12.4, PCBajo: 9.5, IAlto: 150, IBajo: 101 };
      }
      if (co > 12.4 && co <= 15.4) {
        return { PCAlto: 15.4, PCBajo: 12.5, IAlto: 200, IBajo: 151 };
      }
      if (co > 15.4 && co <= 30.4) {
        return { PCAlto: 30.4, PCBajo: 15.5, IAlto: 300, IBajo: 201 };
      }
      if (co > 30.4) {
        return { PCAlto: 30.4, PCBajo: 30.5, IAlto: 500, IBajo: 301 };
      }
      throw new Error('Invalid value for co');
    },
    // Logic to calculate AQI for so2 pollutant - 1 hour
    getAqiSo2(so2: number) {
      if (so2 >= 0 && so2 <= 93) {
        return { PCAlto: 93, PCBajo: 0, IAlto: 50, IBajo: 0 };
      }
      if (so2 > 93 && so2 <= 197) {
        return { PCAlto: 197, PCBajo: 94, IAlto: 100, IBajo: 51 };
      }
      if (so2 > 197 && so2 <= 486) {
        return { PCAlto: 486, PCBajo: 198, IAlto: 150, IBajo: 101 };
      }
      if (so2 > 486 && so2 <= 797) {
        return { PCAlto: 797, PCBajo: 487, IAlto: 200, IBajo: 151 };
      }
      if (so2 > 797 && so2 <= 1583) {
        return { PCAlto: 1583, PCBajo: 798, IAlto: 300, IBajo: 201 };
      }
      if (so2 > 1583 && so2 <= 2629) {
        return { PCAlto: 2629, PCBajo: 1584, IAlto: 500, IBajo: 301 };
      }
      throw new Error('Invalid value for so2');
    },
  },

  /**
   * Fired after database connection establishing.
   */
  async afterConnected(this: AQIThis) {
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

export default AQIService;
