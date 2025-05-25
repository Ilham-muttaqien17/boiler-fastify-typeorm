import { dropDatabase } from 'typeorm-extension';
import dataSource from '../data-source';
import app from '@src/app';

(async () => {
  await dropDatabase({
    options: dataSource.options,
    initialDatabase: 'template1',
    ifExist: true
  });

  app.log.info('DATABASE DROPPED SUCCESSFULLY');

  process.exit(0);
})();
