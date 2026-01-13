import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthIdentity } from './types/auth-identity.type';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: AuthIdentity): Promise<string> {
    return await this.jwtService.signAsync<AuthIdentity>(payload);
  }

  async verify(token: string): Promise<AuthIdentity> {
    return await this.jwtService.verifyAsync<AuthIdentity>(token);
  }
}
