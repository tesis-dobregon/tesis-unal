import { Box, Button, Grid, Typography } from '@mui/material';
import { AirQualityTable, AirQualityIndex } from '../../components/AirQuality';
import { ListAlertsComponent, ListSensorsComponent } from '../../components';
import { useHome } from './useHome';

const sxMap = {
  tile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    padding: 2,
    border: '1px solid #E0E0E0',
    borderRadius: 4,
    maxWidth: '100%',
    overflow: 'auto',
  },
  viewMore: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 2,
  },
};

const Tile = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={sxMap.tile}>{children}</Box>;
};

const Home = () => {
  const { redirectToAlerts, redirectToSensors, redirecToAqi } = useHome();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Tile>
          <Typography variant="h6">Ciudad</Typography>
          <Typography variant="h4">Duitama, Boyacá</Typography>
        </Tile>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Tile>
          <Typography variant="h6">Temperatura</Typography>
          <Typography variant="h4">25°C</Typography>
        </Tile>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Tile>
          <Typography variant="h6">Humedad</Typography>
          <Typography variant="h4">80%</Typography>
        </Tile>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Tile>
          <AirQualityTable />
        </Tile>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Tile>
          <AirQualityIndex />
          <Box sx={sxMap.viewMore}>
            <Button variant="contained" color="primary" onClick={redirecToAqi}>
              Ver más
            </Button>
          </Box>
        </Tile>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Tile>
          <ListSensorsComponent visualMode />
          <Box sx={sxMap.viewMore}>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToSensors}
            >
              Ver más
            </Button>
          </Box>
        </Tile>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Tile>
          <ListAlertsComponent visualMode />
          <Box sx={sxMap.viewMore}>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToAlerts}
            >
              Ver más
            </Button>
          </Box>
        </Tile>
      </Grid>
    </Grid>
  );
};

export default Home;
