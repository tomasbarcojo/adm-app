import { PartialType } from "@nestjs/swagger";
import { CreateClientInput } from "./create-client-input.dto";

export class UpdateClientInput extends PartialType(CreateClientInput) {}