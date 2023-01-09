import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purcharse.service';
import { PurchaseController } from './purchase.controller';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Purchase])],
  providers: [PurchaseService],
  exports: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
