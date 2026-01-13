import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { DB_PORT, DB_TYPE } from './infrastructure/database/database.const';
import { EnvConfigDto } from './infrastructure/env-config/dto/env-config.dto';
import { validateEnvConfig } from './infrastructure/env-config/env-config.validation';

dotenv.config();

const envConfig: EnvConfigDto = validateEnvConfig(process.env);

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: envConfig.DATABASE_HOST,
  port: DB_PORT,
  username: envConfig.DATABASE_USER,
  password: envConfig.DATABASE_PASSWORD,
  database: envConfig.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
  synchronize: false,
});
