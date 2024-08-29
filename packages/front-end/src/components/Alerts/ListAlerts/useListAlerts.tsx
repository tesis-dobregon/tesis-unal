import { Alert } from '@smart-city-unal/shared-types';
import { AlertActions, AlertContext } from '../../../types/alerts/providers';
import { useContext } from 'react';
import { useQueryAlerts } from '../../../hooks';

export const useListAlerts = () => {
  const alertContext = useContext(AlertContext);
  const { data, isLoading, isError } = useQueryAlerts();
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

  return {
    data,
    isLoading,
    isError,
    rows,
    total,
    totalPages,
    handleEdit,
    handleDelete,
  };
};
