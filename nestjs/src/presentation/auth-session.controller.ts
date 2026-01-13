import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request, CookieOptions } from 'express';
import { RegisterInputDto } from '../application/auth/dto/register-input.dto';
import { CredentialsInputDto } from '../application/auth/dto/credentials-input.dto';
import { AuthService } from '../application/auth/auth.service';
import { SessionDto } from '../application/auth/dto/session.dto';

@Controller('auth/session')
export class AuthSessionController {
  private cookieName = 'refresh_token';
  private cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/auth/session',
  };

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() credentialsDto: CredentialsInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SessionDto> {
    const tokenDto = await this.authService.login(credentialsDto);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.setCookie(response, tokenDto.refreshToken);
    return { accessToken: tokenDto.accessToken };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): SessionDto {
    const refreshTokenFromCookie = this.readCookie(request);
    if (!refreshTokenFromCookie) {
      throw new UnauthorizedException('No refresh token provided');
    }
    const tokenDto = this.authService.refresh(refreshTokenFromCookie);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.setCookie(response, tokenDto.refreshToken);
    return { accessToken: tokenDto.accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  public logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): void {
    const refreshTokenFromCookie = this.readCookie(request);
    if (!refreshTokenFromCookie) {
      throw new UnauthorizedException('No refresh token provided');
    }
    this.clearCookie(response);
    return this.authService.revoke(refreshTokenFromCookie);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(
    @Body() registerInputDto: RegisterInputDto,
    @Res({ passthrough: true }) response: Response,
  ): SessionDto {
    const { accessToken, refreshToken } =
      this.authService.register(registerInputDto);
    this.setCookie(response, refreshToken);
    return { accessToken };
  }

  private readCookie(request: Request): string | undefined {
    const cookies: Record<string, string | undefined> = request.cookies;
    return cookies?.[this.cookieName];
  }

  private setCookie(response: Response, refreshToken: string) {
    response.cookie(this.cookieName, refreshToken, this.cookieOptions);
  }

  private clearCookie(response: Response) {
    response.clearCookie(this.cookieName, this.cookieOptions);
  }
}
