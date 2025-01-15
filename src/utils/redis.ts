import env from '@config/index';
import { Redis } from 'ioredis';
import type { RedisOptions } from 'ioredis';

export const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  enableOfflineQueue: false,
  maxRetriesPerRequest: null
};

export const redisClient = new Redis(redisOptions);

export const useRedisClient = {
  /**
   * Set data on redis
   * @param key
   * @param value
   * @param ex - duration in seconds
   */
  setData: async (key: string, value: any, ex?: number) => {
    if (ex) return await redisClient.set(key, value, 'EX', ex);
    await redisClient.set(key, value);
  },
  /**
   * Get value from redis
   * @param key
   * @returns `string` / `null`
   */
  getData: async (key: string) => {
    const result = await redisClient.get(key);
    return result;
  },
  /**
   * Delete data from redis
   * @param key
   * @returns number of deleted data
   */
  deleteData: async (key: string) => {
    return await redisClient.del(key);
  }
};
