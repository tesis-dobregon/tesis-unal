import { createContext } from 'react';
import { SensorEntity } from '@smart-city-unal/shared-types';

export enum SensorActions {
  NONE = 'NONE',
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
}

interface DrawerMode {
  showDrawer?: boolean;
}

export interface SensorPage {
  sensorToEdit?: SensorEntity | undefined;
  drawerMode: DrawerMode;
  action?: SensorActions;
}

export interface SensorContextType {
  sensorPage: SensorPage | null;
  setSensor: (sensorPage: SensorPage | null) => void;
}

export const SensorContext = createContext<SensorContextType>(
  {} as SensorContextType
);
