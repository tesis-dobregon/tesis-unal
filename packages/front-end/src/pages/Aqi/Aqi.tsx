import { Box, Typography } from '@mui/material';
import { AirQualityChart, AirQualityIndex } from '../../components/AirQuality';

const sxMap = {
  container: {
    width: '100%',
  },
  title: {
    width: '100%',
  },
};

export const Aqi: React.FC<unknown> = () => {
  return (
    <Box sx={sxMap.container}>
      <Typography variant="h4" sx={sxMap.title}>
        Calidad del Aire
      </Typography>

      <AirQualityIndex />
      <AirQualityChart />
    </Box>
  );
};
