import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductInput {
  @ApiProperty({
    description: 'the name of the product',
    type: 'string',
    example: 'Product 1',
  })
  @Length(1, 255)
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'the code of the product',
    type: 'string',
    example: '1A2B3C',
  })
  @Length(1, 255)
  @IsString()
  readonly code: string;

  @ApiProperty({
    description: 'the price of the product',
    type: 'number',
    example: '150.5',
  })
  @IsString()
  readonly price: number;

  @ApiProperty({
    description: 'the category which the product belongs',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({
    description: 'the supplier which the product belongs',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly supplierId: number;

  @ApiProperty({
    description: 'the stock of the product',
    type: 'number',
    example: '10',
  })
  @IsNumber()
  readonly stock: number;

  @ApiProperty({
    description: 'the alert for low stock of the product',
    type: 'number',
    example: '50',
  })
  @IsNumber()
  readonly stockAlert: number;

  @ApiProperty({
    description: 'the image of the product',
    type: 'string',
    example: '',
  })
  @Length(1, 255)
  @IsString()
  readonly image: string;

  @ApiProperty({
    description: 'the description of the product',
    type: 'string',
    example: 'this is a description of the product',
  })
  @IsString()
  obs: string;
}
