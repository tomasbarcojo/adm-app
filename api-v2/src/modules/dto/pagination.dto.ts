import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value) || 30)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value) || 1)
  page?: number;
}