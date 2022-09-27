import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { exit } from 'process';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Logger } from '@nestjs/common';
import {
  AlwaysOnSampler,
  AlwaysOffSampler,
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/core';
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';

const traceExporter = new TraceExporter({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'vivo-delivery-api',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  sampler:
    process.env.OTL_ACTIVATE_SDK_AUTINSTRUMENTATION === 'false'
      ? new AlwaysOffSampler()
      : process.env.ENVIRONMENT === 'DEVELOPMENT'
      ? new AlwaysOnSampler()
      : new ParentBasedSampler({
          root: new TraceIdRatioBasedSampler(
            Number(process.env.RADIO_BASE_SAMPLER),
          ),
        }),
  //The BatchSpanProcessor will wait for a bit to collect as many spans as it can(up to a limit) before sending to the backend.
  spanProcessor:
    process.env.ENVIRONMENT === 'DEVELOPMENT'
      ? new SimpleSpanProcessor(traceExporter)
      : new BatchSpanProcessor(traceExporter),
});

sdk
  .start()
  .then(() =>
    Logger.log('Tracing initialized nest-api-template', 'autoTracing'),
  )
  .catch((error) =>
    Logger.error(
      'Error initializing tracing nest-api-template',
      error,
      'autoTracing',
    ),
  );

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() =>
      Logger.log('Tracing terminated nest-api-template', 'autoTracing'),
    )
    .catch((error) =>
      Logger.log(
        'Error terminating tracing nest-api-template',
        error,
        'autoTracing',
      ),
    )
    .finally(() => exit(0));
});

export default sdk;
