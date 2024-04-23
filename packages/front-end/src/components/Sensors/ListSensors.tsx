import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, SvgIcon, Typography } from "@mui/material";
import { Sensor } from "../../types/sensors/sensor";
import { TableComponent } from "../Table/Table";
import { SensorsList } from "../../types/sensors/SensorsFixture";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import { HeaderProperty } from "../../types/sensors/table/table";

interface ListSensorsComponentProps {
  sensors: Sensor[];
}

export const ListSensorsComponent: React.FunctionComponent<
  ListSensorsComponentProps
> = ({ sensors = [] }) => {
  /**
   * TODO
   * Handle sensors with state
   */
  const headerProperties: HeaderProperty[] = [
    {name: "Nombre del sensor", accesor:  "name", showName: true, renderAction: (data:any) =>{
      return <Typography>{data.name}</Typography> 
    }},
    {name: "Id", accesor:  "identifier", showName: true, renderAction: (data:any) =>{
      return <Typography>{data.identifier}</Typography> 
    }},
    {name: "Tipo", accesor:  "sensorType.name", showName: true, renderAction: (data:any) =>{
      return <Typography>{data.sensorType.name}</Typography> 
    }},
    {name: "Última Act.", accesor:  "lastUpdate", showName: true, renderAction: (data:any) =>{
      return <Typography>{data.lastUpdate}</Typography> 
    }},
    {name: "Periodo", accesor:  "frequency.name", showName: true, renderAction: (data:any) =>{
      return <Typography>{data.frequency.name}</Typography> 
    }},
    {name: "Estado", accesor:  "state.name", showName: true, renderAction: (data:any) =>{
      switch(data.state.id){
        case 1:
          return <Box sx={{display: 'flex', flexDirection: 'row'}} component="section"><SvgIcon component={CircleIcon} color="success"> </SvgIcon></Box>
        case 2:
          return <Box component="section"><SvgIcon component={CircleIcon} color="error"> </SvgIcon></Box>
        default:
          return <></>
      }
    
    }},
    {name: "Actions", accesor:  "", showName: false,  renderAction: (data:any) =>{
      return <IconButton aria-label="more"><SvgIcon component={MoreHorizIcon}> </SvgIcon></IconButton>
    }},
  ]
  return (
    <Box>
      <Box>
        <List>
          <ListItem key={0}>
            <SvgIcon component={CircleIcon} color="success"> </SvgIcon>
            <ListItemText primary="Activo" secondary={"Representa un sensor en funcionamiento"} />
          </ListItem>
          <ListItem key={1}>
            <SvgIcon component={CircleIcon} color="error"> </SvgIcon>
            <ListItemText primary="Inactivo" secondary={"Representa un sensor apagado"} />
          </ListItem>
          </List>
      </Box>

      <TableComponent data={SensorsList} header={headerProperties}></TableComponent>
    </Box>
  );
};
