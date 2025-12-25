import { Module } from '@nestjs/common';
import { AuthTokenController } from '../../interface/auth-token.controller';
import { AuthSessionController } from '../../interface/auth-session.controller';
import { AuthService } from './auth.service';
import { TokenMapper } from './mappers/token.mapper';

@Module({
  controllers: [AuthTokenController, AuthSessionController],
  providers: [AuthService, TokenMapper],
})
export class AuthModule {}
