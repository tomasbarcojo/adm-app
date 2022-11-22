import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/product.entity';
import { Pricelist } from './pricelist.entity';
@Entity({ name: 'PricelistProduct' })
export class PricelistProduct extends BaseEntity {
  @ApiProperty({
    description: 'the id of the register',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the id of the price list',
    type: 'number',
    example: 1,
  })
  @Column({ type: 'int', nullable: false })
  pricelistId: number;

  @ApiProperty({
    description: 'the id of the product',
    type: 'number',
    example: 1,
  })
  @Column({ type: 'int', nullable: false })
  productId: number;

  @ApiProperty({
    description: 'the date of creation of the register',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the register',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the register',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  // relation
  @ManyToMany(() => Product, (product) => product.pricelistProduct)
  @JoinColumn()
  product: Product;

  @ManyToMany(() => Pricelist, (pricelist) => pricelist.pricelistProduct)
  @JoinColumn()
  pricelist: Pricelist;
}
