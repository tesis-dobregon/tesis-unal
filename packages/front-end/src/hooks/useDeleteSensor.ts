import { useMutation } from 'react-query';
import axiosInstance from '../axiosInstance';
import { queryClient } from '../main';
import { QUERY_KEYS } from './constants';

const deleteSensor = async (sensorId: string) => {
  const { data } = await axiosInstance.delete(`/api/sensors/${sensorId}`);
  return data;
};

export const useDeleteSensor = () => {
  return useMutation(deleteSensor, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SENSORS] });
    },
  });
};
