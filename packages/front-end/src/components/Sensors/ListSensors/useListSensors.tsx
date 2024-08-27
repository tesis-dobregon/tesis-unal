import { Sensor } from '../../../types/sensors/sensor';
import { useContext } from 'react';
import { SensorContext, SensorActions } from '../../../types/sensors/providers';
import { SensorsResponse } from '../../../hooks';
import { SensorEntity } from '@smart-city-unal/shared-types';

export interface ListSensorsComponentProps {
  data: SensorsResponse;
}

export const useListSensors = ({ data }: ListSensorsComponentProps) => {
  const sensorsContext = useContext(SensorContext);
  const { rows, total, totalPages } = data || {
    rows: [],
    total: 0,
    totalPages: 1,
  };

  const handleEdit = (sensor: SensorEntity) => {
    sensorsContext?.setSensor({
      sensorToEdit: sensor,
      drawerMode: { showDrawer: true },
      action: SensorActions.EDIT,
    });
  };

  const handleDelete = (sensor: SensorEntity) => {
    sensorsContext?.setSensor({
      sensorToEdit: sensor,
      drawerMode: { showDrawer: false },
      action: SensorActions.DELETE,
    });
  };

  const handleView = () => {
    sensorsContext?.setSensor({
      drawerMode: { showDrawer: true },
      action: SensorActions.VIEW,
    });
  };

  return { handleEdit, handleDelete, handleView, rows, total, totalPages };
};
