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

import { Category } from './category.entity';

import { CategoryService } from './category.service';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { GetAllTasksInput } from './dto/get-all-categories-input.dto';
import { GetOneTaskInput } from './dto/get-one-category-input.dto';
import { UpdateTaskInput } from './dto/update-category-input.dto';

@ApiTags('tasks')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created task',
    type: Category,
  })
  @ApiOperation({
    summary: 'create a new task',
    description: 'create a new task',
  })
  @Post()
  async create(@Body() input: CreateCategoryInput): Promise<Category> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of tasks',
    type: [Category],
  })
  @ApiOperation({
    summary: 'get a list of tasks',
    description: 'get a list of task, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllTasksInput): Promise<Category[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a task',
    type: Category,
  })
  @ApiOperation({
    summary: 'get a task',
    description: 'get a task, based on the uid',
  })
  @Get('/:uid')
  async getOne(@Param() input: GetOneTaskInput): Promise<Category> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated task',
    type: Category,
  })
  @ApiOperation({
    summary: 'update a task',
    description: 'update a task, based on the uid',
  })
  @Patch('/:uid')
  async update(@Param() getOneInput: GetOneTaskInput, @Body() input: UpdateTaskInput): Promise<Category> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted task',
    type: Category,
  })
  @ApiOperation({
    summary: 'delete a task',
    description: 'delete a task, based on the uid',
  })
  @Delete('/:uid')
  async delete(@Param() getOneInput: GetOneTaskInput): Promise<Category> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished task',
    type: Category,
  })
  @ApiOperation({
    summary: 'finish a task',
    description: 'finish a task, based on the uid',
  })
  @Patch('/:uid/finish')
  async finish(@Param() input: GetOneTaskInput): Promise<Category> {
    return this.service.finish({ uid: input.uid });
  }
}
