import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance'; // Your axios instance
import { SensorEntity } from '@smart-city-unal/shared-types';

interface SensorsResponse {
  rows: SensorEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface UseSensorsParams {
  page: number;
  pageSize: number;
}

const fetchSensors = async (
  page: number,
  pageSize: number
): Promise<SensorsResponse> => {
  const { data } = await axiosInstance.get<SensorsResponse>('/api/sensors', {
    params: {
      page,
      pageSize,
    },
  });
  return data;
};

const useSensors = ({ page, pageSize }: UseSensorsParams) => {
  return useQuery(
    ['sensors', page, pageSize],
    () => fetchSensors(page, pageSize),
    {
      keepPreviousData: true, // This helps to avoid flickering when changing pages
      staleTime: 5000, // Data is considered fresh for 5 seconds
    }
  );
};

export { useSensors };
