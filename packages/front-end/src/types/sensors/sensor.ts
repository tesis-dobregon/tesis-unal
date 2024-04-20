export interface Sensor {
  name: string;
  sensorType: SensorType;
  identifier: string;
  frequency: Frequency;
}

export interface SensorType {
  name: string;
  id: number;
}

export interface Frequency {
  id: number;
  name: string;
  minutes: number;
}
