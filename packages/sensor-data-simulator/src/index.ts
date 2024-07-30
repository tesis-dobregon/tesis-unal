import mqtt from 'mqtt';

console.log('Hello World');
const client = mqtt.connect('mqtt://localhost:1883');

client
  .on('connect', () => {
    console.log('Connected to MQTT broker');

    // Simulate sensor data and publish every 5 seconds
    setInterval(() => {
      const sensorData = {
        temperature: (Math.random() * 30).toFixed(2),
        humidity: (Math.random() * 100).toFixed(2),
        timestamp: new Date().toISOString(),
      };

      client.publish('sensor/data', JSON.stringify(sensorData));
      console.log('Published sensor data:', sensorData);
    }, 5000);
  })
  .on('error', (error) => {
    console.error('Error connecting to MQTT broker:', error);
  });
