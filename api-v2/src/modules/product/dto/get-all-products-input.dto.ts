import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllProductsInput {
  @ApiPropertyOptional({
    description: 'search string',
    type: 'string',
    example: 'test',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional({
    description: 'categoryId of the product',
    type: 'number',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly categoryId?: number;

  @ApiPropertyOptional({
    description: 'supplierId of the product',
    type: 'number',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly supplierId?: number;
}
