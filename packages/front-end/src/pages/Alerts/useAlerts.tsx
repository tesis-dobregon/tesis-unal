import { useCallback, useContext, useState } from 'react';
import { useDeleteAlert } from '../../hooks';
import {
  AlertActions,
  AlertContext,
  AlertPage,
} from '../../types/alerts/providers';
import { AlertEditor } from '../../components/Alerts/AlertsEditor';

export const useAlerts = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    mutate: deleteAlert,
    isLoading: isDeleting,
    isError: isDeleteError,
  } = useDeleteAlert();

  const alertContext = useContext(AlertContext);

  const handleOpenModal = useCallback(
    (action?: AlertActions) => {
      alertContext?.setAlert({
        ...(alertContext?.alertPage as AlertPage),
        action: action,
      });
    },
    [alertContext]
  );

  const handleDeleteAlert = () => {
    if (alertContext?.alertPage?.alert?._id) {
      deleteAlert(alertContext?.alertPage?.alert?._id);
      // Close modal
      alertContext?.setAlert({
        action: AlertActions.NONE,
        drawerMode: {
          showDrawer: false,
        },
      });
    }
  };

  const onRefreshPage = async () => {
    setRefreshKey((prev: number) => prev + 1);
  };

  const handleOpenAddAlertDrawer = useCallback(() => {
    alertContext?.setAlert({
      drawerMode: {
        showDrawer: true,
      },
      action: AlertActions.ADD,
    });
  }, [alertContext]);

  const handleCloseDrawer = useCallback(() => {
    alertContext?.setAlert({
      drawerMode: {
        showDrawer: false,
      },
      alert: undefined,
    });
  }, [alertContext]);

  const getDrawerComponent = useCallback(
    (action?: AlertActions) => {
      switch (action) {
        case AlertActions.ADD:
          return <AlertEditor isEdit={false} />;
        case AlertActions.EDIT:
          return (
            <AlertEditor
              isEdit={true}
              alertToEdit={alertContext.alertPage?.alert}
            />
          );
        default:
          return null;
      }
    },
    [alertContext]
  );

  return {
    alertContext,
    handleOpenModal,
    handleDeleteAlert,
    isDeleting,
    isDeleteError,
    onRefreshPage,
    handleOpenAddAlertDrawer,
    handleCloseDrawer,
    getDrawerComponent,
    refreshKey,
  };
};
