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
import { SensorTypeList } from "../../../types/sensors/sensorTypeFixture";
import { FrequencyList } from "../../../types/sensors/frequencyFixture";
import { Sensor } from "../../../types/sensors/sensor";
import { useSensorEditor } from "./useSensorsEditor";

interface AddSensorProps {
  isEdit: boolean;
  sensorToEdit?: Sensor;
}

export const SensorEditorComponent: React.FunctionComponent<AddSensorProps> = ({
  isEdit,
  sensorToEdit,
}) => {
  const {
    name,
    handleNameChange,
    selectedSensorType,
    handleSensorTypeChange,
    identifier,
    handleIdentifierChange,
    selectedFrequency,
    handleFrequencyChange,
  } = useSensorEditor(isEdit, sensorToEdit);
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
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="sensor-type">Tipo de Sensor</InputLabel>
                <Select
                  labelId="sensor-type"
                  id="sensor-type"
                  value={selectedSensorType}
                  label="Tipo de Sensor"
                  onChange={handleSensorTypeChange}
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
                  value={identifier}
                  disabled={isEdit}
                  fullWidth
                  placeholder="Identificador del sensor"
                  onChange={handleIdentifierChange}
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
                  value={selectedFrequency}
                  label="Frecuencia de medición"
                  onChange={handleFrequencyChange}
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
