import type { MigrationInterface, QueryRunner } from 'typeorm';
import dataSourceSeeder from '../data-source-seeder';
import { User } from '../entities/user.entity';

const userRepository = dataSourceSeeder.getRepository(User);

export class UserSeed1736877974084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.startTransaction();
    try {
      const user = new User();
      user.email = 'user@example.com';
      user.password = 'user123';
      await userRepository.save(user);

      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(): Promise<void> {
    await dataSourceSeeder
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('email = :email', { email: 'user@example.com' })
      .execute();
  }
}
