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
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AtGuard } from './common/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';

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

    // Modules
    AuthModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
