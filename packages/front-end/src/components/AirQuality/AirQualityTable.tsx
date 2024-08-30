import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';

export const AirQualityTable = () => {
  const rows = [
    {
      range: '0 - 50',
      status: 'Buena',
      effects:
        'La contaminación atmosférica supone un riesgo bajo para la salud.',
      color: '#0FA958',
    },
    {
      range: '51 - 100',
      status: 'Aceptable',
      effects:
        'Posibles síntomas respiratorios en grupos poblacionales sensibles.',
      color: '#F5ED24',
    },
    {
      range: '101 - 150',
      status: 'Dañina a la salud de grupos sensibles',
      effects:
        'Los grupos poblacionales sensibles pueden presentar efectos sobre la salud.',
      color: '#EE904B',
    },
    {
      range: '151 - 200',
      status: 'Dañina para la salud',
      effects:
        'Todos los individuos pueden comenzar a experimentar efectos sobre la salud.',
      color: '#EF1111',
    },
    {
      range: '201 - 300',
      status: 'Muy dañina para la salud',
      effects:
        'Estado de alerta que significa que todos pueden experimentar efectos más graves para la salud.',
      color: '#8A3CD8',
    },
    {
      range: '301 - 500',
      status: 'Peligrosa',
      effects:
        'Advertencia sanitaria. Toda la población puede presentar efectos adversos graves.',
      color: '#7D6951',
    },
  ];

  return (
    <TableContainer>
      <Typography variant="h6" align="center" gutterBottom>
        Escala de Calidad del Aire
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rango</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Efectos</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.range}>
              <TableCell>{row.range}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.effects}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: row.color,
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
