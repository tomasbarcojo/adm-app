import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetSupplierDetailInput {
  @ApiProperty({
    description: 'supplier id',
    type: 'string',
    example: '1',
  })
  @IsString()
  readonly suppierId?: number;
}
