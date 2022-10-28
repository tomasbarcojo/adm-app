import {MigrationInterface, QueryRunner} from "typeorm";

export class test1666627717360 implements MigrationInterface {
    name = 'test1666627717360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`price\` decimal(11,5) NOT NULL DEFAULT '0.00000', \`stock\` int NOT NULL, \`stockAlert\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`obs\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(160) NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`businessName\` varchar(255) NOT NULL, \`cuit\` varchar(16) NOT NULL, \`phone\` varchar(20) NOT NULL, \`altPhone\` varchar(20) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`CP\` varchar(16) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Pricelist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pricelistName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Purchase\` (\`id\` int NOT NULL AUTO_INCREMENT, \`purchaseState\` enum ('en transito', 'recibida', 'cancelada') NOT NULL DEFAULT 'en transito', \`paymentExpirationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Supplier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`businessName\` varchar(255) NOT NULL, \`cuit\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`altPhone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`CP\` varchar(255) NOT NULL, \`bankaccount1\` varchar(255) NOT NULL, \`bankaccount2\` varchar(255) NOT NULL, \`bankaccount3\` varchar(255) NOT NULL, \`obs\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(160) NOT NULL, \`lastName\` varchar(160) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(16) NOT NULL, \`password\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_896e2e0f6dfa6f80117a79e1d7e\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_896e2e0f6dfa6f80117a79e1d7e\``);
        await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Supplier\``);
        await queryRunner.query(`DROP TABLE \`Purchase\``);
        await queryRunner.query(`DROP TABLE \`Pricelist\``);
        await queryRunner.query(`DROP TABLE \`Client\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
    }

}
