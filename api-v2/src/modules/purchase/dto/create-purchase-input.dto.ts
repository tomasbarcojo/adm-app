import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PurchaseState } from '../entities/purchase.entity';

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
    description: 'discount of the product',
    type: 'string',
    example: '1',
  })
  @IsNumber()
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
    description: 'the state of the purcharse',
    type: 'string',
    example: PurchaseState.EN_TRANSITO,
  })
  @IsEnum(PurchaseState)
  readonly purchaseState: string;

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
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => ProductListData)
  readonly productList: ProductListData[];
}
