import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { TaskType } from '../task.entity';

export class CreateTaskInput {
  @ApiProperty({
    description: 'the name of the task',
    type: 'string',
    example: 'Task 1',
  })
  @Length(1, 160)
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'the type of the task',
    type: 'string',
    enum: Object.keys(TaskType),
    example: TaskType.WORK,
  })
  @IsEnum(TaskType, {
    message: () => {
      const keys = Object.keys(TaskType).filter((x) => !(parseInt(x) >= 0));
      return `TaskType must be one of ${keys.join(', ')}`;
    },
  })
  readonly type: TaskType;
}
