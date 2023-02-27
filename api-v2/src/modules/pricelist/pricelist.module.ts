import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Pricelist } from './entities/pricelist.entity';

import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';
import { PricelistProduct } from './entities/pricelist-product.entity';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Pricelist, PricelistProduct])],
  providers: [PricelistService],
  exports: [PricelistService],
  controllers: [PricelistController],
})
export class PricelistModule {}
