import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllProductsInput {
  @ApiPropertyOptional({
    description: 'search string',
    type: 'string',
    example: 'Product Test',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'search string',
    type: 'number',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly id?: number;

  @ApiPropertyOptional({
    description: 'categoryId of the product',
    type: 'number',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly categoryId?: number;
}
