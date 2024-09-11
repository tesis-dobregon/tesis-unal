import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

// Initialize the OpenTelemetry provider
const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'smart-city-unal',
  }),
});

// Configure the Jaeger exporter
const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces', // Dirección del collector de Jaeger
  tags: [
    {
      key: 'service.name',
      value: 'smart-city-unal',
    },
  ],
});

// Add the Jaeger exporter to the provider
provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

// Register the provider
provider.register();

// Register the HTTP instrumentation
registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});

console.log('OpenTelemetry tracer provider initialized');
