import { createDatabase } from 'typeorm-extension';
import dataSource from '../data-source';
import app from '@src/app';

(async () => {
  await createDatabase({
    options: dataSource.options,
    initialDatabase: 'app_db',
    ifNotExist: true
  });

  app.log.info('DATABASE CREATED SUCCESSFULLY');

  process.exit(0);
})();