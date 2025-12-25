import { Injectable } from '@nestjs/common';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class TokenMapper {
  constructor() {}

  toTokenDto(accessToken: string, refreshToken: string): TokenDto {
    return { accessToken, refreshToken };
  }
}
