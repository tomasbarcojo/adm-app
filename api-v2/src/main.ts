import helmet from 'fastify-helmet';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { createdocument } from './swagger';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // create nestjs app
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // enable cors
  app.enableCors();

  // global endpoint validations with class-validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // getting the config service
  const configService = app.get(ConfigService);

  // getting the port env var
  const PORT = configService.get<number>('config.app.port');

  // getting the environment var
  const ENV = configService.get<string>('config.environment');

  if (ENV) {
    const environmentsToShowDocs = ['development', 'staging'];

    if (environmentsToShowDocs.includes(ENV)) {
      app.register(helmet, {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: [`'self'`],
            styleSrc: [`'self'`, `'unsafe-inline'`],
            imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          },
        },
      });

      SwaggerModule.setup('docs', app, createdocument(app));
    }
  }

  // starting the server
  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`app listening at ${PORT} in ${ENV}`, 'main.ts');
  });
}

bootstrap();

// ClusterService.clusterize(bootstrap);
