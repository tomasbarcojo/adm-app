import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Category' })
export class Category extends BaseEntity {
  @ApiProperty({
    description: 'the id of the category',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the name of the category',
    type: 'string',
    example: 'category name',
  })
  @Column({ type: 'varchar', length: 160, nullable: false })
  categoryName: string;

  @ApiProperty({
    description: 'the image of the product',
    type: 'string',
    example: '',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @ApiProperty({
    description: 'the date of creation of the category',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the category',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the category',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  // relations
}
