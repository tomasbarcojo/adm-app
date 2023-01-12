import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAllPurchasesInput {
  @ApiPropertyOptional({
    description: 'search string',
    type: 'string',
    example: 'test',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
