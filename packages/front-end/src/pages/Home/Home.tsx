import { Box, Button, Grid, Link, Typography } from '@mui/material';
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
  tableNote: {
    marginTop: 1,
    fontSize: '0.75rem',
  },
  tableNoteLink: {
    color: 'black',
    textDecoration: 'none',
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
          <Typography sx={sxMap.tableNote} noWrap color="textPrimary">
            Tabla de calidad del aire del IDEAM. Consultar{' '}
            <Link
              sx={sxMap.tableNoteLink}
              href="http://www.ideam.gov.co/documents/24155/125494/35-HM+%C3%8Dndice+calidad+aire+3+FI.pdf/6c0c641a-0c9a-430d-9c37-93d3069c595b"
            >
              aquí.
            </Link>
          </Typography>
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
