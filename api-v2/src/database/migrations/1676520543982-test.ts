import {MigrationInterface, QueryRunner} from "typeorm";

export class test1676520543982 implements MigrationInterface {
    name = 'test1676520543982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Pricelist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pricelistName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PricelistProduct\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pricelistId\` int NOT NULL, \`productId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Supplier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`businessName\` varchar(255) NOT NULL, \`cuit\` varchar(16) NOT NULL, \`phone\` varchar(16) NOT NULL, \`altPhone\` varchar(16) NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`CP\` varchar(10) NOT NULL, \`bankaccount1\` varchar(255) NOT NULL, \`bankaccount2\` varchar(255) NULL, \`bankaccount3\` varchar(255) NULL, \`obs\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Purchase\` (\`id\` int NOT NULL AUTO_INCREMENT, \`supplierId\` int NOT NULL, \`purchaseState\` enum ('en transito', 'recibida', 'cancelada') NOT NULL DEFAULT 'en transito', \`paymentExpirationDate\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PurchasedProduct\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productId\` int NOT NULL, \`purchaseId\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` decimal(11,5) NOT NULL DEFAULT '0.00000', \`discount\` decimal(11,5) NOT NULL DEFAULT '0.00000', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryId\` int NOT NULL, \`supplierId\` int NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`price\` decimal(11,5) NOT NULL DEFAULT '0.00000', \`stock\` int NOT NULL, \`stockAlert\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`obs\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(160) NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`businessName\` varchar(255) NOT NULL, \`cuit\` varchar(16) NOT NULL, \`phone\` varchar(20) NOT NULL, \`altPhone\` varchar(20) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`CP\` varchar(16) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(160) NOT NULL, \`lastName\` varchar(160) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(16) NOT NULL, \`password\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Purchase\` ADD CONSTRAINT \`FK_6bf7b94337c13e8cc4089057694\` FOREIGN KEY (\`supplierId\`) REFERENCES \`Supplier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` ADD CONSTRAINT \`FK_849d9cc4f3a1bf9f7e4173f5180\` FOREIGN KEY (\`purchaseId\`) REFERENCES \`Purchase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` ADD CONSTRAINT \`FK_e9b43e5e3fb5c20566ac8bf3c0b\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_896e2e0f6dfa6f80117a79e1d7e\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_0473e1f4b778509aecf23a3470f\` FOREIGN KEY (\`supplierId\`) REFERENCES \`Supplier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_0473e1f4b778509aecf23a3470f\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_896e2e0f6dfa6f80117a79e1d7e\``);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` DROP FOREIGN KEY \`FK_e9b43e5e3fb5c20566ac8bf3c0b\``);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` DROP FOREIGN KEY \`FK_849d9cc4f3a1bf9f7e4173f5180\``);
        await queryRunner.query(`ALTER TABLE \`Purchase\` DROP FOREIGN KEY \`FK_6bf7b94337c13e8cc4089057694\``);
        await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Client\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP TABLE \`PurchasedProduct\``);
        await queryRunner.query(`DROP TABLE \`Purchase\``);
        await queryRunner.query(`DROP TABLE \`Supplier\``);
        await queryRunner.query(`DROP TABLE \`PricelistProduct\``);
        await queryRunner.query(`DROP TABLE \`Pricelist\``);
    }

}
