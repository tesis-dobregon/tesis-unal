import { List, ListItemButton, ListItemText } from "@mui/material";
import { Sensor } from "../../types/sensors/sensor";

interface ListSensorsComponentProps {
  sensors: Sensor[];
}

export const ListSensorsComponent: React.FunctionComponent<
  ListSensorsComponentProps
> = ({ sensors = [] }) => {
  return (
    <div>
      <List
        sx={{
          cursor: "pointer",
          borderTop: "1px solid #E0E0E0",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }}
        className="sensor-list"
      >
        {sensors.map((sensor, index) => (
          <ListItemButton key={index}>
            <ListItemText primary={sensor.name} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};
