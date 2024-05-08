import { useCallback, useContext, useEffect } from "react";
import { SensorEditorComponent } from "../../components";
import {
  SensorContext,
  SensorActions,
  SensorPage,
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

export const useSensors = () => {
  const sensorContext = useContext(SensorContext);

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

  return {
    handleCloseDrawer,
    handleOpenAddSensorDrawer,
    handleOpenModal,
    getDrawerComponent,
    sensorContext,
  };
};
