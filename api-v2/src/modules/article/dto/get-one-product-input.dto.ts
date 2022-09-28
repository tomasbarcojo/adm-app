import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetOneProductInput {
  @ApiProperty({
    description: 'category id',
    type: 'number',
    example: '1',
  })
  @IsNumber()
  readonly id: number;
}
