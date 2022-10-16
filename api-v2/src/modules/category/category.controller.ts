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
import { Public } from 'src/common/decorators/public.decorator';

import { Category } from './category.entity';

import { CategoryService } from './category.service';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-categories-input.dto';
import { GetOneCategoryInput } from './dto/get-one-category-input.dto';
import { UpdateCategoryInput } from './dto/update-category-input.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created category',
    type: Category,
  })
  @ApiOperation({
    summary: 'create a new category',
    description: 'create a new category',
  })
  @Post()
  async create(@Body() input: CreateCategoryInput): Promise<Category> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of categories',
    type: [Category],
  })
  @ApiOperation({
    summary: 'get a list of categories',
    description: 'get a list of category, based on the conditions',
  })
  @Public()
  @Get()
  async getAll(@Query() input: GetAllCategoriesInput): Promise<Category[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a category',
    type: Category,
  })
  @ApiOperation({
    summary: 'get a category',
    description: 'get a category, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOneCategoryInput): Promise<Category> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated category',
    type: Category,
  })
  @ApiOperation({
    summary: 'update a category',
    description: 'update a category, based on the id',
  })
  @Patch('/:id')
  async update(@Param() getOneInput: GetOneCategoryInput, @Body() input: UpdateCategoryInput): Promise<Category> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted category',
    type: Category,
  })
  @ApiOperation({
    summary: 'delete a category',
    description: 'delete a category, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOneCategoryInput): Promise<Category> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished category',
    type: Category,
  })
  @ApiOperation({
    summary: 'finish a category',
    description: 'finish a category, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOneCategoryInput): Promise<Category> {
    return this.service.finish({ id: input.id });
  }
}
