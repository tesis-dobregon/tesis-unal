import '@smart-city-unal/shared-metrics/src/lib/opentelemetry';

import {
  mqttServerClient,
  subscribeToTopic,
} from '@smart-city-unal/shared-mqtt';
import { trace, context, propagation } from '@opentelemetry/api';
import { ensureAuthenticated, publishSensorData } from './services';
import { SensorDataWithContext } from '@smart-city-unal/shared-types';
import { SMART_CITY_UNAL_URLS } from './services/constants';

const tracer = trace.getTracer('gateway');

const SENSOR_TYPES = {
  AIR_QUALITY_STANDART: 'air_quality_standard',
};

const MAX_RETRIES = 5;
const ERROR_MESSAGES = {
  FAILED_TO_RUN_GATEWAY: `Failed to run gateway after ${MAX_RETRIES} retries`,
};

export async function runGateway() {
  let retries = 0;
  try {
    console.log('Starting gateway...');
    if (retries > MAX_RETRIES) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_RUN_GATEWAY);
    }

    await ensureAuthenticated();

    subscribeToTopic(
      mqttServerClient,
      `sensor/${SENSOR_TYPES.AIR_QUALITY_STANDART}/data`,
      async (topic: string, message: Buffer) => {
        console.log(
          `Received message from topic ${topic}: ${message.toString()}`
        );

        const parsedMessage = JSON.parse(
          message.toString()
        ) as SensorDataWithContext;
        const traceCtx = propagation.extract(context.active(), {
          traceparent: parsedMessage.headers.traceparent,
        });

        const span = tracer.startSpan(
          'Process Sensor Data in Gateway',
          {
            attributes: {
              sensorId: parsedMessage.sensorData.uid,
            },
          },
          traceCtx
        );

        context.with(trace.setSpan(context.active(), span), async () => {
          try {
            const headers = {};
            propagation.inject(context.active(), headers);

            await publishSensorData(parsedMessage.sensorData, headers);

            span.end();
          } catch (error) {
            span.recordException(error as any);
            span.end();
          }
        });
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
