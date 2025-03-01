import env from '@config/index';
import type { PinoLoggerOptions } from 'fastify/types/logger';
import { join } from 'path';
import { type TransportPipelineOptions } from 'pino';
import { useDayjs } from './dayjs';

export const loggerOptions: PinoLoggerOptions = {
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:HH:mm:ss Z'
        }
      },
      env.NODE_ENV === 'production'
        ? {
            level: 'error',
            target: 'pino-roll',
            options: {
              file: join(process.cwd(), `/logs/${useDayjs().format('YYYY-MM-DD')}`),
              frequency: 'daily',
              extension: '.log',
              mkdir: true
            }
          }
        : ({} as TransportPipelineOptions)
    ]
  }
};
