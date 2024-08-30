import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SensorDataComponentProps, useSensorData } from './useSensorData';

export const SensorDataComponent = (props: SensorDataComponentProps) => {
  const {
    isLoading,
    isError,
    data,
    handleFetchData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useSensorData(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Datos del Sensor
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <DateTimePicker
              label="Fecha de Inicio"
              value={startDate}
              onChange={(newValue) =>
                setStartDate(newValue ? newValue.toString() : null)
              }
              slotProps={{
                field: { clearable: true },
                popper: {
                  disablePortal: true,
                },
              }}
              slots={{
                textField: (props) => <TextField {...props} fullWidth />,
              }}
            />{' '}
          </Grid>
          <Grid item xs={12} md={4}>
            <DateTimePicker
              label="Fecha de Fin"
              value={endDate}
              onChange={(newValue) =>
                setEndDate(newValue ? newValue.toString() : null)
              }
              slotProps={{
                field: { clearable: true },
                popper: {
                  disablePortal: true,
                },
              }}
              slots={{
                textField: (props) => <TextField {...props} fullWidth />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFetchData}
              disabled={!startDate || !endDate || isLoading}
            >
              {isLoading ? 'Cargando...' : 'Cargar Datos'}
            </Button>
          </Grid>
        </Grid>

        {data && (
          <Box mt={4}>
            {isError && (
              <Typography color="error">Se ha presentado un error</Typography>
            )}
            {data && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>CO</TableCell>
                      <TableCell>CO2</TableCell>
                      <TableCell>PM10</TableCell>
                      <TableCell>PM5</TableCell>
                      <TableCell>Temperatura</TableCell>
                      <TableCell>Fecha de medición</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((sensor) => (
                      <TableRow key={sensor.uid}>
                        <TableCell>{sensor.name}</TableCell>
                        <TableCell>{sensor.co}</TableCell>
                        <TableCell>{sensor.co2}</TableCell>
                        <TableCell>{sensor.pm10}</TableCell>
                        <TableCell>{sensor.pm5}</TableCell>
                        <TableCell>{sensor.temperature}</TableCell>
                        <TableCell>
                          {new Date(sensor.date).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};
