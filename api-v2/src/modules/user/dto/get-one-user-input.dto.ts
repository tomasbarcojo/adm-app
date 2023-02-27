import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class GetOneUserInput {
  @ApiPropertyOptional({
    description: 'user id',
    type: 'string',
    example: '1',
  })
  @IsOptional()
  @IsString()
  readonly id?: number;

  @ApiPropertyOptional({
    description: 'user email',
    type: 'string',
    example: '1',
  })
  @ValidateIf((o) => !o.username || o.email)
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'user username',
    type: 'string',
    example: '1',
  })
  @ValidateIf((o) => !o.email || o.username)
  @IsOptional()
  @IsString()
  readonly username?: string;
}
