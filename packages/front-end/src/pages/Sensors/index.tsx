import React from "react";
import { SensorProvider } from "../../providers/sensors/sensors";
import Sensors from "./Sensors";

export const SensorsPage: React.FC = () => {
  return (
    <SensorProvider>
      <Sensors />
    </SensorProvider>
  );
};
