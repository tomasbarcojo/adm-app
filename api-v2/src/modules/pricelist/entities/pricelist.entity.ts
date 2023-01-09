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
import { PricelistProduct } from './pricelist-product.entity';

@Entity({ name: 'Pricelist' })
export class Pricelist extends BaseEntity {
  @ApiProperty({
    description: 'the id of the pricelist',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the name of de pricelist',
    type: 'string',
    example: 'pricelist name',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  pricelistName!: string;

  @ApiProperty({
    description: 'the date of creation of the pricelist',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the pricelist',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the pricelist',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  // relation

  @ManyToMany(() => PricelistProduct, (pricelistProduct) => pricelistProduct.pricelist)
  pricelistProduct: PricelistProduct;
  // @OneToMany(() => Product, (product) => product.pricelist)
  // @JoinColumn()
  // product: Product;
}
