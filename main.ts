import 'reflect-metadata';
import app from '@src/app.js';
import env from './config';
import { redisClient } from '@src/utils/redis';
import dataSource from '@src/db/data-source';

async function gracefulShutdown(signal: NodeJS.Signals) {
  redisClient.disconnect();
  app.log.info(`Received ${signal}, closing server...`);
  await app.close();
  app.log.info('HTTP server closed');
  process.exit(0);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

(async () => {
  try {
    app.listen(
      {
        host: env.APP_HOST,
        port: env.APP_PORT
      },
      async (err) => {
        if (err) throw err;
        await dataSource.initialize();
        app.log.info('Data source has been initialized');
        app.log.info(`Environment: ${env.NODE_ENV}`);
      }
    );
  } catch {
    process.kill(process.pid, 'SIGINT');
  }
})();
