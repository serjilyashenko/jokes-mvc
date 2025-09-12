import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { DB_PORT, DB_TYPE } from './infra/database/database.const';

dotenv.config();

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: process.env.DATABASE_HOST,
  port: DB_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
  synchronize: false,
});
