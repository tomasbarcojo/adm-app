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
import { CreatePricelistInput } from './dto/create-pricelist-input.dto';
import { GetAllPricelistInput } from './dto/get-all-pricelist-input.dto';
import { GetOnePricelistInput } from './dto/get-one-pricelist-input.dto';
import { UpdatePricelistInput } from './dto/update-pricelist-input.dto';
import { Pricelist } from './entities/pricelist.entity';
import { PricelistService } from './pricelist.service';

@ApiTags('pricelist')
@Controller('pricelist')
export class PricelistController {
  constructor(private readonly service: PricelistService) {}
  // postPricelist
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created pricelist',
    type: Pricelist,
  })
  @ApiOperation({
    summary: 'create a new pricelist',
    description: 'create a new pricelist',
  })
  @Post('/createpricelist')
  async craete(@Body() input: CreatePricelistInput): Promise<Pricelist> {
    return this.service.create(input);
  }

  // getAllPricelist
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of pricelist',
    type: [Pricelist],
  })
  @ApiOperation({
    summary: 'get a list of pricelist',
    description: 'get a list of pricelist, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllPricelistInput): Promise<Pricelist[]> {
    return this.service.getAll(input);
  }

  // getPricelist with id
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a pricelist',
    type: Pricelist,
  })
  @ApiOperation({
    summary: 'get a pricelist',
    description: 'get a pricelist, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOnePricelistInput): Promise<Pricelist> {
    return this.service.getOne(input);
  }

  // updatePricelist
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated product',
    type: Pricelist,
  })
  @ApiOperation({
    summary: 'update a pricelist',
    description: 'update a pricelist, based on the id',
  })
  @Patch('/:id')
  async update(@Param() getOneInput: GetOnePricelistInput, @Body() input: UpdatePricelistInput): Promise<Pricelist> {
    return this.service.update(getOneInput, input);
  }

  // deletePricelist
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted pricelist',
    type: Pricelist,
  })
  @ApiOperation({
    summary: 'delete a pricelist',
    description: 'delete a pricelist, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOnePricelistInput): Promise<Pricelist> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished pricelist',
    type: Pricelist,
  })
  @ApiOperation({
    summary: 'finish a pricelist',
    description: 'finish a pricelist, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOnePricelistInput): Promise<Pricelist> {
    return this.service.finish({ id: input.id });
  }
}
