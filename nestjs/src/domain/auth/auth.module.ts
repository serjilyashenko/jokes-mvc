import { Module } from '@nestjs/common';
import { AuthTokenController } from '../../interface/auth-token.controller';
import { AuthSessionController } from '../../interface/auth-session.controller';
import { AuthService } from './auth.service';
import { TokenMapper } from './mappers/token.mapper';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthModule } from '../../infra/jwt-auth/jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
  controllers: [AuthTokenController, AuthSessionController],
  providers: [AuthService, TokenMapper, JwtService],
})
export class AuthModule {}
