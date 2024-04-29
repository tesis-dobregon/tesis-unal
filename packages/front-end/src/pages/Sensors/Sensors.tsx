import AddIcon from "@mui/icons-material/Add";
import { Box, Link } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";
import {
  DrawerComponent,
  SensorEditor,
  ListSensorsComponent,
  RefreshButton,
} from "../../components";
import { SensorsList } from "../../types/sensors/SensorsFixture";
import { ModalComponent } from "../../components/Modal/Modal";
import {
  SensorContext,
  SensorPage,
  SensorActions as SensorActions,
} from "../../types/sensors/providers";

const sxMap = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    px: "4rem",
    py: "2rem",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    rowGap: "3rem",
    justifyContent: "space-between",
  },
  list: {
    cursor: "pointer",
  },
};

const Sensors: React.FunctionComponent = () => {
  const sensorContext = useContext(SensorContext);

  const handleCloseDrawer = () => {
    sensorContext?.setSensor({
      drawerMode: {
        showDrawer: false,
      },
      sensorToEdit: undefined,
    });
  };

  const handleOpenAddSensorDrawer = () => {
    sensorContext?.setSensor({
      drawerMode: {
        showDrawer: true,
      },
      action: SensorActions.ADD,
    });
  };

  const handleOpenModal = (action?: SensorActions) => {
    sensorContext?.setSensor({
      ...(sensorContext?.sensorPage as SensorPage),
      action: action,
    });
  };

  const getDrawerComponent = useCallback(
    (action?: SensorActions) => {
      switch (action) {
        case SensorActions.ADD:
          return <SensorEditor isEdit={false}></SensorEditor>;
        case SensorActions.EDIT:
          return (
            <SensorEditor
              isEdit={true}
              sensorToEdit={sensorContext?.sensorPage?.sensorToEdit}
            ></SensorEditor>
          );
        case SensorActions.VIEW:
          return <h1>TODO: Show Sensor data</h1>;
        default:
          return <></>;
      }
    },
    [sensorContext]
  );

  useEffect(() => {
    console.log("sensorContext: ", sensorContext);
  }, [sensorContext]);

  return (
    <Box sx={sxMap.container}>
      <Box sx={sxMap.row}>
        <RefreshButton
          onClick={() => {
            console.log("Refreshing sensors...");
          }}
        ></RefreshButton>

        <Link onClick={handleOpenAddSensorDrawer} sx={sxMap.list}>
          <AddIcon color="action" fontSize="large"></AddIcon>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <ListSensorsComponent sensors={SensorsList}></ListSensorsComponent>
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
      ></ModalComponent>
    </Box>
  );
};

export default Sensors;
