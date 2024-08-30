import { useEffect, useState } from 'react';
import { Pollutants } from '@smart-city-unal/shared-types';
import { useQueryAQIPerPollutant } from '../../../hooks';

export type ContaminantData = {
  label: string;
  description: string;
  units: string;
  secondaryText: string;
};
type PollutantMap = Map<Pollutants, ContaminantData>;

const pollutantData: PollutantMap = new Map();
pollutantData.set(Pollutants.PM2_5, {
  label: 'PM2.5',
  description: `Las partículas finas son partículas contaminantes inhalables con un diámetro inferior a 2,5 micrómetros que pueden entrar en los pulmones y en el torrente sanguíneo y provocar graves problemas de salud. Afectan de forma más grave a los pulmones y al corazón. La exposición a estas partículas puede provocar tos o dificultad para respirar, agravar el asma y desarrollar enfermedades respiratorias crónicas.`,
  units: 'µg/m³',
  secondaryText: 'Calculado con datos de las últimas 24 horas',
});
pollutantData.set(Pollutants.PM10, {
  label: 'PM10',
  description: `La materia particulada está formada por partículas contaminantes inhalables con un diámetro inferior a 10 micrómetros. Las partículas de más de 2,5 micrómetros pueden depositarse en las vías respiratorias y provocar problemas de salud. La exposición puede provocar irritación de ojos y garganta, tos, dificultad para respirar y puede agravar el asma. Una exposición más frecuente y excesiva puede tener efectos más graves para la salud.`,
  units: 'µg/m³',
  secondaryText: 'Calculado con datos de las últimas 24 horas',
});
pollutantData.set(Pollutants.CO, {
  label: 'CO',
  description: `El monóxido de carbono es un gas incoloro e inodoro y, cuando se inhala en altos niveles, puede causar dolor de cabeza, náuseas, mareos y vómitos. La exposición prolongada a largo plazo puede provocar enfermedades cardíacas.`,
  units: 'ppm',
  secondaryText: 'Calculado con datos de las últimas 8 horas',
});

// Escala de colores basada en el valor del contaminante
const getAirQualityColor = (value: number) => {
  if (value <= 50) return '#0FA958'; // Verde
  if (value <= 100) return '#F5ED24'; // Amarillo
  if (value <= 150) return '#EE904B'; // Naranja
  if (value <= 200) return '#EF1111'; // Rojo
  if (value <= 300) return '#8A3CD8'; // Púrpura
  return '#7D6951'; // Marrón
};

export const useAirQualityIndex = () => {
  const [selectedPollutant, setSelectedPollutant] = useState<Pollutants>(
    Pollutants.PM2_5
  );

  const { data, isLoading, isError, refetch } = useQueryAQIPerPollutant({
    pollutant: selectedPollutant,
  });

  useEffect(() => {
    refetch();
  }, [selectedPollutant]);

  const color = getAirQualityColor(data?.pollutant || 0);

  const handlePollutantChange = (pollutant: Pollutants) => () => {
    setSelectedPollutant(pollutant);
  };

  return {
    pollutantData,
    selectedPollutant,
    data,
    color,
    handlePollutantChange,
    isLoading,
    isError,
  };
};
