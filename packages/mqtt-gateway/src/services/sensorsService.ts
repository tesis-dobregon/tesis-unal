import axios, { AxiosResponse } from 'axios';
import { buildSensorDataUrl } from './constants';
import { SensorData } from '@smart-city-unal/shared-types';

export async function publishSensorData(
  sensorData: SensorData
): Promise<AxiosResponse> {
  try {
    console.log('Going to publish sensor data', sensorData);
    const sensorDataUrl = buildSensorDataUrl(sensorData.uid);
    return await axios.post(
      sensorDataUrl,
      {
        data: sensorData,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error({ error }, 'Failed to publish sensor data');
    throw error;
  }
}
