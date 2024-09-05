import { ButtonGroup, Button, Box, Typography } from '@mui/material';
import { useAirQualityIndex } from './useAirQualityIndex';

const sxMap = {
  fullwidth: {
    width: '100%',
  },
  button: {
    minWidth: '100px',
  },
};

export const AirQualityIndex = () => {
  const {
    pollutantData,
    selectedPollutant,
    handlePollutantChange,
    color,
    data,
  } = useAirQualityIndex();

  const renderButtons = () => {
    const buttons = [];
    for (const [key, value] of pollutantData.entries()) {
      buttons.push(
        <Button
          sx={sxMap.button}
          onClick={handlePollutantChange(key)}
          variant={selectedPollutant === key ? 'contained' : 'outlined'}
        >
          {value.label}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Box sx={sxMap.fullwidth}>
      <Typography variant="h5" align="center" gutterBottom>
        Índice de Calidad del Aire
      </Typography>

      <ButtonGroup color="primary" variant="contained" fullWidth>
        {renderButtons()}
      </ButtonGroup>

      <Box mt={3} sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: '100px',
            height: '100px',
            backgroundColor: color,
            borderRadius: '50%',
            margin: '0 auto',
          }}
        />
        <Typography variant="h6" mt={2}>
          Valor Actual: {data?.pollutant?.toFixed(2)}{' '}
          {pollutantData.get(selectedPollutant)?.units}
        </Typography>
        <Typography variant="body2">
          Fecha de última actualización: {data?.createdAt?.toString()}
        </Typography>
        <Typography variant="body2" mt={1}>
          {pollutantData.get(selectedPollutant)?.secondaryText}
        </Typography>
        <Typography variant="body1" mt={3}>
          {pollutantData.get(selectedPollutant)?.description}
        </Typography>
      </Box>
    </Box>
  );
};
