import { PartialType } from '@nestjs/swagger';
import { CreateTaskInput } from './create-task-input.dto';

export class UpdateTaskInput extends PartialType(CreateTaskInput) {}
