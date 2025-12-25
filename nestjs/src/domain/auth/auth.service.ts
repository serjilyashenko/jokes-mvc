import { Injectable } from '@nestjs/common';
import { CredentialsInputDto } from './dto/credentials-input.dto';
import { TokenMapper } from './mappers/token.mapper';
import { TokenDto } from './dto/token.dto';
import { RegisterInputDto } from './dto/register-input.dto';

@Injectable()
export class AuthService {
  constructor(private readonly tokenMapper: TokenMapper) {}

  public login(credentialsDto: CredentialsInputDto): TokenDto | null {
    // TODO: implement actual authentication logic
    console.log('>>> AuthService.login ', credentialsDto);
    return this.tokenMapper.toTokenDto('jwt-access-token', 'jwt-refresh-token');
  }

  public refresh(refreshToken: string): TokenDto | null {
    // TODO: implement actual token refresh logic
    console.log('>>> AuthService.refresh ', refreshToken);
    return this.tokenMapper.toTokenDto('jwt-access-token', refreshToken);
  }

  public revoke(refreshToken: string): void {
    // TODO: implement token revocation logic
    console.log('>>> AuthService.revoke ', refreshToken);
    return;
  }

  public register(registerInputDto: RegisterInputDto): TokenDto {
    // TODO: implement user registration logic
    console.log('>>> AuthService.register ', registerInputDto);
    return this.tokenMapper.toTokenDto('jwt-access-token', 'jwt-refresh-token');
  }
}
