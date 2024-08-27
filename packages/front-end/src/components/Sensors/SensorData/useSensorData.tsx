import { useState } from 'react';
import { useQuerySensorData } from '../../../hooks';

export interface SensorDataComponentProps {
  sensorId: string;
}

export const useSensorData = ({ sensorId }: SensorDataComponentProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuerySensorData({
    startDate,
    endDate,
    sensorId,
  });

  const handleFetchData = () => {
    refetch();
  };

  return {
    startDate: new Date(startDate || ''),
    setStartDate,
    endDate: new Date(endDate || ''),
    setEndDate,
    sensorId,
    data,
    isLoading,
    isError,
    handleFetchData,
  };
};
