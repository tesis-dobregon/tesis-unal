  import { Sensor } from "../../../types/sensors/sensor";
  import { useContext } from "react";
  import { SensorContext, SensorActions } from "../../../types/sensors/providers";

  export const useListSensors= () => {
    const sensorsContext = useContext(SensorContext);
  
    const handleEdit = (sensor: Sensor) => {
      sensorsContext?.setSensor({
        sensorToEdit: sensor,
        drawerMode: { showDrawer: true },
        action: SensorActions.EDIT,
      });
    };
  
    const handleDelete = (sensor: Sensor) => {
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
  
    return { handleEdit, handleDelete, handleView };
  };