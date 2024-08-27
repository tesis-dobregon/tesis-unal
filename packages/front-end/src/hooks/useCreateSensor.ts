import { useMutation } from 'react-query';
import axiosInstance from '../axiosInstance';
import { SensorEntity } from '@smart-city-unal/shared-types';

type CreateSensorParams = Pick<
  SensorEntity,
  'name' | 'customId' | 'type' | 'measurementFrequency'
>;

const createSensor = async (newSensor: CreateSensorParams) => {
  const { data } = await axiosInstance.post('/api/sensors', newSensor, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useCreateSensor = () => {
  return useMutation(createSensor);
};
