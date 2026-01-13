import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterInputDto } from '../application/auth/dto/register-input.dto';
import { AuthService } from '../application/auth/auth.service';
import { CredentialsInputDto } from '../application/auth/dto/credentials-input.dto';
import { TokenDto } from '../application/auth/dto/token.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RefreshTokenInputDto } from '../application/auth/dto/refresh-token-input.dto';

@Controller('auth/token')
export class AuthTokenController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TokenDto })
  async login(
    @Body() credentialsInputDto: CredentialsInputDto,
  ): Promise<TokenDto> {
    const tokenDto = await this.authService.login(credentialsInputDto);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return tokenDto;
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenInputDto): TokenDto {
    const tokenDto = this.authService.refresh(refreshTokenDto.refreshToken);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return tokenDto;
  }

  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  revoke(@Body() refreshTokenInputDto: RefreshTokenInputDto): void {
    return this.authService.revoke(refreshTokenInputDto.refreshToken);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: TokenDto })
  register(@Body() registerInputDto: RegisterInputDto): TokenDto {
    return this.authService.register(registerInputDto);
  }
}
