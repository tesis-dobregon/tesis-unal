export const SMART_CITY_UNAL_BACKEND_URL =
  process.env.SMART_CITY_UNAL_BACKEND_URL || 'https://0.0.0.0:3000';

export const SMART_CITY_UNAL_URLS = {
  SENSORS_SERVICE: `${SMART_CITY_UNAL_BACKEND_URL}/api/sensors`,
  USERS_SERVICE: `${SMART_CITY_UNAL_BACKEND_URL}/api/users`,
};

export function buildSensorDataUrl(sensorId: string) {
  return `${SMART_CITY_UNAL_URLS.SENSORS_SERVICE}/${sensorId}/data`;
}
