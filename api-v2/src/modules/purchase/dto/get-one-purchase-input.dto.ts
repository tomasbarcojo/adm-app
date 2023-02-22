import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetOnePurchaseInput {
  @ApiPropertyOptional({
    description: 'search by purchaseId',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  @Type(() => Number) 
  readonly purchaseId: number;
}
