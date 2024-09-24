import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-base';

const endpoint = `${process.env.VITE_JAEGER_ENDPOINT}/api/traces`;

// Initialize the OpenTelemetry provider
const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'smart-city-unal',
  }),
  // Use a 10% sampling rate for the traces
  sampler: new TraceIdRatioBasedSampler(0.1),
});

const jaegerExporter = new JaegerExporter({
  endpoint,
});

// Add the Jaeger exporter to the provider
provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

// Register the provider
provider.register();

// Register the HTTP instrumentation
registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});

console.log(
  'OpenTelemetry tracer provider initialized with endpoint:',
  endpoint
);
