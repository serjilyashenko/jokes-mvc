import { Module } from '@nestjs/common';
import { AuthTokenController } from '../../interface/auth-token.controller';
import { AuthSessionController } from '../../interface/auth-session.controller';

@Module({
  controllers: [AuthTokenController, AuthSessionController],
})
export class AuthModule {}
