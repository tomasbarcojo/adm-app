import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetPurchaseDetailInput {
    @ApiProperty({
        description: 'purcharse id',
        type: 'string',
        example: '1',
      })
      @IsString()
      readonly purcharseId?: number;
}