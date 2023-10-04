import { DataSource } from 'typeorm';

import { Logger } from '@/server/modules/utils/utils';
import { databaseConfig } from './database.config';

export class DatabaseModule {
  public connection: DataSource;

  constructor() {
    try {
      this.connection = new DataSource(databaseConfig);
      Logger.info('Database connected successfully');
    } catch (error) {
      Logger.error('Error connecting to the database', error);
      process.exit(1);
    }
  }
}
