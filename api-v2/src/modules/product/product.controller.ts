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
import { PaginationDto } from '../dto/pagination.dto';
import { GetProductByCategoryId } from './dto/get-product-by-categoryid.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created product',
    type: Product,
  })
  @ApiOperation({
    summary: 'create a new product',
    description: 'create a new product',
  })
  @Post('/createProduct')
  async create(@Body() input: CreateProductInput): Promise<Product> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of products',
    type: [Product],
  })
  @ApiOperation({
    summary: 'get a list of products',
    description: 'get a list of product, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllProductsInput): Promise<Product[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a product',
    type: Product,
  })
  @ApiOperation({
    summary: 'get a product',
    description: 'get a product, based on the id',
  })
  @Get('/supplier/:id')
  async getAllBySupplier(@Param() input: GetOneProductInput): Promise<Product> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a product',
    type: Product,
  })
  @ApiOperation({
    summary: 'get a product',
    description: 'get a product, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOneProductInput): Promise<Product> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated product',
    type: Product,
  })
  @ApiOperation({
    summary: 'update a product',
    description: 'update a product, based on the id',
  })
  @Patch('/:id')
  async update(@Param() getOneInput: GetOneProductInput, @Body() input: UpdateProductInput): Promise<Product> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted product',
    type: Product,
  })
  @ApiOperation({
    summary: 'delete a product',
    description: 'delete a product, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOneProductInput): Promise<Product> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished product',
    type: Product,
  })
  @ApiOperation({
    summary: 'finish a product',
    description: 'finish a product, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOneProductInput): Promise<Product> {
    return this.service.finish({ id: input.id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a category',
    type: Product,
  })
  @ApiOperation({
    summary: 'get a category',
    description: 'get a category, based on the id',
  })
  @Get('/category/:categoryId')
  async getProductByCategoryId(
    @Param('categoryId') categoryId: string,
    @Query() { page = 1, limit = 30 }: PaginationDto,
  ): Promise<GetProductByCategoryId> {
    return this.service.getProductByCategoryId(categoryId, { page, limit });
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated stock product',
    type: Product,
  })
  @ApiOperation({
    summary: 'update an stock of a product',
    description: 'update an stock of a product, based on the id',
  })
  @Patch('/stock/:id')
  async updateStock(@Body('stock') stock: number, @Param('id') id: number): Promise<Product> {
    return this.service.updateStock(stock, id);
  }
}
