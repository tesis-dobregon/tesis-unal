// TODO: move to shared package
export type SensorId = string;
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
  lng: number;
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
    lng: -73.04845685741972,
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
