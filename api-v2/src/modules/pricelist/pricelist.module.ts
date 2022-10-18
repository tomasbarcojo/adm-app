import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Pricelist } from './pricelist.entity';

import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Pricelist])],
  providers: [PricelistService],
  exports: [PricelistService],
  controllers: [PricelistController],
})
export class PricelistModule {}