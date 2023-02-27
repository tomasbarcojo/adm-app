import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOneClientInput {
  @ApiProperty({
    description: 'supplicer id',
    type: 'string',
    example: '1',
  })
  @IsString()
  readonly id?: number;
}
