export interface Sensor {
  name: string;
  sensorType: SensorType;
  identifier: string;
  frequency: Frequency;
  lastUpdate?: Date;
  state: State
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

export interface State{
  id: number;
  name: string;
}
