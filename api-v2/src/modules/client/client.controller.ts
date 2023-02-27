import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { CreateClientInput } from './dto/create-client-input.dto';
import { GetAllClientInput } from './dto/get-all-client-input.dto';
import { GetOneClientInput } from './dto/get-one-client-input.dto';
import { UpdateClientInput } from './dto/update-client-input.dto';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created client',
    type: Client,
  })
  @ApiOperation({
    summary: 'create a new client',
    description: 'create a new client',
  })
  @Post('/createClient')
  async create(@Body() input: CreateClientInput): Promise<Client> {
    return this.service.create(input);
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of client',
    type: [Client],
  })
  @ApiOperation({
    summary: 'get a list of client',
    description: 'get a list of client, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllClientInput): Promise<Client[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a client',
    type: Client,
  })
  @ApiOperation({
    summary: 'get a client',
    description: 'get a client, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOneClientInput): Promise<Client> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated client',
    type: Client,
  })
  @ApiOperation({
    summary: 'update a client',
    description: 'update a client, based on the id',
  })
  @Patch('/:id')
  async update(@Param() getOneInput: GetOneClientInput, @Body() input: UpdateClientInput): Promise<Client> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted client',
    type: Client,
  })
  @ApiOperation({
    summary: 'delete a client',
    description: 'delete a client, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOneClientInput): Promise<Client> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished client',
    type: Client,
  })
  @ApiOperation({
    summary: 'finish a client',
    description: 'finish a client, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOneClientInput): Promise<Client> {
    return this.service.finish({ id: input.id });
  }
}
