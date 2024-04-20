import { List, ListItem, ListItemButton, ListItemText, MenuItem, TextField, Typography } from "@mui/material"
import { sensor } from "../../types/sensors/sensor";
import './list-sensors.scss'
interface props{
    sensors: sensor[]
}
export const ListSensorsComponent: React.FunctionComponent<props> = ({
    sensors= []
}) => {
    return (
        <div>
            <List className="sensor-list">
                {sensors.map((sensor, index) => (
                    <ListItemButton key={index}>
                        <ListItemText primary={sensor.name} />
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
}