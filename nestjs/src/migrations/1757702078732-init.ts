import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1757702078732 implements MigrationInterface {
  name = 'Init1757702078732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "jokes" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "content" character varying NOT NULL, CONSTRAINT "pk_jokes" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "jokes"`);
  }
}
