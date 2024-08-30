import { useContext, useEffect, useState } from 'react';
import { SensorContext, SensorActions } from '../../../types/sensors/providers';
import { SensorEntity } from '@smart-city-unal/shared-types';
import { useQuerySensors } from '../../../hooks';

export interface ListSensorsComponentProps {
  visualMode?: boolean;
  refreshKey?: number;
}

export const useListSensors = ({
  visualMode,
  refreshKey,
}: ListSensorsComponentProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const sensorsContext = useContext(SensorContext);
  const { data, isLoading, isError, refetch } = useQuerySensors({
    page,
    pageSize,
  });
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

  const handleView = (sensor: SensorEntity) => {
    sensorsContext?.setSensor({
      drawerMode: { showDrawer: true },
      action: SensorActions.VIEW,
      sensorToEdit: sensor,
    });
  };

  useEffect(() => {
    const refreshData = async () => {
      await refetch();
    };
    if (refreshKey) {
      refreshData();
    }
  }, [refreshKey]);

  return {
    handleEdit,
    handleDelete,
    handleView,
    rows,
    total,
    totalPages,
    isLoading,
    isError,
    visualMode,
  };
};
