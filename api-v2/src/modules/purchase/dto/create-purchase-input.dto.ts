import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';

class ProductListData {
  @ApiProperty({
    description: 'the id of the product',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'the price of the product',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: 'the quantity of the product',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'total calculated by (quantity * price) - discount',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty()
  discount: string;

  @ApiProperty({
    description: 'total calculated by (quantity * price) - discount',
    type: 'number',
    example: '1',
  })
  @IsNotEmpty()
  total: string;
}
export class CreatePurchaseInput {
  @ApiProperty({
    description: 'the supplier which the purcharse belongs',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly supplierId: number;

  @ApiProperty({
    description: 'the payment expiration date of the purchase',
    type: 'number',
    example: '01/01/2023',
  })
  @IsOptional()
  @IsDateString()
  readonly paymentExpirationDate?: Date | string;

  @ApiProperty({
    description: 'array of purchased products',
    type: 'number',
    example: '1',
  })
  @ValidateNested()
  readonly data: ProductListData[];
}
