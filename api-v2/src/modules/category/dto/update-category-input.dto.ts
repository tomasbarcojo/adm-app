import { PartialType } from '@nestjs/swagger';
import { CreateCategoryInput } from './create-category-input.dto';

export class UpdateTaskInput extends PartialType(CreateCategoryInput) {}
