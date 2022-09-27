import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';

import { SeedTasksFactory } from './tasks.seed';

(async () => {
  // getting the nest js app
  const application = await NestFactory.createApplicationContext(AppModule);

  Logger.log({
    stt: 'undetermined',
    context: 'index.ts',
    functionName: 'none',
    message: 'INIT --SEEDS--',
  });

  await Promise.all([SeedTasksFactory.seed(application)]);

  Logger.log({
    stt: 'undetermined',
    context: 'index.ts',
    functionName: 'none',
    message: 'END --SEEDS--',
  });
})()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));
