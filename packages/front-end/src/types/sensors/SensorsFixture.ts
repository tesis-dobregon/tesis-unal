import { Sensor } from "./sensor";

export const SensorsList: Sensor[] = [
  {
    name: "sensor xx",
    sensorType: {
      name: "tipo 1",
      id: 1,
    },
    identifier: "1",
    frequency: {
      minutes: 10,
      name: "10 minutos",
      id: 1,
    },
    state:{
      id: 1,
      name: "Active"
    }
  },
  {
    name: "sensor yy",
    sensorType: {
      name: "tipo 2",
      id: 1,
    },
    identifier: "2",
    frequency: {
      minutes: 20,
      name: "15 minutos",
      id: 2,
    },
    state:{
      id: 2,
      name: "Deactive"
    }
  },
  {
    name: "sensor zz",
    sensorType: {
      name: "tipo 3",
      id: 1,
    },
    identifier: "3",
    frequency: {
      minutes: 30,
      name: "10 minutos",
      id: 3,
    },
    state:{
      id: 1,
      name: "Active"
    }
  },
  {
    name: "sensor aa",
    sensorType: {
      name: "tipo 4",
      id: 1,
    },
    identifier: "4",
    frequency: {
      minutes: 40,
      name: "10 minutos",
      id: 4,
    },
    state:{
      id: 1,
      name: "Active"
    }
  },
];
