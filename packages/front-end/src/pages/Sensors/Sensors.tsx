import AddIcon from "@mui/icons-material/Add";
import { Box, Link } from "@mui/material";
import { useState } from "react";
import {
  DrawerComponent,
  AddSensorComponent,
  ListSensorsComponent,
  RefreshButton,
} from "../../components";
import { SensorsList } from "../../types/sensors/SensorsFixture";

const sxMap = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    px: "4rem",
    py: "2rem",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    rowGap: "3rem",
    justifyContent: "space-between",
  },
  list: {
    cursor: "pointer",
  },
};

const Sensors = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const handleAdd = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <Box sx={sxMap.container}>
      <Box sx={sxMap.row}>
        <RefreshButton
          onClick={() => {
            console.log("Refreshing...");
          }}
        ></RefreshButton>

        <Link onClick={handleAdd} sx={sxMap.list}>
          <AddIcon color="action" fontSize="large">
            {" "}
          </AddIcon>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <ListSensorsComponent sensors={SensorsList}></ListSensorsComponent>
      </Box>
      <DrawerComponent
        children={<AddSensorComponent></AddSensorComponent>}
        toogleDrawer={handleAdd}
        isOpen={showDrawer}
      ></DrawerComponent>
    </Box>
  );
};

export default Sensors;
