import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePricelistInput {
    @ApiProperty({
        description: 'the name of the pricelist',
        type: 'string',
        example: 'Pricelist 1'
    })
    @Length(1, 255)
    @IsString()
    readonly pricelistName: string;
}