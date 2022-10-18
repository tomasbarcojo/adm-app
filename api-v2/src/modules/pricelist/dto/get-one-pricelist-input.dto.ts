import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class GetOnePricelistInput {
  @ApiProperty({
    description: 'pricelist id',
    type: 'string',
    example: '1',
  })
  @IsString()
  readonly id?: number;
}
