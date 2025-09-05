import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfigDto, Environment } from './dto/env-config.dto';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService<EnvConfigDto, true>) {}

  get nodeEnv(): Environment {
    return this.configService.get('NODE_ENV');
  }

  get isProd(): boolean {
    return this.nodeEnv === Environment.Production;
  }

  get databaseHost(): string {
    return this.configService.get('DATABASE_HOST');
  }

  get databaseName(): string {
    return this.configService.get('DATABASE_NAME');
  }

  get databaseUser(): string {
    return this.configService.get('DATABASE_USER');
  }

  get databasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD');
  }
}
