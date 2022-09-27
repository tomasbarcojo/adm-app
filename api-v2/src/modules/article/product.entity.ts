import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Product' })
export class Product extends BaseEntity {
  @ApiProperty({
    description: 'the id of the task',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the name of the product',
    type: 'string',
    example: 'product name',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  articleName: string;

  @ApiProperty({
    description: 'the code of the product',
    type: 'string',
    example: '1A2B3C',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @ApiProperty({
    description: 'the price of the product',
    type: 'number',
    example: '150.5',
  })
  @Column({ type: 'float', nullable: false })
  price: number;

  @ApiProperty({
    description: 'the stock of the product',
    type: 'number',
    example: '50',
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: 'the alert for low stock of the product',
    type: 'number',
    example: '50',
  })
  @Column({ type: 'int', nullable: false })
  stockAlert: number;
  
  @ApiProperty({
    description: 'the image of the product',
    type: 'string',
    example: '',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @ApiProperty({
    description: 'the description of the product',
    type: 'string',
    example: 'this is a description of the product',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  obs: string;

  @ApiProperty({
    description: 'the date of creation of the product',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the product',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the product',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  // relations
}
