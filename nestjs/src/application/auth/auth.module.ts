import { Module } from '@nestjs/common';
import { AuthTokenController } from '../../presentation/auth-token.controller';
import { AuthSessionController } from '../../presentation/auth-session.controller';
import { AuthService } from './auth.service';
import { TokenMapper } from './mappers/token.mapper';
import { JwtAuthModule } from '../../infrastructure/jwt-auth/jwt-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/reppositories/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtAuthModule],
  providers: [AuthService, TokenMapper],
  controllers: [AuthTokenController, AuthSessionController],
})
export class AuthModule {}
