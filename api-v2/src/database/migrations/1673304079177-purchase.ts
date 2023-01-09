import {MigrationInterface, QueryRunner} from "typeorm";

export class purchase1673304079177 implements MigrationInterface {
    name = 'purchase1673304079177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`PurchasedProduct\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productId\` int NOT NULL, \`purchaseId\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` decimal(11,5) NOT NULL DEFAULT '0.00000', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` ADD CONSTRAINT \`FK_849d9cc4f3a1bf9f7e4173f5180\` FOREIGN KEY (\`purchaseId\`) REFERENCES \`Purchase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` ADD CONSTRAINT \`FK_e9b43e5e3fb5c20566ac8bf3c0b\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` DROP FOREIGN KEY \`FK_e9b43e5e3fb5c20566ac8bf3c0b\``);
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` DROP FOREIGN KEY \`FK_849d9cc4f3a1bf9f7e4173f5180\``);
        await queryRunner.query(`DROP TABLE \`PurchasedProduct\``);
    }

}
