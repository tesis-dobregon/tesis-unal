import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';
import { SensorData } from '@smart-city-unal/shared-types';

const fetchSensorData = async (
  startDate: string | null,
  endDate: string | null,
  sensorId: string
): Promise<SensorData[]> => {
  const { data } = await axiosInstance.get<SensorData[]>('/api/ingestion', {
    params: {
      startDate,
      endDate,
      sensorId,
    },
  });
  return data;
};

interface UseSensorDataParams {
  startDate: string | null;
  endDate: string | null;
  sensorId: string;
}

export const useQuerySensorData = ({
  startDate,
  endDate,
  sensorId,
}: UseSensorDataParams) => {
  return useQuery(
    ['sensorData', startDate, endDate, sensorId],
    () => fetchSensorData(startDate, endDate, sensorId),
    {
      enabled: !!startDate && !!endDate && !!sensorId, // Only fetch if all params are provided
    }
  );
};
