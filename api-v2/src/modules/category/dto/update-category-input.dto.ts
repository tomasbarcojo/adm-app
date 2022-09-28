import { PartialType } from '@nestjs/swagger';
import { CreateCategoryInput } from './create-category-input.dto';

export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}
