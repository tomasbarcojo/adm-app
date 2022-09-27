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

import { Product } from './product.entity';

import { ProductService } from './product.service';

import { CreateProductInput } from './dto/create-product-input.dto';
import { GetAllTasksInput } from './dto/get-all-products-input.dto';
import { GetOneTaskInput } from './dto/get-one-product-input.dto';
import { UpdateTaskInput } from './dto/update-product-input.dto';

@ApiTags('product')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created task',
    type: Product,
  })
  @ApiOperation({
    summary: 'create a new task',
    description: 'create a new task',
  })
  @Post()
  async create(@Body() input: CreateProductInput): Promise<Product> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of tasks',
    type: [Product],
  })
  @ApiOperation({
    summary: 'get a list of tasks',
    description: 'get a list of task, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllTasksInput): Promise<Product[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a task',
    type: Product,
  })
  @ApiOperation({
    summary: 'get a task',
    description: 'get a task, based on the uid',
  })
  @Get('/:uid')
  async getOne(@Param() input: GetOneTaskInput): Promise<Product> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated task',
    type: Product,
  })
  @ApiOperation({
    summary: 'update a task',
    description: 'update a task, based on the uid',
  })
  @Patch('/:uid')
  async update(
    @Param() getOneInput: GetOneTaskInput,
    @Body() input: UpdateTaskInput,
  ): Promise<Product> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted task',
    type: Product,
  })
  @ApiOperation({
    summary: 'delete a task',
    description: 'delete a task, based on the uid',
  })
  @Delete('/:uid')
  async delete(@Param() getOneInput: GetOneTaskInput): Promise<Product> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished task',
    type: Product,
  })
  @ApiOperation({
    summary: 'finish a task',
    description: 'finish a task, based on the uid',
  })
  @Patch('/:uid/finish')
  async finish(@Param() input: GetOneTaskInput): Promise<Product> {
    return this.service.finish({ uid: input.uid });
  }
}
