import { DataSource } from 'typeorm';
import env from '@config/index';
import { join } from 'path';
import { redisOptions } from '@src/utils/redis';

const dataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [join(__dirname, 'entities', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '**', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  cache: {
    type: 'ioredis',
    options: redisOptions
  },
  logging: env.NODE_ENV === 'development'
});

export default dataSource;
