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
import { Sensor } from "../../types/sensors/sensor";

interface AddSensorProps {
  isEdit: boolean;
  sensorToEdit?: Sensor;
}

export const SensorEditor: React.FunctionComponent<AddSensorProps> = ({
  isEdit,
  sensorToEdit,
}) => {
  return (
    <Box
      sx={{
        marginTop: "4rem",
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          {isEdit ? "Editar Sensor" : "Crear Sensor"}
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
                  value={(isEdit && sensorToEdit?.name) || ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="sensor-type">Tipo de Sensor</InputLabel>
                <Select
                  labelId="sensor-type"
                  id="sensor-type"
                  defaultValue={SensorTypeList[0].id}
                  value={sensorToEdit?.sensorType.id}
                  label="Tipo de Sensor"
                  onChange={() => console.log("on change tipo de sensor")}
                >
                  {SensorTypeList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Identificador del Sensor"
                  id="sensor-id"
                  value={(isEdit && sensorToEdit?.identifier) || ""}
                  disabled={isEdit}
                  fullWidth
                  placeholder="Identificador del sensor"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="frequency-type">
                  Frecuencia de medición
                </InputLabel>
                <Select
                  labelId="frequency-type"
                  id="frequency-type"
                  value={
                    (isEdit && sensorToEdit?.frequency.id) ||
                    FrequencyList[0].id
                  }
                  label="Frecuencia de medición"
                  onChange={() => console.log("on change tipo de frecuencia")}
                >
                  {FrequencyList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" fullWidth>
                {isEdit ? "Editar" : "Crear Sensor"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
