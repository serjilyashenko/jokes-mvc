import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtAuthService: JwtService) {}

  async sign<T extends object>(payload: T): Promise<string> {
    return await this.jwtAuthService.signAsync<T>(payload);
  }
}
