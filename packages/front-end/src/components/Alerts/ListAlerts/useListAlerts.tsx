import { Alert } from '@smart-city-unal/shared-types';
import { AlertActions, AlertContext } from '../../../types/alerts/providers';
import { useContext, useEffect } from 'react';
import { useQueryAlerts } from '../../../hooks';

export interface ListAlertsProps {
  visualMode?: boolean;
  refreshKey?: number;
}

export const useListAlerts = ({ visualMode, refreshKey }: ListAlertsProps) => {
  const alertContext = useContext(AlertContext);
  const { data, isLoading, isError, refetch } = useQueryAlerts();
  const { rows, total, totalPages } = data || {
    rows: [],
    total: 0,
    totalPages: 1,
  };

  const handleEdit = (alert: Alert) => {
    alertContext?.setAlert({
      alert: alert,
      action: AlertActions.EDIT,
      drawerMode: {
        showDrawer: true,
      },
    });
  };

  const handleDelete = (alert: Alert) => {
    alertContext?.setAlert({
      alert: alert,
      action: AlertActions.DELETE,
      drawerMode: {
        showDrawer: false,
      },
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
    data,
    isLoading,
    isError,
    rows,
    total,
    totalPages,
    handleEdit,
    handleDelete,
    visualMode,
  };
};
