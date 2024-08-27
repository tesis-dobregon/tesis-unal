import { useCallback, useContext, useState } from 'react';
import { SensorEditorComponent, SensorDataComponent } from '../../components';
import {
  SensorContext,
  SensorActions,
  SensorPage,
} from '../../types/sensors/providers';
import { useDeleteSensor, useQuerySensors } from '../../hooks';

export const useSensors = () => {
  const {
    mutate: deleteSensor,
    isLoading: isDeleting,
    isError: isDeleteError,
  } = useDeleteSensor();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sensorContext = useContext(SensorContext);
  const { data, isLoading, isError, refetch } = useQuerySensors({
    page,
    pageSize,
  });

  const handleCloseDrawer = useCallback(() => {
    sensorContext?.setSensor({
      drawerMode: {
        showDrawer: false,
      },
      sensorToEdit: undefined,
    });
  }, [sensorContext]);

  const handleOpenAddSensorDrawer = useCallback(() => {
    sensorContext?.setSensor({
      drawerMode: {
        showDrawer: true,
      },
      action: SensorActions.ADD,
    });
  }, [sensorContext]);

  const handleOpenModal = useCallback(
    (action?: SensorActions) => {
      sensorContext?.setSensor({
        ...(sensorContext?.sensorPage as SensorPage),
        action: action,
      });
    },
    [sensorContext]
  );

  const handleDeleteSensor = () => {
    if (sensorContext?.sensorPage?.sensorToEdit?._id) {
      deleteSensor(sensorContext?.sensorPage?.sensorToEdit?._id);
      handleCloseDrawer();
    }
  };

  const getDrawerComponent = useCallback(
    (action?: SensorActions) => {
      switch (action) {
        case SensorActions.ADD:
          return <SensorEditorComponent isEdit={false} />;
        case SensorActions.EDIT:
          return (
            <SensorEditorComponent
              isEdit={true}
              sensorToEdit={sensorContext?.sensorPage?.sensorToEdit}
            />
          );
        case SensorActions.VIEW: {
          return sensorContext?.sensorPage?.sensorToEdit?._id ? (
            <SensorDataComponent
              sensorId={sensorContext.sensorPage.sensorToEdit.customId}
            />
          ) : null;
        }
        default:
          return null;
      }
    },
    [sensorContext]
  );

  const onRefreshPage = async () => {
    await refetch();
  };

  return {
    handleCloseDrawer,
    handleOpenAddSensorDrawer,
    handleOpenModal,
    getDrawerComponent,
    sensorContext,
    data,
    isLoading,
    isError,
    setPage,
    setPageSize,
    onRefreshPage,
    handleDeleteSensor,
    isDeleting,
    isDeleteError,
  };
};
