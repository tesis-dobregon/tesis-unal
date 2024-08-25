import axios, { AxiosResponse } from 'axios';
import { SMART_CITY_UNAL_URLS, buildIngestionUrl } from './constants';
import { SensorData } from '@smart-city-unal/shared-types';

let authToken: string | null = null;
let tokenExpirationTime: number | null = null;

// Helper to authenticate using client credentials
async function authenticate(): Promise<void> {
  try {
    const response = await axios.post(
      SMART_CITY_UNAL_URLS.OAUTH_TOKEN,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: 'gateway', // your client id
          password: 'password', // your client secret
        },
      }
    );

    authToken = response.data.access_token;
    const expiresIn = response.data.expires_in; // in seconds
    tokenExpirationTime = Date.now() + expiresIn * 1000;

    console.log('Authenticated successfully. Token:', authToken);
  } catch (error) {
    console.error('Failed to authenticate:', error);
    throw error;
  }
}

// Helper to check if token is expired or not
async function ensureAuthenticated(): Promise<void> {
  if (!authToken || !tokenExpirationTime || Date.now() >= tokenExpirationTime) {
    await authenticate();
  }
}

// Helper to publish sensor data with authentication
export async function publishSensorData(
  sensorData: SensorData
): Promise<AxiosResponse> {
  try {
    console.log('Going to publish sensor data', sensorData);

    // Ensure we are authenticated before making the request
    await ensureAuthenticated();

    const ingestionDataUrl = buildIngestionUrl(sensorData.uid);
    return await axios.post(
      ingestionDataUrl,
      {
        data: sensorData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Add the Bearer token
        },
      }
    );
  } catch (error) {
    console.error({ error }, 'Failed to publish sensor data');
    throw error;
  }
}
