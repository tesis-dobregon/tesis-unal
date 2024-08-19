import axios, { AxiosResponse } from 'axios';
import { buildIngestionUrl } from './constants';
import { SensorData } from '@smart-city-unal/shared-types';

export async function publishSensorData(
  sensorData: SensorData
): Promise<AxiosResponse> {
  try {
    console.log('Going to publish sensor data', sensorData);
    const ingestionDataUrl = buildIngestionUrl(sensorData.uid);
    return await axios.post(
      ingestionDataUrl,
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
    // TODO: handle exception correctly
    console.error({ error }, 'Failed to publish sensor data');
    throw error;
  }
}
