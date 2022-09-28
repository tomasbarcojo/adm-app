import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Task } from './task.entity';

import { TaskService } from './task.service';

import { CreateTaskInput } from './dto/create-task-input.dto';
import { GetAllTasksInput } from './dto/get-all-tasks-input.dto';
import { GetOneTaskInput } from './dto/get-one-task-input.dto';
import { UpdateTaskInput } from './dto/update-task-input.dto';

@ApiTags('tasks')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created task',
    type: Task,
  })
  @ApiOperation({
    summary: 'create a new task',
    description: 'create a new task',
  })
  @Post()
  async create(@Body() input: CreateTaskInput): Promise<Task> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of tasks',
    type: [Task],
  })
  @ApiOperation({
    summary: 'get a list of tasks',
    description: 'get a list of task, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllTasksInput): Promise<Task[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a task',
    type: Task,
  })
  @ApiOperation({
    summary: 'get a task',
    description: 'get a task, based on the uid',
  })
  @Get('/:uid')
  async getOne(@Param() input: GetOneTaskInput): Promise<Task> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated task',
    type: Task,
  })
  @ApiOperation({
    summary: 'update a task',
    description: 'update a task, based on the uid',
  })
  @Patch('/:uid')
  async update(
    @Param() getOneInput: GetOneTaskInput,
    @Body() input: UpdateTaskInput,
  ): Promise<Task> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted task',
    type: Task,
  })
  @ApiOperation({
    summary: 'delete a task',
    description: 'delete a task, based on the uid',
  })
  @Delete('/:uid')
  async delete(@Param() getOneInput: GetOneTaskInput): Promise<Task> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished task',
    type: Task,
  })
  @ApiOperation({
    summary: 'finish a task',
    description: 'finish a task, based on the uid',
  })
  @Patch('/:uid/finish')
  async finish(@Param() input: GetOneTaskInput): Promise<Task> {
    return this.service.finish({ uid: input.uid });
  }
}
