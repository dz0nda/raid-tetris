import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  synchronize: true,
  logging: false,
  entities: ['modules/**/*.entity.ts'],
  migrations: ['modules/**/*.migration.ts'],
};
