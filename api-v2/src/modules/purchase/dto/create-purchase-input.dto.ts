import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePurchaseInput {
  @ApiProperty({
    description: 'the state of the purchase',
    type: 'string',
    example: 'en transito',
  })
  @Length(1, 255)
  @IsString()
  readonly purchaseState: string;

  @ApiProperty({
    description: 'the supplier which the purcharse belongs',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly supplierId: number;
}
