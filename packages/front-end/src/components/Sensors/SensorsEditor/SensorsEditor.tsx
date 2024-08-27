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
} from '@mui/material';
import { SensorTypeList } from '../../../types/sensors/sensorTypeFixture';
import { FrequencyList } from '../../../types/sensors/frequencyFixture';
import { Sensor } from '../../../types/sensors/sensor';
import { AddSensorProps, useSensorEditor } from './useSensorsEditor';

export const SensorEditorComponent: React.FunctionComponent<AddSensorProps> = (
  props
) => {
  const {
    isEdit,
    name,
    handleNameChange,
    selectedSensorType,
    handleSensorTypeChange,
    identifier,
    handleIdentifierChange,
    selectedFrequency,
    handleFrequencyChange,
    handleSubmit,
    isError,
    isSuccess,
    buttonText,
  } = useSensorEditor(props);
  return (
    <Box
      sx={{
        marginTop: '4rem',
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          {isEdit ? 'Editar Sensor' : 'Crear Sensor'}
        </Typography>
        <form onSubmit={handleSubmit}>
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
                    <MenuItem key={item.id} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                {buttonText}
              </Button>
            </Grid>
            {isError && (
              <Grid item xs={12}>
                <Typography variant="body1" color="error">
                  Error al crear el sensor
                </Typography>
              </Grid>
            )}
            {isSuccess && (
              <Grid item xs={12}>
                <Typography variant="body1" color="success">
                  Sensor creado con éxito
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
