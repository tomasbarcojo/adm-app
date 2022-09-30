import { PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './create-user-input.dto';

export class UpdateCategoryInput extends PartialType(CreateUserInput) {}
