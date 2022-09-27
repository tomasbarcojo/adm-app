import {MigrationInterface, QueryRunner} from "typeorm";

export class test1664240823388 implements MigrationInterface {
    name = 'test1664240823388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleName\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`stock\` int NOT NULL, \`stockAlert\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Product\``);
    }

}
