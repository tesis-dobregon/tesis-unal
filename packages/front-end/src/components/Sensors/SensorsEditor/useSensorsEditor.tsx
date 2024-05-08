import { SensorTypeList } from "../../../types/sensors/sensorTypeFixture";
import { FrequencyList } from "../../../types/sensors/frequencyFixture";
import { Sensor } from "../../../types/sensors/sensor";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

export const useSensorEditor = (isEdit: boolean, sensorToEdit?: Sensor) => {
  const [name, setName] = useState<string>(
    isEdit ? sensorToEdit?.name || "" : ""
  );
  const [selectedSensorType, setSelectedSensorType] = useState<number>(
    isEdit
      ? sensorToEdit?.sensorType.id || SensorTypeList[0].id
      : SensorTypeList[0].id
  );
  const [identifier, setIdentifier] = useState<string>(
    isEdit ? sensorToEdit?.identifier || "" : ""
  );
  const [selectedFrequency, setSelectedFrequency] = useState<number>(
    isEdit
      ? sensorToEdit?.frequency.id || FrequencyList[0].id
      : FrequencyList[0].id
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdentifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIdentifier(event.target.value);
  };

  const handleSensorTypeChange = (event: SelectChangeEvent<number>) => {
    setSelectedSensorType(event.target.value as number);
  };

  const handleFrequencyChange = (event: SelectChangeEvent<number>) => {
    setSelectedFrequency(event.target.value as number);
  };
  return {
    name,
    handleNameChange,
    selectedSensorType,
    handleSensorTypeChange,
    identifier,
    handleIdentifierChange,
    selectedFrequency,
    handleFrequencyChange,
  };
};
