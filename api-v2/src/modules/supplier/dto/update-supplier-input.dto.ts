import { PartialType } from "@nestjs/swagger";
import { CreateSupplierInput } from "./create-supplier-input.dto";

export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {}