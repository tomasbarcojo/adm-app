import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    description: 'the state of the purchase',
    type: 'string',
    example: 'en transito',
  })
  @Column({ type: 'enum',  enum: ["en transito", "recibida", "cancelada"], default: 'en transito', nullable: false })
  purchaseState: string;

  @ApiProperty({
    description: 'the date of payment expiration',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
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
}
