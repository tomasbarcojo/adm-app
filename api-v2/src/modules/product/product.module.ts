import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Product } from './product.entity';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
