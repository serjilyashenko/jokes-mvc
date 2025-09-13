import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvConfigDto } from './dto/env-config.dto';

export function validateEnvConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvConfigDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
