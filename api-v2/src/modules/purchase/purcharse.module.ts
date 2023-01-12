import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import { PurchasedProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purcharse.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseRepository } from './purchase.repository';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([PurchasedProduct])],
  providers: [
    PurchaseService,
    {
      provide: 'purchaseRepository',
      useClass: PurchaseRepository,
    },
  ],
  exports: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
