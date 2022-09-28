import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskType {
  WORK = 'WORK',
  NO_WORK = 'NO_WORK',
}

@Entity({ name: 'task' })
@Unique('uk_task_uid', ['uid'])
export class Task extends BaseEntity {
  @ApiProperty({
    description: 'the id of the task',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the uid of the task',
    type: 'string',
    example: 'ca064325-e896-4e93-aeba-64c2858f2753',
  })
  @Generated('uuid')
  @Column()
  uid: string;

  @ApiProperty({
    description: 'the description of the task',
    type: 'string',
    example: 'task name',
  })
  @Index('idx_task_description')
  @Column({ type: 'varchar', length: 160, nullable: false })
  description: string;

  @ApiProperty({
    description: 'the type of the task',
    type: 'string',
    example: 'WORK',
  })
  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.WORK,
  })
  type: TaskType;

  @ApiProperty({
    description: 'the status of the task',
    type: 'boolean',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  done: boolean;

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
