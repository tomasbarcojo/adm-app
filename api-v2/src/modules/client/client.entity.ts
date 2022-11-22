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

@Entity({ name: 'Client' })
export class Client extends BaseEntity {
  @ApiProperty({
    description: 'the id of the client',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the businessName',
    type: 'string',
    example: 'businessName name',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  businessName: string;

  @ApiProperty({
    description: 'the cuit of supprier',
    type: 'string',
    example: '20-20202020-2',
  })
  @Column({ type: 'varchar', length: 16, nullable: false })
  cuit: string;

  @ApiProperty({
    description: 'the phone number',
    type: 'string',
    example: '3426123123',
  })
  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @ApiProperty({
    description: 'alternative phone',
    type: 'string',
    example: '3426123123',
  })
  @Column({ type: 'varchar', length: 20, nullable: false })
  altPhone?: string;

  @ApiProperty({
    description: 'address',
    type: 'string',
    example: '3426123123',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @ApiProperty({
    description: 'city',
    type: 'string',
    example: 'Santa Fe',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  city: string;

  @ApiProperty({
    description: 'postal code',
    type: 'string',
    example: '3000',
  })
  @Column({ type: 'varchar', length: 16, nullable: false })
  CP: string;

  @ApiProperty({
    description: 'the date of creation of the supplier',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the supplier',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the supplier',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
