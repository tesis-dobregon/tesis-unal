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
          username: process.env.VITE_GATEWAY_CLIENT_ID ?? 'gateway', // your client id
          password: process.env.VITE_GATEWAY_CLIENT_SECRET ?? 'password', // your client secret
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
export async function ensureAuthenticated(): Promise<void> {
  console.log('Checking if authenticated...');
  if (!authToken || !tokenExpirationTime || Date.now() >= tokenExpirationTime) {
    console.log('Token is expired or not present. Going to authenticate...');
    await authenticate();
  } else {
    console.log('Token is still valid');
  }
}

// Helper to publish sensor data with authentication
export async function publishSensorData(
  sensorData: SensorData,
  headers: Record<string, string> = {}
): Promise<AxiosResponse> {
  try {
    console.log('Going to publish sensor data', sensorData);

    // Ensure we are authenticated before making the request
    await ensureAuthenticated();

    const ingestionDataUrl = buildIngestionUrl(sensorData.uid);
    console.log('Ingestion data URL:', ingestionDataUrl);
    return await axios.post(
      ingestionDataUrl,
      {
        data: sensorData,
      },
      {
        headers: {
          ...headers,
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
