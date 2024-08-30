import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import {
  DrawerComponent,
  ListAlertsComponent,
  RefreshButton,
} from '../../components';
import { ModalComponent } from '../../components/Modal/Modal';
import { AlertActions } from '../../types/alerts/providers';
import { useAlerts } from './useAlerts';

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
    marginBottom: '2rem',
  },
  title: {
    width: '100%',
  },
  link: {
    cursor: 'pointer',
  },
  refreshButton: {
    marginRight: '2rem',
  },
};

const Alerts = () => {
  const {
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
  } = useAlerts();

  return (
    <Box sx={sxMap.container}>
      <Box sx={sxMap.row}>
        <Typography variant="h4" sx={sxMap.title}>
          Alertas
        </Typography>
        <RefreshButton
          sx={sxMap.refreshButton}
          onClick={onRefreshPage}
        ></RefreshButton>

        <Link onClick={handleOpenAddAlertDrawer} sx={sxMap.link}>
          <AddIcon color="action" fontSize="large"></AddIcon>
        </Link>
      </Box>

      {isDeleting && <CircularProgress />}
      {isDeleteError && (
        <Box>
          <Typography>Error al eliminar la alerta</Typography>
        </Box>
      )}

      <ListAlertsComponent refreshKey={refreshKey} />
      <DrawerComponent
        children={getDrawerComponent(alertContext?.alertPage?.action)}
        onCloseDrawer={handleCloseDrawer}
        isOpen={Boolean(alertContext?.alertPage?.drawerMode.showDrawer)}
      ></DrawerComponent>

      <ModalComponent
        message="Está seguro que desea eliminar la alerta?"
        isOpen={alertContext?.alertPage?.action == AlertActions.DELETE}
        handleModalOpen={handleOpenModal}
        title="Eliminar Alerta"
        firstButtonText="Aceptar"
        secondButtontext="Cancelar"
        handleAction={handleDeleteAlert}
      ></ModalComponent>
    </Box>
  );
};

export default Alerts;
