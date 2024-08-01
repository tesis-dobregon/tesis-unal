import fs from 'fs';
import path from 'path';
import { round } from 'mathjs';

// Publish simulated sensor data to an MQTT broker every 15 seconds
const FREQUENCY_TO_PUBLISH_SIMULATED_DATA = 15000;
// Define the folder path conta sensor station metadata files
const METADATA_FOLDER = path.resolve(__dirname, '../sensor-station-metadata/');
// Define the key used to store metadata in the sensor station metadata files
const METADATA_KEY = 'metadata';

/**
 * Generates a random number based on the normal distribution using the Box-Muller transform.
 * @param mean - Mean value of the normal distribution.
 * @param std - Standard deviation of the normal distribution.
 * @returns A random number based on the specified normal distribution.
 */
function generateRandomNumber(mean: number, std: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * std + mean;
}

function buildFileMetadataFile(fileName: string) {
  return path.resolve(METADATA_FOLDER, fileName);
}

/**
 * Reads sensor station metadata files, generates simulated sensor records,
 * and returns the generated record.
 * @returns An object representing the simulated sensor data record.
 */
function readSensorStationsFolderAndGenerateSimulatedRecord(): Record<
  string,
  unknown
> {
  const record: Record<string, unknown> = {
    date: new Date().toISOString(),
  };

  // Read and process each metadata file in the folder
  fs.readdirSync(METADATA_FOLDER).forEach((file) => {
    const station = JSON.parse(
      fs.readFileSync(buildFileMetadataFile(file), 'utf-8')
    );

    Object.entries(station).forEach(([key, value]) => {
      const parsedValue = value as any;
      if (key !== METADATA_KEY) {
        const randomValue = generateRandomNumber(
          parsedValue.mean,
          parsedValue.std
        );
        // Round the random value to the nearest integer or 2 decimal places
        if (parsedValue.type === 'integer') {
          record[key] = round(randomValue);
        } else if (parsedValue.type === 'float') {
          record[key] = round(randomValue, 2);
        }
      } else {
        record['metadata'] = station['metadata'];
      }
    });
  });

  return record;
}

// Periodically generate and publish simulated sensor data
setInterval(() => {
  const data = readSensorStationsFolderAndGenerateSimulatedRecord();
  console.log('Simulated sensor data:', data);
  // Uncomment and replace the following line with the actual MQTT publish logic
  // mqttClient.publish('sensor/topic', JSON.stringify(data));
}, FREQUENCY_TO_PUBLISH_SIMULATED_DATA);
