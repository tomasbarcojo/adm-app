import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class GetAllSupplierInput {
  @ApiPropertyOptional({
    description: 'search string',
    type: 'string',
    example: 'test',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
