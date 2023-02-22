import { MigrationInterface, QueryRunner } from 'typeorm';

export class purchaseStatus1676562293585 implements MigrationInterface {
  name = 'purchaseStatus1676562293585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Purchase\` CHANGE \`purchaseState\` \`purchaseStatus\` enum ('en transito', 'recibida', 'cancelada') NOT NULL DEFAULT 'en transito'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Purchase\` CHANGE \`purchaseStatus\` \`purchaseState\` enum ('en transito', 'recibida', 'cancelada') NOT NULL DEFAULT 'en transito'`,
    );
  }
}
