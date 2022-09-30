import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllCategoriesInput {
  @ApiPropertyOptional({
    description: 'rows limit',
    type: 'number',
    example: 10,
  })
  @IsOptional()
  @IsNumberString()
  readonly limit?: number;

  @ApiPropertyOptional({
    description: 'rows to skip',
    type: 'number',
    example: 0,
  })
  @IsOptional()
  @IsNumberString()
  readonly skip?: number;

  @ApiPropertyOptional({
    description: 'search string',
    type: 'string',
    example: 'test',
  })
  @IsOptional()
  @IsString()
  readonly q?: string;
}
