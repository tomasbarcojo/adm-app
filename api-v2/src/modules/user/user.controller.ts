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

import { User } from './user.entity';

import { UserService } from './user.service';

import { CreateUserInput } from './dto/create-user-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-user-input.dto';
import { GetOneCategoryInput } from './dto/get-one-user-input.dto';
import { UpdateCategoryInput } from './dto/update-user-input.dto';
import { LoginUserInput } from './dto/login-user-input.dto';

@ApiTags('user')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created user',
    type: User,
  })
  @ApiOperation({
    summary: 'create a new user',
    description: 'create a new user',
  })
  @Post()
  async create(@Body() input: CreateUserInput): Promise<User> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created user',
    type: User,
  })
  @ApiOperation({
    summary: 'create a new user',
    description: 'create a new user',
  })
  @Post('/login')
  async login(@Body() input: LoginUserInput): Promise<User> {
    return this.service.login(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of categories',
    type: [User],
  })
  @ApiOperation({
    summary: 'get a list of categories',
    description: 'get a list of user, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllCategoriesInput): Promise<User[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a user',
    type: User,
  })
  @ApiOperation({
    summary: 'get a user',
    description: 'get a user, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOneCategoryInput): Promise<User> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated user',
    type: User,
  })
  @ApiOperation({
    summary: 'update a user',
    description: 'update a user, based on the id',
  })
  @Patch('/:id')
  async update(@Param() getOneInput: GetOneCategoryInput, @Body() input: UpdateCategoryInput): Promise<User> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted user',
    type: User,
  })
  @ApiOperation({
    summary: 'delete a user',
    description: 'delete a user, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOneCategoryInput): Promise<User> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished user',
    type: User,
  })
  @ApiOperation({
    summary: 'finish a user',
    description: 'finish a user, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOneCategoryInput): Promise<User> {
    return this.service.finish({ id: input.id });
  }
}
