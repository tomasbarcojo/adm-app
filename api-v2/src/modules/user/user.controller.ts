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
import { GetOneUserInput } from './dto/get-one-user-input.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { LoginUserInput } from './dto/login-user-input.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  // ruta getAll
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of users',
    type: [User],
  })
  @ApiOperation({
    summary: 'get a list of users',
    description: 'get a list of user, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllCategoriesInput): Promise<User[]> {
    return this.service.getAll(input);
  }
  // ruta getUser
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
  async getOne(@Param() input: GetOneUserInput): Promise<User> {
    return this.service.getOne(input);
  }
  // ruta editUser
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated user',
    type: User,
  })
  @ApiOperation({
    summary: 'update a user',
    description: 'update a user, based on the id',
  })
  @Patch('/editUser/:id')
  async update(@Param() getOneInput: GetOneUserInput, @Body() input: UpdateUserInput): Promise<User> {
    return this.service.update(getOneInput, input);
  }
  // route deleteUser
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted user',
    type: User,
  })
  @ApiOperation({
    summary: 'delete a user',
    description: 'delete a user, based on the id',
  })
  @Delete('/deleteUser/:id')
  async delete(@Param() getOneInput: GetOneUserInput): Promise<User> {
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
  async finish(@Param() input: GetOneUserInput): Promise<User> {
    return this.service.finish({ id: input.id });
  }
}
