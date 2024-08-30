import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';
import { AQIData } from '@smart-city-unal/shared-types';

interface AqiResponse {
  rows: AQIData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

type FetchAqiParams = {
  startDate?: string | null;
  endDate?: string | null;
};

const fetchAqi = async ({ startDate, endDate }: FetchAqiParams) => {
  const params: any = {
    sort: '-createdAt',
  };

  if (startDate) {
    params.startDate = startDate;
  }
  if (endDate) {
    params.endDate = endDate;
  }

  const { data } = await axiosInstance.get<AqiResponse>('/api/aqi', { params });
  return data;
};

export const useQueryAqi = (params: FetchAqiParams) => {
  return useQuery(['aqi', params.startDate, params.endDate], () =>
    fetchAqi(params)
  );
};
