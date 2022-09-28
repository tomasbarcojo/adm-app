import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetOneTaskInput {
  @ApiProperty({
    description: 'task uid',
    type: 'string',
    example: '5e9f8f6c-f8f4-4f0f-b8f8-f8f8f8f8f8f8',
  })
  @IsUUID()
  readonly uid: string;
}
