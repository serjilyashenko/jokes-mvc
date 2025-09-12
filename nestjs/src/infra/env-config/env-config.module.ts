import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-config.validation';
import { EnvConfigService } from './env-config.service';

@Module({
  imports: [ConfigModule.forRoot({ validate })],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
