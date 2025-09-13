import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvConfig } from './env-config.validation';
import { EnvConfigService } from './env-config.service';

@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnvConfig })],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
