import { ListSensorsComponent } from "../../components/Sensors/list-sensors";
import refreshImg from '../../assets/images/REFRESH.svg';
import { SensorsList } from "../../types/sensors/SensorsFixture";
import AddIcon from '@mui/icons-material/Add';
import './Sensors.scss'
import { useState } from "react";
import DrawerComponent from "../../components/Drawer/drawer";
import { AddSensorComponent } from "../../components/Sensors/add-sensor";
const Sensors = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const handleAdd = () =>{
    setShowDrawer(!showDrawer);
  }
  return (
    <>
      <div className="sensors-content">
        <div className="options-section">
          <a className="pointer">
            <img src={refreshImg}></img>
          </a>

          <a className="add-icon pointer" onClick={handleAdd}>
            <AddIcon color="action" fontSize="large"> </AddIcon>
          </a>
        </div>
        <div className="sensor-list-container">      
          <ListSensorsComponent sensors={SensorsList}>
          </ListSensorsComponent>
        </div>      
        <DrawerComponent children={<AddSensorComponent></AddSensorComponent>} toogleDrawer={handleAdd} isOpen={showDrawer}></DrawerComponent>
      </div>
    </>
  )
};

export default Sensors;
