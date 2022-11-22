import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { createdocument } from './swagger';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // create nestjs app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // enable cors
  app.enableCors();

  // global endpoint validations with class-validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // getting the config service
  const configService = app.get(ConfigService);

  // getting the port env var
  const PORT = configService.get<number>('config.app.port');

  // getting the environment var
  const ENV = configService.get<string>('config.environment');

  if (ENV) {
    const environmentsToShowDocs = ['development', 'staging'];
    if (environmentsToShowDocs.includes(ENV)) {
      SwaggerModule.setup('docs', app, createdocument(app));
    }
  }

  // starting the server
  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`app listening at ${PORT} in ${ENV}`, 'main.ts');
  });
}

bootstrap();
