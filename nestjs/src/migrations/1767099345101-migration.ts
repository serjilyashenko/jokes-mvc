import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1767099345101 implements MigrationInterface {
  name = 'Migration1767099345101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password_hash" character varying NOT NULL, CONSTRAINT "uq_users_username" UNIQUE ("username"), CONSTRAINT "pk_users_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_users_username" ON "users" ("username") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_users_username"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
