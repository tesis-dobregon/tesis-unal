import { Frequency } from './sensor';

const ONE_MINUTE_IN_MILLISECONDS = 60000;

export const FrequencyList: Frequency[] = [
  {
    name: '1 minuto',
    value: ONE_MINUTE_IN_MILLISECONDS,
    id: 0,
  },
  {
    name: '5 minutos',
    value: ONE_MINUTE_IN_MILLISECONDS * 5,
    id: 1,
  },
  {
    name: '10 minutos',
    value: ONE_MINUTE_IN_MILLISECONDS * 10,
    id: 2,
  },
  {
    name: '20 minutos',
    value: ONE_MINUTE_IN_MILLISECONDS * 20,
    id: 3,
  },
  {
    name: '30 minutos',
    value: ONE_MINUTE_IN_MILLISECONDS * 30,
    id: 4,
  },
  {
    name: '1 hora',
    value: ONE_MINUTE_IN_MILLISECONDS * 60,
    id: 5,
  },
];
