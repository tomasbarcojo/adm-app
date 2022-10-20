import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateSupplierInput {
  @ApiProperty({
    description: 'the name of the bussines',
    type: 'string',
    example: 'Arcor',
  })
  @Length(1, 255)
  @IsString()
  readonly businessName: string;

  @ApiProperty({
    description: 'the cuit of the supplier',
    type: 'string',
    example: '20-20202020-2',
  })
  @IsString()
  readonly cuit: string;

  @ApiProperty({
    description:'the phone number',
    type:'string',
    example:'3426123123',
  })
  @IsString()
  readonly phone: string;

  @ApiProperty({
    description: 'alternative phone',
    type:'string',
    example: '3426123123'
  })
  @IsString()
  readonly altPhone: string;

  @ApiProperty({
    description: 'adress',
    type:'string',
    example: 'Necochea 2556',
  })
  @IsString()
  readonly adress: string;

  @ApiProperty({
    description: 'city',
    type:'string',
    example: 'Santa Fe'
  })
  @IsString()
  readonly city: string;

  @ApiProperty({
    description: 'postal code',
    type:'number',
    example: '3000'
  })
  @IsString()
  readonly CP: number;

  @ApiProperty({
    description: 'bankaccount number one',
    type:'string',
    example: '00000123123123'
  })
  @IsString()
  readonly bankaccount1: string;

  @ApiProperty({
    description: 'bankaccount number two',
    type:'string',
    example: '00000123123123'
  })
  @IsString()
  readonly bankaccount2: string;

  @ApiProperty({
    description: 'bankaccount number tree',
    type:'string',
    example: '00000123123123'
  })
  @IsString()
  readonly bankaccount3: string;

  @ApiProperty({
    description: 'observations',
    type:'string',
    example: 'nothing to say'
  })
  @IsString()
  readonly obs: string;
}