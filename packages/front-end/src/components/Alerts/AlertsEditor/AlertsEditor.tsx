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
  TextareaAutosize,
} from '@mui/material';
import { AlertEditorProps, useAlertEditor } from './useAlertEditor';
import { AlertAction } from 'shared-types';

export const AlertEditorComponent: React.FC<AlertEditorProps> = (props) => {
  const {
    contaminant,
    setContaminant,
    lowerThreshold,
    setLowerThreshold,
    upperThreshold,
    setUpperThreshold,
    action,
    setAction,
    email,
    setEmail,
    message,
    setMessage,
    handleSubmit,
    errorMessage,
    successMessage,
    isEdit,
    contaminantOptions,
    isLoading,
  } = useAlertEditor(props);

  return (
    <Box mt={4}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          {isEdit ? 'Editar Alerta' : 'Crear Alerta'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="contaminant-select-label">
                  Contaminante
                </InputLabel>
                <Select
                  labelId="contaminant-select-label"
                  id="contaminant-select"
                  value={contaminant}
                  label="Contaminante"
                  onChange={(e) => setContaminant(e.target.value)}
                >
                  {contaminantOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  label="Umbral Inferior"
                  type="number"
                  value={lowerThreshold}
                  onChange={(e) => setLowerThreshold(e.target.value)}
                  inputProps={{ min: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  label="Umbral Superior"
                  type="number"
                  value={upperThreshold}
                  onChange={(e) => setUpperThreshold(e.target.value)}
                  inputProps={{ min: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="action-select-label">Acción</InputLabel>
                <Select
                  labelId="action-select-label"
                  id="action-select"
                  value={action}
                  label="Acción"
                  onChange={(e) => setAction(e.target.value as AlertAction)}
                >
                  <MenuItem value={AlertAction.EMAIL}>Email</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Destinatario"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Mensaje"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                {isEdit ? 'Actualizar Alerta' : 'Crear Alerta'}
              </Button>
            </Grid>
            {errorMessage && (
              <Grid item xs={12}>
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              </Grid>
            )}
            {successMessage && (
              <Grid item xs={12}>
                <Typography variant="body1" color="success">
                  {successMessage}
                </Typography>
              </Grid>
            )}
            {isLoading && (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  Cargando...
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
