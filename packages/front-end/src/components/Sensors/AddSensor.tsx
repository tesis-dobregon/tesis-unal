import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SensorTypeList } from "../../types/sensors/sensorTypeFixture";
import { FrequencyList } from "../../types/sensors/frequencyFixture";

export const AddSensorComponent: React.FunctionComponent<unknown> = () =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {
    return (
      <Box
        sx={{
          marginTop: "4rem",
        }}
      >
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Crear Sensor
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Nombre del Sensor"
                    id="sensor-name"
                    fullWidth
                    placeholder="Nombre del sensor"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="sensor-type">Tipo de Sensor</InputLabel>
                  <Select
                    labelId="sensor-type"
                    id="sensor-type"
                    value={SensorTypeList[0].id}
                    label="Tipo de Sensor"
                    onChange={() => console.log("on change tipo de sensor")}
                  >
                    {SensorTypeList.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Identificador del Sensor"
                    id="sensor-id"
                    fullWidth
                    placeholder="Identificador del sensor"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="sensor-type">Tipo de Sensor</InputLabel>
                  <Select
                    labelId="sensor-type"
                    id="sensor-type"
                    value={FrequencyList[0].id}
                    label="Tipo de Sensor"
                    onChange={() => console.log("on change tipo de sensor")}
                  >
                    {FrequencyList.map((item) => (
                      <MenuItem value={item.id}>{item.minutes}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" fullWidth>
                  Crear Sensor
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    );
  };
