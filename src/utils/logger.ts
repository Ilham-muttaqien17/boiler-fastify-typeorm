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
            target: 'pino/file',
            options: {
              destination: join(process.cwd(), '/logs/error.log'),
              mkdir: true
            }
          }
        : ({} as TransportPipelineOptions)
    ]
  }
};
