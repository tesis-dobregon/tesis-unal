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
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    } else {
      console.log(`Successfully subscribed to topic ${topic}`);
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
 * @param options - Optional publish options.
 */
export function publishToTopic(
  client: MqttClient,
  topic: string,
  message: string | Buffer,
  options?: { qos?: 0 | 1 | 2; retain?: boolean }
): void {
  client.publish(topic, message, options, (err) => {
    if (err) {
      console.error(`Failed to publish message to topic ${topic}:`, err);
    } else {
      console.log(`Successfully published message to topic ${topic}`);
    }
  });
}
