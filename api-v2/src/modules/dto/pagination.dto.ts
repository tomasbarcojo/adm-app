import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => Number(value) || 25, { toClassOnly: true })
  limit?: number = 25;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => Number(value) || 1, { toClassOnly: true })
  page?: number = 1;
}