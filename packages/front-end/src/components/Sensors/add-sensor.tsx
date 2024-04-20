import { Button, Container, FormControl, Grid, InputBase, InputLabel, MenuItem, NativeSelect, TextField, Typography, styled } from "@mui/material"
import './add-sensor.scss';
import { SensorTypeList } from "../../types/sensors/sensorTypeFixture";
import { FrequencyList } from "../../types/sensors/frequencyFixture";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
export const AddSensorComponent: React.FunctionComponent<unknown> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => {
    return(
        <div className="add-sensor-container">
            <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Crear Sensor
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl  fullWidth ><BootstrapInput placeholder="Nombre del sensor" id="sensorName" />
                                </FormControl>     
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl  fullWidth >
                                    <NativeSelect
                                        value={SensorTypeList[0].name}
                                        input={<BootstrapInput />}
                                        >
                                        <option aria-label="None" value="" />
                                        {SensorTypeList.map((item) => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </NativeSelect>          
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl  fullWidth ><BootstrapInput placeholder="Identificador" id="Identificador" />
                                </FormControl>  
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl  fullWidth >
                                    <NativeSelect
                                        value={FrequencyList[0].id}
                                        input={<BootstrapInput />}
                                        >
                                        <option aria-label="None" value="" />
                                        {FrequencyList.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.minutes} minutes
                                            </option>
                                        ))}
                                    </NativeSelect>          
                                </FormControl>                
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    variant="contained"
                                    
                                    fullWidth
                                    sx={{ color: 'white', background: 'black' }}
                                >
                                    Crear Sensor
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
        </div>
    )
}