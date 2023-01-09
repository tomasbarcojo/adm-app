import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, ValidateNested } from 'class-validator';

class ProductListData {
  articleId: number;
  price: string;
  quantity: number;
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
