import { useEffect, useState } from 'react';
import { Alert, AlertAction } from 'shared-types';
import { useCreateAlert, useEditAlert } from '../../../hooks';

type AlertForm = Omit<Alert, '_id' | 'createdAt'>;

export interface AlertEditorProps {
  isEdit: boolean;
  alertToEdit?: Alert;
}

export const useAlertEditor = ({ isEdit, alertToEdit }: AlertEditorProps) => {
  const {
    mutate: createAlert,
    isLoading: isCreating,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
  } = useCreateAlert();

  const {
    mutate: editAlert,
    isLoading: isEditing,
    isError: isEditError,
    isSuccess: isEditSuccess,
  } = useEditAlert();

  useEffect(() => {
    if (isCreateError) {
      setErrorMessage('Error al crear la alerta.');
    }
    if (isEditError) {
      setErrorMessage('Error al editar la alerta.');
    }
  }, [isCreateError, isEditError]);

  useEffect(() => {
    if (isCreateSuccess) {
      setSuccessMessage('Alerta creada con éxito.');
    }
    if (isEditSuccess) {
      setSuccessMessage('Alerta actualizada con éxito.');
    }
  }, [isCreateSuccess, isEditSuccess]);

  const {
    contaminant: initialContaminant,
    lowerThreshold: initialLowerThreshold,
    upperThreshold: initialUpperThreshold,
    action: initialAction,
    metadata: { email: initialEmail } = { email: '' },
    message: initialMessage,
  } = alertToEdit || { metadata: { email: '' } };
  const [contaminant, setContaminant] = useState(initialContaminant || '');
  const [lowerThreshold, setLowerThreshold] = useState<number | string>(
    initialLowerThreshold || ''
  );
  const [upperThreshold, setUpperThreshold] = useState<number | string>(
    initialUpperThreshold || ''
  );
  const [action, setAction] = useState<AlertAction>(
    initialAction || AlertAction.EMAIL
  );
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const contaminantOptions = [
    { value: 'pm2_5', label: 'PM2.5' },
    { value: 'pm10', label: 'PM10' },
    { value: 'o3', label: 'O3' },
    { value: 'no2', label: 'NO2' },
    { value: 'co', label: 'CO' },
    { value: 'so2', label: 'SO2' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(lowerThreshold) > Number(upperThreshold)) {
      setErrorMessage(
        'El umbral inferior no puede ser mayor que el umbral superior.'
      );
      return;
    }
    if (
      !contaminant ||
      !email ||
      !lowerThreshold ||
      !upperThreshold ||
      !message
    ) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    // Create the alert object
    const alert: AlertForm = {
      contaminant,
      lowerThreshold: Number(lowerThreshold),
      upperThreshold: Number(upperThreshold),
      action,
      metadata: { email },
      message,
    };

    if (isEdit) {
      return editAlert({
        alertId: alertToEdit?._id || '',
        newAlert: alert,
      });
    } else {
      createAlert(alert);
    }
    // Simulate a form submission success
    setSuccessMessage('Alerta creada/actualizada con éxito.');
    setErrorMessage('');
  };

  return {
    contaminant,
    setContaminant,
    lowerThreshold,
    setLowerThreshold,
    upperThreshold,
    setUpperThreshold,
    action,
    setAction,
    email,
    setEmail,
    message,
    setMessage,
    contaminantOptions,
    handleSubmit,
    errorMessage,
    successMessage,
    isEdit,
    isLoading: isCreating || isEditing,
  };
};
