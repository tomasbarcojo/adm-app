import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Product } from '../product.entity';

export class GetProductByCategoryId {
  @ApiProperty({
    description: 'category id',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly data: Product[];

  @ApiProperty({
    description: 'total pages',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly totalPages: number;

  @ApiProperty({
    description: 'number of total data',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly totalData: number;

  @ApiProperty({
    description: 'item count',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly total: number;
}
