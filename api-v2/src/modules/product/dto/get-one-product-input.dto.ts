import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetOneProductInput {
  @ApiProperty({
    description: 'category id',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
}
