import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Product } from './product.entity';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Product])],
  providers: [ProductService, { provide: 'productRepository', useClass: ProductRepository }],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
