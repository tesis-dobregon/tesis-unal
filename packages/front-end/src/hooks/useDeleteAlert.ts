import { useMutation } from 'react-query';
import axiosInstance from '../axiosInstance';
import { queryClient } from '../main';
import { QUERY_KEYS } from './constants';

const deleteAlert = async (alertId: string) => {
  const { data } = await axiosInstance.delete(`/api/alerts/${alertId}`);
  return data;
};

export const useDeleteAlert = () => {
  return useMutation(deleteAlert, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALERTS] });
    },
  });
};
