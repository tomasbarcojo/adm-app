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
  readonly articleName: string;

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
    description: 'the image of the product',
    type: 'string',
    example: '',
  })
  @Length(1, 255)
  @IsString()
  readonly image: string;
}
