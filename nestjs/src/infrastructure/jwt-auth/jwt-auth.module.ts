import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/env-config.service';
import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (envConfigService: EnvConfigService) => ({
        global: true,
        secret: envConfigService.jwtSecret,
        signOptions: { expiresIn: envConfigService.jwtExpirationTime },
      }),
    }),
  ],
  providers: [JwtAuthService, JwtAuthGuard],
  exports: [JwtAuthService, JwtAuthGuard],
})
export class JwtAuthModule {}
