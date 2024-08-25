import fs from 'fs';
import path from 'path';
import mqtt, { IClientOptions, MqttClient } from 'mqtt';

const url = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';

console.log(
  'current path',
  path.join(__dirname, '../../../../packages/mqtt-gateway/certs/ca.crt')
);

const options: IClientOptions = {
  port: 8883,
  protocol: 'mqtts',
  protocolVersion: 5,
  keepalive: 60,
  rejectUnauthorized: false, // Set this to true if using a valid certificate authority
  username: process.env.MQTT_USERNAME || 'smart-city-unal', // Add your MQTT username
  password: process.env.MQTT_PASSWORD || 'securePassword', // Add your MQTT password
  ca: fs.readFileSync(
    path.join(__dirname, '../../../../packages/mqtt-gateway/certs/ca.crt')
  ),
  // cert: fs.readFileSync(
  //   path.join(__dirname, '../../../../packages/mqtt-gateway/certs/server.crt')
  // ), // Optional: Client certificate
  // key: fs.readFileSync(
  //   path.join(__dirname, '../../../../packages/mqtt-gateway/certs/server.key')
  // ), // Optional: Client key
  properties: {
    requestResponseInformation: true,
    requestProblemInformation: true,
  },
};

const mqttServerClient: MqttClient = mqtt.connect(url, options);

mqttServerClient.on('connect', () => {
  console.log(`connected to mqtt  ${new Date()}`);
});

mqttServerClient.on('error', (err) => {
  console.log(err);
});

export { mqttServerClient };
