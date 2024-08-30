import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAirQualityChart } from './useAirQualityChart';

const sxMap = {
  container: {
    marginTop: 4,
  },
};

export const AirQualityChart: React.FC<unknown> = () => {
  const { data, refetch, startDate, setStartDate, endDate, setEndDate } =
    useAirQualityChart();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={sxMap.container}>
        <Typography variant="h4" align="center" gutterBottom>
          Comportamiento de Contaminantes
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item>
            <DateTimePicker
              label="Fecha de Inicio"
              value={startDate}
              onChange={(newValue) =>
                setStartDate(newValue ? newValue.toISOString() : null)
              }
              slots={{
                textField: (props: any) => <TextField {...props} fullWidth />,
              }}
              slotProps={{
                field: { clearable: true },
                popper: {
                  disablePortal: true,
                },
              }}
            />
          </Grid>
          <Grid item>
            <DateTimePicker
              label="Fecha de Fin"
              value={endDate}
              onChange={(newValue) =>
                setEndDate(newValue ? newValue.toISOString() : null)
              }
              slots={{
                textField: (props: any) => <TextField {...props} fullWidth />,
              }}
              slotProps={{
                field: { clearable: true },
                popper: {
                  disablePortal: true,
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => refetch()}
            >
              Aplicar Filtros
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data ?? ([] as any)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pm2_5"
                stroke="#82ca9d"
                name="PM 2.5"
              />
              <Line
                type="monotone"
                dataKey="pm10"
                stroke="#8884d8"
                name="PM 10"
              />
              <Line type="monotone" dataKey="co" stroke="#ff7300" name="CO" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
