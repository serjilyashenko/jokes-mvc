import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export class EnvConfigDto {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRATION: number;
}
