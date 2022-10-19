import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class GetOnePurchaseInput {
    @ApiProperty({
        description: 'purcharse id',
        type: 'string',
        example: '1',
      })
      @IsString()
      readonly id?: number;
}