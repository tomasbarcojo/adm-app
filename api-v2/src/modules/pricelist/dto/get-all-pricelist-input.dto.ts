import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumberString, IsString } from "class-validator";

export class GetAllPricelistInput {
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