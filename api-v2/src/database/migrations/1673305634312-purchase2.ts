import {MigrationInterface, QueryRunner} from "typeorm";

export class purchase21673305634312 implements MigrationInterface {
    name = 'purchase21673305634312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` ADD \`discount\` decimal(11,5) NOT NULL DEFAULT '0.00000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`PurchasedProduct\` DROP COLUMN \`discount\``);
    }

}
