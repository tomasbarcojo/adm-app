import { PartialType } from '@nestjs/swagger';
import { CreateProductInput } from './create-product-input.dto';

export class UpdateTaskInput extends PartialType(CreateProductInput) {}
