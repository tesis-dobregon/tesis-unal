import mqtt, { IClientOptions, MqttClient } from 'mqtt';

const url = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';

const options: IClientOptions = {
  port: 1883,
  protocolVersion: 5,
  keepalive: 60,
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
