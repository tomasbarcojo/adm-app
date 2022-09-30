import {MigrationInterface, QueryRunner} from "typeorm";

export class test1664551362079 implements MigrationInterface {
    name = 'test1664551362079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` ADD UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\``);
    }

}
