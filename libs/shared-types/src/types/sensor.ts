export type SensorId = string;

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

export type SensorMetadata = {
  type: string;
};

export type SensorBaseData = {
  /**
   * Date when the data was collected
   * Example: '2024-08-08T00:28:59.935Z'
   */
  date: string;
  /**
   * Sensor unique identifier provided by the sensor supplier.
   * Example: AQ02
   */
  uid: SensorId;
  name: string;
  description: string;
  lat: number;
  lon: number;
  metadata?: SensorMetadata;
};

/**
 * Type used for the data collected by the sensor type
 * air_quality_standard
 * Example data collected by this sensor type:
 * 
  {
    date: '2024-08-08T00:28:59.935Z',
    uid: 'AQ02',
    name: 'AirQualityUnit02',
    description: 'Air quality station in Duitama 2',
    lat: 5.810082209872709,
    lon: -73.04845685741972,
    metadata: { type: 'air_quality_standard' },
    co: 6,
    co2: 475,
    pm10: 92,
    pm2_5: 23,
    pm5: 14,
    hr: 69.42,
    temperature: 10.81
  }
 */
export type AirQualityStandardSensorData = {
  co: number;
  co2: number;
  pm10: number;
  pm2_5: number;
  pm5: number;
  hr: number;
  temperature: number;
};

export type SensorData = SensorBaseData & Partial<AirQualityStandardSensorData>;
