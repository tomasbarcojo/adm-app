import {MigrationInterface, QueryRunner} from "typeorm";

export class test1664941461007 implements MigrationInterface {
    name = 'test1664941461007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(160) NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`articleName\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`stock\` int NOT NULL, \`stockAlert\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`obs\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(160) NOT NULL, \`lastName\` varchar(160) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(16) NOT NULL, \`password\` text NOT NULL, \`refreshToken\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
    }

}
