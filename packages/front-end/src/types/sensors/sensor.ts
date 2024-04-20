export interface sensor {
    name:string;
    sensorType: sensorType;
    identifier: string;
    frequency: frequency
}

export interface sensorType {
    name: string;
    id: number;
}

export interface frequency{
    id: number;
    name: string;
    minutes: number;
}