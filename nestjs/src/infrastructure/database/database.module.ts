import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/env-config.service';
import { DB_PORT, DB_TYPE } from './database.const';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [EnvConfigModule],
  inject: [EnvConfigService],
  useFactory: (envConfigService: EnvConfigService) => {
    return {
      type: DB_TYPE,
      host: envConfigService.databaseHost,
      port: DB_PORT,
      username: envConfigService.databaseUser,
      password: envConfigService.databasePassword,
      database: envConfigService.databaseName,
      autoLoadEntities: true,
      synchronize: false,
    };
  },
});
