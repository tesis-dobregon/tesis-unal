import { sensor } from "./sensor";

export const SensorsList: sensor[] = [
    {
        name: "sensor xx",
        sensorType: {
            name : "tipo 1",
            id:1
        },
        identifier: "",
        frequency: {
            minutes: 10,
            name: "10 minutos",
            id: 1
        }
    },
    {
        name: "sensor yy",
        sensorType: {
            name : "tipo 2",
            id:1
        },
        identifier: "",
        frequency: {
            minutes: 20,
            name: "15 minutos",
            id: 2
        }
    },
    {
        name: "sensor zz",
        sensorType: {
            name : "tipo 3",
            id:1
        },
        identifier: "",
        frequency: {
            minutes: 30,
            name: "10 minutos",
            id: 3
        }
    },
    {
        name: "sensor aa",
        sensorType: {
            name : "tipo 4",
            id:1
        },
        identifier: "",
        frequency: {
            minutes: 40,
            name: "10 minutos",
            id: 4
        }
    }

]