import {
  mqttServerClient,
  subscribeToTopic,
} from '@smart-city-unal/shared-mqtt';
import { publishSensorData } from './services';
import { SensorData } from '@smart-city-unal/shared-types';

const SENSOR_TYPES = {
  AIR_QUALITY_STANDART: 'air_quality_standard',
};

export function runGateway() {
  subscribeToTopic(
    mqttServerClient,
    `sensor/${SENSOR_TYPES.AIR_QUALITY_STANDART}/data`,
    async (topic: string, message: Buffer) => {
      console.log(
        `Received message from topic ${topic}: ${message.toString()}`
      );
      const parsedMessage = JSON.parse(message.toString()) as SensorData;
      await publishSensorData(parsedMessage);
    }
  );
}

runGateway();
