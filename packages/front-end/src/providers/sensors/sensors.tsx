import { useState } from "react";
import { SensorContext, SensorPage } from "../../types/sensors/providers";

interface sensorProviderProps {
  children: React.ReactNode;
}
export const SensorProvider: React.FC<sensorProviderProps> = ({ children }) => {
  const [sensorPage, setSensor] = useState<SensorPage | null>({
    drawerMode: {
      showDrawer: false,
    },
    sensorToEdit: undefined,
  });

  return (
    <SensorContext.Provider value={{ sensorPage, setSensor }}>
      {children}
    </SensorContext.Provider>
  );
};
