import { Alert } from '@smart-city-unal/shared-types';
import { useMutation } from 'react-query';
import axiosInstance from '../axiosInstance';
import { queryClient } from '../main';
import { QUERY_KEYS } from './constants';

type EditAlertParams = Omit<Alert, 'createdAt' | '_id'>;

const editAlert = async ({
  alertId,
  newAlert,
}: {
  alertId: string;
  newAlert: EditAlertParams;
}) => {
  const { data } = await axiosInstance.put(`/api/alerts/${alertId}`, newAlert, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useEditAlert = () => {
  return useMutation(editAlert, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALERTS] });
    },
  });
};
