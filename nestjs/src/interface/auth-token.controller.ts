import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterInputDto } from '../domain/auth/dto/register-input.dto';
import { AuthService } from '../domain/auth/auth.service';
import { CredentialsInputDto } from '../domain/auth/dto/credentials-input.dto';
import { TokenDto } from '../domain/auth/dto/token.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RefreshTokenInputDto } from '../domain/auth/dto/refresh-token-input.dto';

@Controller('auth/token')
export class AuthTokenController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TokenDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() credentialsInputDto: CredentialsInputDto): TokenDto {
    const tokenDto = this.authService.login(credentialsInputDto);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return tokenDto;
  }

  @Post('refresh')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  refresh(@Body() refreshTokenDto: RefreshTokenInputDto): TokenDto {
    const tokenDto = this.authService.refresh(refreshTokenDto.refreshToken);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return tokenDto;
  }

  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  revoke(@Body() refreshTokenInputDto: RefreshTokenInputDto): void {
    return this.authService.revoke(refreshTokenInputDto.refreshToken);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: TokenDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() registerInputDto: RegisterInputDto): TokenDto {
    return this.authService.register(registerInputDto);
  }
}
