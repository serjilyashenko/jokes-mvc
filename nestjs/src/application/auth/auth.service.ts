import { Inject, Injectable } from '@nestjs/common';
import { CredentialsInputDto } from './dto/credentials-input.dto';
import { TokenMapper } from './mappers/token.mapper';
import { TokenDto } from './dto/token.dto';
import { RegisterInputDto } from './dto/register-input.dto';
import { JwtAuthService } from '../../infrastructure/jwt-auth/jwt-auth.service';
import { AuthIdentity } from '../../infrastructure/jwt-auth/types/auth-identity.type';
import { UserEntity } from '../../infrastructure/reppositories/user/entities/user.entity';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../../domain/user/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly tokenMapper: TokenMapper,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  public async login(
    credentialsDto: CredentialsInputDto,
  ): Promise<TokenDto | null> {
    // TODO: implement actual authentication logic and refresh token generation
    const payload: AuthIdentity = {
      sub: 'test_sub',
      username: credentialsDto.username,
    };
    const accessToken: string = await this.jwtAuthService.sign(payload);
    return this.tokenMapper.toTokenDto(accessToken, 'jwt-refresh-token');
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

  public async register(registerInputDto: RegisterInputDto): Promise<TokenDto> {
    const userEntity: UserEntity = UserEntity.create({
      username: registerInputDto.username,
      // TODO: hash with bcrypt service
      passwordHash: 'hashed-password',
    });
    await this.userRepository.save(userEntity);
    // TODO: implement actual authentication logic and refresh token generation
    console.log('>>> AuthService.register ', registerInputDto);
    return this.tokenMapper.toTokenDto('jwt-access-token', 'jwt-refresh-token');
  }
}
