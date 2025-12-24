import { Module } from '@nestjs/common';
import { AuthApiController } from '../../interface/auth-api.controller';

@Module({
  controllers: [AuthApiController],
})
export class AuthModule {}
