import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "src/config/app.config";
import { SupplierController } from "./supplier.controller";
import { Supplier } from "./supplier.entity";
import { SupplierService } from "./supplier.service";

@Module({
    imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([Supplier])],
    providers: [SupplierService],
    exports: [SupplierService],
    controllers: [SupplierController],
})

export class SupplierModule {}