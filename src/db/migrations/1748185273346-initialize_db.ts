import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeDb1748185273346 implements MigrationInterface {
  name = 'InitializeDb1748185273346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" SERIAL NOT NULL,
                "unique_id" uuid NOT NULL,
                "title" character varying(100) NOT NULL,
                "mime_type" character varying(100) NOT NULL,
                "description" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_662303fa603e468e017db54066" ON "videos" ("unique_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(100) NOT NULL,
                "password" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_662303fa603e468e017db54066"
        `);
    await queryRunner.query(`
            DROP TABLE "videos"
        `);
  }
}
