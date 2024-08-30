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
  PM2_5 = 'pm2_5',
  PM10 = 'pm10',
  O3 = 'o3',
  NO2 = 'no2',
  CO = 'co',
  SO2 = 'so2',
}

export type LatestAQI = {
  pollutant: number;
  createdAt: Date;
};
