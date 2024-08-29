import { useMutation } from 'react-query';
import axiosInstance from '../axiosInstance';
import { Alert } from '@smart-city-unal/shared-types';
import { queryClient } from '../main';
import { QUERY_KEYS } from './constants';

type CreateAlertParams = Omit<Alert, 'createdAt' | '_id'>;

const createAlert = async (newAlert: CreateAlertParams) => {
  const { data } = await axiosInstance.post('/api/alerts', newAlert, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useCreateAlert = () => {
  return useMutation(createAlert, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALERTS] });
    },
  });
};
