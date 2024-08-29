import { createContext } from 'react';
import { Alert } from '@smart-city-unal/shared-types';

export enum AlertActions {
  NONE = 'NONE',
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

interface DrawerMode {
  showDrawer?: boolean;
}

export interface AlertPage {
  alert?: Alert | undefined;
  drawerMode: DrawerMode;
  action?: AlertActions;
}

export interface AlertContextType {
  alertPage: AlertPage | null;
  setAlert: (alertPage: AlertPage | null) => void;
}

export const AlertContext = createContext<AlertContextType>(
  {} as AlertContextType
);
