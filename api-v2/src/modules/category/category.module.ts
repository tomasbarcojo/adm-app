import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Category } from './category.entity';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
