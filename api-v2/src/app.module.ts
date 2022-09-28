import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';
import ormConfig from './ormconfig';

import { CommonModule } from './common/common.module';

import { HealthController } from './health/health.controller';
import { PubsubPocModule } from './modules/pubsub-poc/pubsub-poc.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...ormConfig,
          logging: configService.get<string>('config.database.log') === 'yes',
          timezone: 'Z',
        };
      },
    }),

    // Common Module
    CommonModule,

    // Terminus module
    TerminusModule,

    HttpModule,

    // Task Module (just a refence module)
    ProductModule,

    // PubsubPoc Module (Totallly optional)
    PubsubPocModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}