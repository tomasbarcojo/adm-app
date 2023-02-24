import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from 'src/modules/supplier/supplier.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchasedProduct } from './purchase-product.entity';

export enum PurchaseStatus {
  EN_TRANSITO = 'en transito',
  RECIBIDA = 'recibida',
  CANCELADA = 'cancelada',
}

@Entity({ name: 'Purchase' })
export class Purchase extends BaseEntity {
  @ApiProperty({
    description: 'the id of de purchase',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the supplier from whom the purchase is made',
    type: 'number',
    example: '1',
  })
  @Column({ type: 'int', nullable: false })
  supplierId: number;

  @ApiProperty({
    description: 'the state of the purchase',
    type: 'string',
    example: 'en transito',
  })
  @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.EN_TRANSITO, nullable: false })
  purchaseStatus: string;

  @ApiProperty({
    description: 'the date of payment expiration',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @Column({ type: 'datetime', nullable: true })
  paymentExpirationDate: Date;

  @ApiProperty({
    description: 'the date of creation of the purchase',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the purchase',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the purchase',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  // relations
  @OneToMany(() => PurchasedProduct, (purchaseProduct) => purchaseProduct.purchase)
  purchasedProduct: PurchasedProduct;

  @ManyToOne(() => Supplier, (supplier) => supplier.purchase)
  @JoinColumn()
  supplier: Supplier;
}
