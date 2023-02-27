import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOneSupplierInput {
  @ApiProperty({
    description: 'supplicer id',
    type: 'string',
    example: '1',
  })
  @IsString()
  readonly id?: number;
}
