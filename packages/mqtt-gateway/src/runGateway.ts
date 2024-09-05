import {
  mqttServerClient,
  subscribeToTopic,
} from '@smart-city-unal/shared-mqtt';
import { publishSensorData } from './services';
import { SensorData } from '@smart-city-unal/shared-types';
import { SMART_CITY_UNAL_URLS } from './services/constants';

const SENSOR_TYPES = {
  AIR_QUALITY_STANDART: 'air_quality_standard',
};

const MAX_RETRIES = 5;
const ERROR_MESSAGES = {
  FAILED_TO_RUN_GATEWAY: `Failed to run gateway after ${MAX_RETRIES} retries`,
};

export function runGateway() {
  let retries = 0;
  try {
    console.log('Starting gateway...');
    if (retries > MAX_RETRIES) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_RUN_GATEWAY);
    }
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
    console.log('Gateway is running', {
      SMART_CITY_UNAL_URLS,
    });
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.FAILED_TO_RUN_GATEWAY) {
      throw error;
    }
    retries++;
    console.error('Failed to run gateway:', error);
  }
}

runGateway();
