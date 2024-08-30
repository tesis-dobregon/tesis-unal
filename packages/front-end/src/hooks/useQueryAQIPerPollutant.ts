import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';
import { LatestAQI, Pollutants } from '@smart-city-unal/shared-types';

const fetchAqiPerPollutant = async (
  pollutant: Pollutants
): Promise<LatestAQI> => {
  const { data } = await axiosInstance.get<LatestAQI>(
    `/api/aqi/latest/${pollutant}`
  );
  return data;
};

type UseQueryAQIPerPollutantParams = {
  pollutant: Pollutants;
};

export const useQueryAQIPerPollutant = ({
  pollutant,
}: UseQueryAQIPerPollutantParams) => {
  return useQuery(['aqiPerPollutant'], () => fetchAqiPerPollutant(pollutant), {
    enabled: !!pollutant,
  });
};
