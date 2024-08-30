import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import {
  DrawerComponent,
  ListSensorsComponent,
  RefreshButton,
} from '../../components';
import { ModalComponent } from '../../components/Modal/Modal';
import { SensorActions } from '../../types/sensors/providers';
import { useSensors } from './useSensors';

const sxMap = {
  container: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    rowGap: '3rem',
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
  },
  list: {
    cursor: 'pointer',
  },
  refreshButton: {
    marginRight: '2rem',
  },
};

const Sensors: React.FunctionComponent = () => {
  const {
    handleCloseDrawer,
    handleOpenAddSensorDrawer,
    handleOpenModal,
    getDrawerComponent,
    sensorContext,
    // setPage,
    // setPageSize,
    onRefreshPage,
    handleDeleteSensor,
    isDeleting,
    isDeleteError,
    refreshKey,
  } = useSensors();

  return (
    <Box sx={sxMap.container}>
      <Box sx={sxMap.row}>
        <Typography variant="h4" sx={sxMap.title}>
          Sensores
        </Typography>
        <RefreshButton
          sx={sxMap.refreshButton}
          onClick={onRefreshPage}
        ></RefreshButton>

        <Link onClick={handleOpenAddSensorDrawer} sx={sxMap.list}>
          <AddIcon color="action" fontSize="large"></AddIcon>
        </Link>
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {isDeleting && <CircularProgress />}
        {isDeleteError && (
          <Box>
            <Typography>Error al eliminar el sensor</Typography>
          </Box>
        )}
        <ListSensorsComponent refreshKey={refreshKey}></ListSensorsComponent>
      </Box>
      <DrawerComponent
        children={getDrawerComponent(sensorContext?.sensorPage?.action)}
        onCloseDrawer={handleCloseDrawer}
        isOpen={Boolean(sensorContext?.sensorPage?.drawerMode.showDrawer)}
      ></DrawerComponent>
      <ModalComponent
        message="Está seguro que desea eliminar el sensor?"
        isOpen={sensorContext?.sensorPage?.action == SensorActions.DELETE}
        handleModalOpen={handleOpenModal}
        title="Eliminar Sensor"
        firstButtonText="Aceptar"
        secondButtontext="Cancelar"
        handleAction={handleDeleteSensor}
      ></ModalComponent>
    </Box>
  );
};

export default Sensors;
