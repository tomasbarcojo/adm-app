import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';
import { dataSourceOptions } from './ormconfig';

import { CommonModule } from './common/common.module';

// import { HealthController } from './health/health.controller';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { CategoryModule } from './modules/category/category.module';
import { PricelistModule } from './modules/pricelist/pricelist.module';
import { PurchaseModule } from './modules/purchase/purcharse.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ClientModule } from './modules/client/client.module';
import { UploadFilesModule } from './modules/upload-image/upload-file.module';

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
          ...dataSourceOptions,
          logging: configService.get<string>('config.database.log') === 'yes',
          timezone: 'Z',
        };
      },
    }),

    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: configService.get<number>('CACHE_TTL'),
    //     isGlobal: true,
    //   }),
    // }),

    // Common Module
    CommonModule,

    HttpModule,

    // Modules
    AuthModule,
    ProductModule,
    UserModule,
    CategoryModule,
    PricelistModule,
    PurchaseModule,
    SupplierModule,
    ClientModule,
    UploadFilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
