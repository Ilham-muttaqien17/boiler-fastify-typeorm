import { config } from 'dotenv';
import * as path from 'path';

const dotenv = config({ path: path.resolve('config/.env') });

export type AppEnv = {
  /* Node Env */
  NODE_ENV: string;

  /* App Env Variables */
  APP_HOST: string;
  APP_PORT: number;

  /* JWT Secret */
  JWT_SECRET: string;

  /* DB Env Variables */
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  /* Redis Env */
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
};

const env: AppEnv = {
  DB_HOST: String(dotenv.parsed?.DB_HOST ?? 'localhost'),
  DB_PORT: parseInt(String(dotenv.parsed?.DB_PORT), 10) || 3306,
  DB_USERNAME: String(dotenv.parsed?.DB_USERNAME),
  DB_PASSWORD: String(dotenv.parsed?.DB_PASSWORD),
  DB_NAME: String(dotenv.parsed?.DB_NAME),
  APP_HOST: String(dotenv.parsed?.APP_HOST ?? '0.0.0.0'),
  APP_PORT: parseInt(String(dotenv.parsed?.APP_PORT), 10) || 3300,
  NODE_ENV: String(process.env.NODE_ENV ?? dotenv.parsed?.NODE_ENV ?? 'development'),
  JWT_SECRET: String(dotenv.parsed?.JWT_SECRET),
  REDIS_HOST: String(dotenv.parsed?.REDIS_HOST ?? '127.0.0.1'),
  REDIS_PORT: parseInt(String(dotenv.parsed?.REDIS_PORT), 10) || 6379,
  REDIS_USERNAME: String(dotenv.parsed?.REDIS_USERNAME),
  REDIS_PASSWORD: String(dotenv.parsed?.REDIS_PASSWORD)
};

export default env;
