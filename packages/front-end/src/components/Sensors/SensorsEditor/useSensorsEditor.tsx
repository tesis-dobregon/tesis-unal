import { SelectChangeEvent } from '@mui/material';
import { SensorEntity } from '@smart-city-unal/shared-types';
import { useMemo, useState } from 'react';
import { useCreateSensor, useEditSensor } from '../../../hooks';
import { FrequencyList } from '../../../types/sensors/frequencyFixture';
import { SensorTypeList } from '../../../types/sensors/sensorTypeFixture';

export interface AddSensorProps {
  isEdit: boolean;
  sensorToEdit?: SensorEntity;
}

export const useSensorEditor = ({ isEdit, sensorToEdit }: AddSensorProps) => {
  const {
    mutate: createSensor,
    isLoading: isCreating,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
  } = useCreateSensor();

  const {
    mutate: editSensor,
    isLoading: isEditing,
    isError: isEditError,
    isSuccess: isEditSuccess,
  } = useEditSensor();

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
    if (isEdit) {
      return editSensor({
        sensorId: sensorToEdit?._id || '',
        newSensor: {
          name,
          type: selectedSensorType,
          measurementFrequency: selectedFrequency,
        },
      });
    } else {
      createSensor({
        name,
        customId: identifier,
        type: selectedSensorType,
        measurementFrequency: selectedFrequency,
      });
    }
  };

  const buttonText = useMemo(() => {
    if (isCreating || isEditing) {
      return 'Cargando...';
    }
    if (isEdit) {
      return 'Editar Sensor';
    }
    return 'Crear Sensor';
  }, [isCreating, isEditing, isEdit]);

  const errorMessage = useMemo(() => {
    if (isCreateError || isEditError) {
      return 'Error al guardar el sensor';
    }
    return '';
  }, [isCreateError, isEditError]);

  const successMessage = useMemo(() => {
    if (isCreateSuccess || isEditSuccess) {
      return 'Sensor guardado correctamente';
    }
    return '';
  }, [isCreateSuccess, isEditSuccess]);

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
    isLoading: isCreating || isEditing,
    buttonText,
    successMessage,
    errorMessage,
  };
};
