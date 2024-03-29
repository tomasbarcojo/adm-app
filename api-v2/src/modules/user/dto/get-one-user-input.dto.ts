import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class GetOneUserInput {
  @ApiProperty({
    description: 'user id',
    type: 'string',
    example: '1',
  })
  @IsOptional()
  @IsString()
  readonly id?: number;

  @ApiProperty({
    description: 'user email',
    type: 'string',
    example: '1',
  })
  @ValidateIf((o) => !o.username || o.email)
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiProperty({
    description: 'user username',
    type: 'string',
    example: '1',
  })
  @ValidateIf((o) => !o.email || o.username)
  @IsOptional()
  @IsString()
  readonly username?: string;
}
