import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../dto/pagination.dto';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { GetDetailsByPurchaseId } from './dto/get-details-by-purchase-id.dto';
import { GetOnePurchaseInput } from './dto/get-one-purchase-input.dto';
import { UpdatePurchaseInput } from './dto/update-purchase-input.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purcharse.service';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created purchase',
    type: Purchase,
  })
  @ApiOperation({
    summary: 'create a new purchase',
    description: 'create a new purchase',
  })
  @Post('/createpurchase')
  async create(@Body() input: CreatePurchaseInput): Promise<Purchase> {
    return this.purchaseService.createPurchase(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of purchase',
    type: [Purchase],
  })
  @ApiOperation({
    summary: 'get a list of purchase',
    description: 'get a list of purchase, based on the conditions',
  })
  @Get()
  async getAll(@Query() pagination: PaginationDto): Promise<Purchase[]> {    
    return this.purchaseService.getAll(pagination);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a purchase',
    type: Purchase,
  })
  @ApiOperation({
    summary: 'get a purchase',
    description: 'get a purchase, based on the id',
  })
  @Get('/:purchaseId')
  async getDetailsByPurchaseId(@Param() input: GetOnePurchaseInput): Promise<GetDetailsByPurchaseId> {
    return this.purchaseService.getDetailsByPurchaseId(input);
  }

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'an updated purchase',
  //   type: Purchase,
  // })
  // @ApiOperation({
  //   summary: 'update a purchase',
  //   description: 'update a purchase, based on the id',
  // })
  // @Patch('/:id')
  // async update(@Param() getOneInput: GetOnePurchaseInput, @Body() input: UpdatePurchaseInput): Promise<Purchase> {
  //   return this.service.update(getOneInput, input);
  // }

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'a deleted purchase',
  //   type: Purchase,
  // })
  // @ApiOperation({
  //   summary: 'delete a purchase',
  //   description: 'delete a purchase, based on the id',
  // })
  // @Delete('/:id')
  // async delete(@Param() getOneInput: GetOnePurchaseInput): Promise<Purchase> {
  //   return this.service.delete(getOneInput);
  // }

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'a finished purchase',
  //   type: Purchase,
  // })
  // @ApiOperation({
  //   summary: 'finish a purchase',
  //   description: 'finish a purchase, based on the id',
  // })
  // @Patch('/:id/finish')
  // async finish(@Param() input: GetOnePurchaseInput): Promise<Purchase> {
  //   return this.service.finish({ id: input.id });
  // }
}
