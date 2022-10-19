import { PartialType } from "@nestjs/swagger";
import { CreatePurchaseInput } from "./create-purchase-input.dto";

export class UpdatePurchaseInput extends PartialType(CreatePurchaseInput) {}