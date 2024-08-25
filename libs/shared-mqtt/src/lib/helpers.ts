import { MqttClient } from 'mqtt';

/**
 * Subscribes to an MQTT topic and handles incoming messages.
 *
 * @param client - The MQTT client instance.
 * @param topic - The topic to subscribe to.
 * @param onMessage - Callback function to handle incoming messages.
 */
export function subscribeToTopic(
  client: MqttClient,
  topic: string,
  onMessage: (topic: string, message: Buffer) => Promise<void>
): void {
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    } else {
      console.log(`Successfully subscribed to topic ${topic} with QoS 1`);
    }
  });

  client.on('message', async (receivedTopic, message) => {
    if (receivedTopic === topic) {
      await onMessage(receivedTopic, message);
    }
  });
}

/**
 * Publishes a message to an MQTT topic.
 *
 * @param client - The MQTT client instance.
 * @param topic - The topic to publish to.
 * @param message - The message to publish.
 */
export function publishToTopic(
  client: MqttClient,
  topic: string,
  message: string | Buffer
): void {
  client.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error(`Failed to publish message to topic ${topic}:`, err);
    } else {
      console.log(
        `Successfully published message to topic ${topic} with QoS 1`
      );
    }
  });
}
