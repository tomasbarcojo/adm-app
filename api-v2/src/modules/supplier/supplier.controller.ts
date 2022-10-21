import { Controller, HttpStatus, Post, Body, Get, Query, Param, Patch, Delete } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { CreateSupplierInput } from "./dto/create-supplier-input.dto";
import { GetAllSupplierInput } from "./dto/get-all-supplier-input.dto";
import { GetOneSupplierInput } from "./dto/get-one-supplier-input.dto";
import { UpdateSupplierInput } from "./dto/update-supplier-input.dto";
import { Supplier } from "./supplier.entity";
import { SupplierService } from "./supplier.service";

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly service: SupplierService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created supplier',
    type: Supplier,
  })
  @ApiOperation({
    summary: 'create a new supplier',
    description: 'create a new supplier',
  })
  @Post('/createSupplier')
  async create(@Body() input: CreateSupplierInput): Promise<Supplier> {
    return this.service.create(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list of supplier',
    type: [Supplier],
  })
  @ApiOperation({
    summary: 'get a list of supplier',
    description: 'get a list of supplier, based on the conditions',
  })
  @Get()
  async getAll(@Query() input: GetAllSupplierInput): Promise<Supplier[]> {
    return this.service.getAll(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a supplier',
    type: Supplier,
  })
  @ApiOperation({
    summary: 'get a supplier',
    description: 'get a supplier, based on the id',
  })
  @Get('/:id')
  async getOne(@Param() input: GetOneSupplierInput): Promise<Supplier> {
    return this.service.getOne(input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'an updated supplier',
    type: Supplier,
  })
  @ApiOperation({
    summary: 'update a supplier',
    description: 'update a supplier, based on the id',
  })
  @Patch('/:id')
  async update(@Param() getOneInput: GetOneSupplierInput, @Body() input: UpdateSupplierInput): Promise<Supplier> {
    return this.service.update(getOneInput, input);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a deleted supplier',
    type: Supplier,
  })
  @ApiOperation({
    summary: 'delete a supplier',
    description: 'delete a supplier, based on the id',
  })
  @Delete('/:id')
  async delete(@Param() getOneInput: GetOneSupplierInput): Promise<Supplier> {
    return this.service.delete(getOneInput);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'a finished supplier',
    type: Supplier,
  })
  @ApiOperation({
    summary: 'finish a supplier',
    description: 'finish a supplier, based on the id',
  })
  @Patch('/:id/finish')
  async finish(@Param() input: GetOneSupplierInput): Promise<Supplier> {
    return this.service.finish({ id: input.id });
  }
}