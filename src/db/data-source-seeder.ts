import { DataSource } from 'typeorm';
import env from '@config/index';
import { join } from 'path';

const dataSourceSeeder = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [join(__dirname, 'entities', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'seeds', '**', '*.{ts,js}')],
  migrationsTableName: 'seeds',
  logging: true
});

export default dataSourceSeeder;
