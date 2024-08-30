import { Alert } from '@smart-city-unal/shared-types';
import axiosInstance from '../axiosInstance';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from './constants';

interface AlertResponse {
  rows: Alert[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const fetchAlerts = async (): Promise<AlertResponse> => {
  const { data } = await axiosInstance.get('/api/alerts');
  return data;
};

export const useQueryAlerts = () => {
  return useQuery(QUERY_KEYS.ALERTS, fetchAlerts);
};
