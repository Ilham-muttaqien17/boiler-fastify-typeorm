import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVideoTable1744616051693 implements MigrationInterface {
  name = 'AddVideoTable1744616051693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`videos\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`unique_id\` varchar(255) NOT NULL,
                \`title\` varchar(100) NOT NULL,
                \`mime_type\` varchar(100) NOT NULL,
                \`description\` text NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                INDEX \`IDX_662303fa603e468e017db54066\` (\`unique_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_662303fa603e468e017db54066\` ON \`videos\`
        `);
    await queryRunner.query(`
            DROP TABLE \`videos\`
        `);
  }
}
