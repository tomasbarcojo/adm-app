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
import { GetAllProductsInput } from './dto/get-all-products-input.dto';
import { GetOneProductInput } from './dto/get-one-product-input.dto';
import { UpdateProductInput } from './dto/update-product-input.dto';

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
  async getAll(@Query() input: GetAllProductsInput): Promise<Product[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a task',
    type: Product,
  })
  @ApiOperation({
    summary: 'get a task',
    description: 'get a task, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOneProductInput): Promise<Product> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated task',
    type: Product,
  })
  @ApiOperation({
    summary: 'update a task',
    description: 'update a task, based on the id',
  })
  @Patch('/:id')
  async update(
    @Param() getOneInput: GetOneProductInput,
    @Body() input: UpdateProductInput,
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
    description: 'delete a task, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOneProductInput): Promise<Product> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished task',
    type: Product,
  })
  @ApiOperation({
    summary: 'finish a task',
    description: 'finish a task, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOneProductInput): Promise<Product> {
    return this.service.finish({ id: input.id });
  }
}
