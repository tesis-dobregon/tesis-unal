export const SMART_CITY_UNAL_BACKEND_URL =
  process.env.SMART_CITY_UNAL_BACKEND_URL || 'http://0.0.0.0:3000';

export const SMART_CITY_UNAL_URLS = {
  SENSORS_SERVICE: `${SMART_CITY_UNAL_BACKEND_URL}/api/sensors`,
  INGESTION_SERVICE: `${SMART_CITY_UNAL_BACKEND_URL}/api/ingestion`,
  USERS_SERVICE: `${SMART_CITY_UNAL_BACKEND_URL}/api/users`,
};

export function buildIngestionUrl(sensorId: string) {
  return `${SMART_CITY_UNAL_URLS.INGESTION_SERVICE}/${sensorId}/data`;
}
