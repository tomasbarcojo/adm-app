import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/product/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity({ name: 'PurchasedProduct' })
export class PurchasedProduct extends BaseEntity {
  @ApiProperty({
    description: 'the id of de purchase',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the id of the product',
    type: 'number',
    example: 1,
  })
  @Column({ type: 'int', nullable: false })
  productId: number;

  @ApiProperty({
    description: 'the id of the purchase',
    type: 'number',
    example: 1,
  })
  @Column({ type: 'int', nullable: false })
  purchaseId: number;

  @ApiProperty({
    description: 'the state of the purchase',
    type: 'string',
    example: 'en transito',
  })
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ApiProperty({
    description: 'the price of the product',
    type: 'number',
    example: '150.5',
  })
  @Column({ type: 'decimal', precision: 11, scale: 5, default: 0, nullable: false })
  price: number;

  @ApiProperty({
    description: 'the discount applied to the product',
    type: 'number',
    example: '150.5',
  })
  @Column({ type: 'decimal', precision: 11, scale: 5, default: 0, nullable: false })
  discount: number;

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
  @ManyToOne(() => Purchase, (purchase) => purchase.purchasedProduct)
  purchase: Purchase;

  @ManyToOne(() => Product, (product) => product.purchasedProduct)
  product: Product;
}
