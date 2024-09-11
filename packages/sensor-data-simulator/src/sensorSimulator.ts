import '@smart-city-unal/shared-metrics/src/lib/opentelemetry';

import fs from 'fs';
import path from 'path';
import { round } from 'mathjs';
import { generateRandomNumber, generateRandomPoint } from './util';
import { GeoPoint } from './types';
import { mqttServerClient, publishToTopic } from '@smart-city-unal/shared-mqtt';
import {
  SensorData,
  SensorDataWithContext,
  SensorMetadata,
} from '@smart-city-unal/shared-types';
import { trace, context, propagation } from '@opentelemetry/api';

const tracer = trace.getTracer('sensor-data-simulator');

const RADIUS = 3000; // 3 km
const CENTER_POINT: GeoPoint = {
  // Duitama center point
  lat: 5.827528376419425,
  lon: -73.03398797041362,
};

// Number of simulated sensors to generate
const NUMBER_OF_SIMULATED_SENSORS = process.env.VITE_NUMBER_OF_SIMULATED_SENSORS
  ? Number(process.env.VITE_NUMBER_OF_SIMULATED_SENSORS)
  : 4;

// Frequency to publish simulated sensor data in milliseconds. Default is 15 seconds.
const FREQUENCY_TO_PUBLISH_SIMULATED_DATA = process.env
  .VITE_FREQUENCY_TO_PUBLISH_SIMULATED_DATA
  ? Number(process.env.VITE_FREQUENCY_TO_PUBLISH_SIMULATED_DATA)
  : 15000;

// Define the folder path conta sensor station metadata files
const METADATA_FOLDER = path.resolve(__dirname, '../sensor-station-metadata/');
// Define the key used to store metadata in the sensor station metadata files
const METADATA_KEY: keyof SensorData = 'metadata';

function buildFileMetadataFile(fileName: string) {
  return path.resolve(METADATA_FOLDER, fileName);
}

function generateSimulatedSensorRecord(
  station: Record<keyof SensorData, unknown>,
  index: number
): SensorData {
  // Generates a random point within a 3 km radius of the center point
  const { lat, lon } = generateRandomPoint(CENTER_POINT, RADIUS);
  const record: SensorData = {
    date: new Date().toISOString(),
    uid: `AQ0${index}`,
    name: `AirQualityUnit0${index}`,
    description: `Air quality station in Duitama ${index}`,
    lat,
    lon,
  };

  Object.entries(station).forEach(([key, value]) => {
    const parsedValue = value as any;
    if (key !== METADATA_KEY) {
      const randomValue = generateRandomNumber(
        parsedValue.mean,
        parsedValue.std
      );
      // Round the random value to the nearest integer or 2 decimal places
      if (parsedValue.type === 'integer') {
        (record as any)[key as any] = round(randomValue);
      } else if (parsedValue.type === 'float') {
        (record as any)[key] = round(randomValue, 2);
      }
    } else {
      record.metadata = station['metadata'] as SensorMetadata;
    }
  });

  return record;
}

/**
 * Reads sensor station metadata files, generates simulated sensor records,
 * and returns the generated record.
 * @returns An object representing the simulated sensor data record.
 */
function readSensorStationsFolderAndGenerateSimulatedRecord() {
  console.log(
    'Reading sensor stations folder and generating simulated records'
  );
  console.log('Config data:', {
    NUMBER_OF_SIMULATED_SENSORS,
    FREQUENCY_TO_PUBLISH_SIMULATED_DATA,
  });
  // Read and process each metadata file in the folder
  fs.readdirSync(METADATA_FOLDER).forEach((file) => {
    const station = JSON.parse(
      fs.readFileSync(buildFileMetadataFile(file), 'utf-8')
    );

    for (let i = 0; i < NUMBER_OF_SIMULATED_SENSORS; i++) {
      const sensorRecord = generateSimulatedSensorRecord(station, i);
      const span = tracer.startSpan('Produce sensor data', {
        attributes: {
          sensorId: sensorRecord.uid,
        },
      });
      context.with(trace.setSpan(context.active(), span), () => {
        const headers = {};
        propagation.inject(context.active(), headers);

        const payload: SensorDataWithContext = {
          sensorData: sensorRecord,
          headers,
        };

        publishToTopic(
          mqttServerClient,
          `sensor/${sensorRecord?.metadata?.type}/data`,
          JSON.stringify(payload),
          () => {
            span.end();
          }
        );
      });
    }
  });
}

// Periodically generate and publish simulated sensor data
setInterval(() => {
  readSensorStationsFolderAndGenerateSimulatedRecord();
  // const data = readSensorStationsFolderAndGenerateSimulatedRecord();
  // console.log('Simulated sensor data:', data);
  // Uncomment and replace the following line with the actual MQTT publish logic
  // mqttClient.publish('sensor/topic', JSON.stringify(data));
}, FREQUENCY_TO_PUBLISH_SIMULATED_DATA);
