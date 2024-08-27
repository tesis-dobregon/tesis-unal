import { SensorTypeList } from '../../../types/sensors/sensorTypeFixture';
import { FrequencyList } from '../../../types/sensors/frequencyFixture';
import { useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { SensorEntity } from '@smart-city-unal/shared-types';
import { useCreateSensor } from '../../../hooks';

export interface AddSensorProps {
  isEdit: boolean;
  sensorToEdit?: SensorEntity;
}

export const useSensorEditor = ({ isEdit, sensorToEdit }: AddSensorProps) => {
  const {
    mutate: createSensor,
    isLoading,
    isError,
    isSuccess,
  } = useCreateSensor();

  const [name, setName] = useState<string>(
    isEdit ? sensorToEdit?.name || '' : ''
  );
  const [selectedSensorType, setSelectedSensorType] = useState<string>(
    isEdit ? sensorToEdit?.type || SensorTypeList[0].id : SensorTypeList[0].id
  );
  const [identifier, setIdentifier] = useState<string>(
    isEdit ? sensorToEdit?.customId || '' : ''
  );
  const [selectedFrequency, setSelectedFrequency] = useState<number>(
    isEdit
      ? sensorToEdit?.measurementFrequency || FrequencyList[0].id
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

  const handleSensorTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSensorType(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent<number>) => {
    setSelectedFrequency(event.target.value as number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createSensor({
      name,
      customId: identifier,
      type: selectedSensorType,
      measurementFrequency: selectedFrequency,
    });
  };

  const buttonText = useMemo(() => {
    if (isLoading) {
      return 'Cargando...';
    }
    if (isEdit) {
      return 'Editar Sensor';
    }
    return 'Crear Sensor';
  }, []);

  return {
    isEdit,
    name,
    handleNameChange,
    selectedSensorType,
    handleSensorTypeChange,
    identifier,
    handleIdentifierChange,
    selectedFrequency,
    handleFrequencyChange,
    handleSubmit,
    isLoading,
    isError,
    isSuccess,
    buttonText,
  };
};
