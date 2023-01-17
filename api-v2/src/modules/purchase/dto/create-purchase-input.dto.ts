import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsOptional()
  discount: string;

  @ApiProperty({
    description: 'total calculated by (quantity * price) - discount',
    type: 'number',
    example: '1',
  })
  @IsNotEmpty()
  total: number;
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
    example: '2020-02-08 00:00:00',
  })
  @IsOptional()
  @IsDateString()
  readonly paymentExpirationDate?: Date | string;

  @ApiProperty({
    description: 'array of purchased products',
    type: 'array',
    example: [{ productId: 42, quantity: 1, price: '1', discout: '0', total: 1 }],
  })
  @IsArray()
  readonly productList: ProductListData[];
}
