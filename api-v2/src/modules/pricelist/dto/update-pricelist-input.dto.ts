import { PartialType } from "@nestjs/swagger"
import { CreatePricelistInput } from "./create-pricelist-input.dto"

export class UpdatePricelistInput extends PartialType(CreatePricelistInput){}