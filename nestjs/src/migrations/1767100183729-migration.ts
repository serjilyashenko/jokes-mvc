import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1767100183729 implements MigrationInterface {
  name = 'Migration1767100183729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jokes" ADD "user_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_jokes_user_id" ON "jokes" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "jokes" ADD CONSTRAINT "fk_jokes_users_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jokes" DROP CONSTRAINT "fk_jokes_users_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_jokes_user_id"`);
    await queryRunner.query(`ALTER TABLE "jokes" DROP COLUMN "user_id"`);
  }
}
