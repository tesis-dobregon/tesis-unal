import { SensorEntity, SensorId } from '@smart-city-unal/shared-types';
import { useMutation } from 'react-query';
import axiosInstance from '../axiosInstance';
import { queryClient } from '../main';
import { QUERY_KEYS } from './constants';

type EditSensorParams = Pick<
  SensorEntity,
  'name' | 'type' | 'measurementFrequency'
>;

const editSensor = async ({
  sensorId,
  newSensor,
}: {
  sensorId: SensorId;
  newSensor: EditSensorParams;
}) => {
  const { data } = await axiosInstance.put(
    `/api/sensors/${sensorId}`,
    newSensor,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

export const useEditSensor = () => {
  return useMutation(editSensor, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SENSORS] });
    },
  });
};
