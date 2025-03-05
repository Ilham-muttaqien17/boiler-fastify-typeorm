import env from '@config/index';
import type { PinoLoggerOptions } from 'fastify/types/logger';
import { join } from 'path';
import { type TransportPipelineOptions } from 'pino';

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
              file: join(process.cwd(), '/logs/error'),
              frequency: 'daily',
              extension: '.log',
              dateFormat: 'yyyy-MM-dd',
              mkdir: true
            }
          }
        : ({} as TransportPipelineOptions)
    ]
  }
};
