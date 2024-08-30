import { useEffect, useState } from 'react';
import { useQueryAqi } from '../../../hooks/useQueryAqi';

export const useAirQualityChart = () => {
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQueryAqi({
    startDate,
    endDate,
    // page,
    // pageSize,
  });

  useEffect(() => {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
  }, [startDate, endDate]);

  return {
    data,
    isLoading,
    isError,
    refetch,
    startDate: new Date(startDate || ''),
    setStartDate,
    endDate: new Date(endDate || ''),
    setEndDate,
  };
};
