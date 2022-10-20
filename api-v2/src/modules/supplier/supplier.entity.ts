import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Supplier' })
export class Supplier extends BaseEntity {
    @ApiProperty({
        description: 'the id of de supplier',
        type: 'number',
        example: 1,
      })
      @PrimaryGeneratedColumn()
      id!: number;

      @ApiProperty({
        description: 'the bussines name',
        type: 'string',
        example: 'Arcor',
      })
      @Column()
      businessName!: string;

      @ApiProperty({
        description: 'the cuit of supprier',
        type: 'string',
        example: '20-20202020-2',
      })
      @Column()
      cuit!: string;

      @ApiProperty({
        description: 'the phone number',
        type: 'string',
        example: '3426123123',
      })
      @Column()
      phone!: string;

      @ApiProperty({
        description: 'alternative phone',
        type: 'string',
        example: '3426123123',
      })
      @Column()
      altPhone!: string;
      
      @ApiProperty({
        description: 'adress',
        type: 'string',
        example: '3426123123',
      })
      @Column()
      adress!: string;

      @ApiProperty({
        description: 'city',
        type: 'string',
        example: 'Santa Fe'
      })
      city!: string;

      @ApiProperty({
        description: 'postal code',
        type: 'number',
        example: '3000',
      })
      @Column()
      CP!: number;

      @ApiProperty({
        description: 'bankaccount number one',
        type: 'string',
        example: '00000123123123',
      })
      @Column()
      bankaccount1!: string;

      @ApiProperty({
        description: 'bankaccount number two',
        type: 'string',
        example: '00000123123123',
      })
      @Column()
      bankaccount2!: string;

      @ApiProperty({
        description: 'bankaccount number tree',
        type: 'string',
        example: '00000123123123',
      })
      @Column()
      bankaccount3!: string;

      @ApiProperty({
        description: 'observations',
        type: 'string',
        example: 'nothing to say',
      })
      @Column()
      obs: string;

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
      
  // relations
}
//businessName, cuit, phone, altPhone, address, city, CP, bankaccount1, bankaccount2, bankaccount3, obs