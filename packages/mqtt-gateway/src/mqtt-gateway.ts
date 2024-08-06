import {
  mqttServerClient,
  subscribeToTopic,
} from '@smart-city-unal/shared-mqtt';

const SENSOR_TYPES = {
  AIR_QUALITY_STANDART: 'air_quality_standard',
};

export function runGateway() {
  subscribeToTopic(
    mqttServerClient,
    `sensor/${SENSOR_TYPES.AIR_QUALITY_STANDART}/data`,
    (topic: string, message: Buffer) => {
      console.log(
        `Received message from topic ${topic}: ${message.toString()}`
      );
      // TODO: Send data to backend.
    }
  );
}

runGateway();
