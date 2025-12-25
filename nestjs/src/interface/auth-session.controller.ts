import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterInputDto } from '../domain/auth/dto/register-input.dto';
import { CredentialsInputDto } from '../domain/auth/dto/credentials-input.dto';
import { AuthService } from '../domain/auth/auth.service';
import { SessionDto } from '../domain/auth/dto/session.dto';

@Controller('auth/session')
export class AuthSessionController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(
    @Body() credentialsDto: CredentialsInputDto,
    @Res({ passthrough: true }) response: Response,
  ): SessionDto {
    const tokenDto = this.authService.login(credentialsDto);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.setRefreshTokenCookie(response, tokenDto.refreshToken);
    return { accessToken: tokenDto.accessToken };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): SessionDto {
    const refreshTokenFromCookie = this.getRefreshTokenFromCookie(request);
    const tokenDto = this.authService.refresh(refreshTokenFromCookie);
    if (!tokenDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.setRefreshTokenCookie(response, tokenDto.refreshToken);
    return { accessToken: tokenDto.accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): void {
    const refreshTokenFromCookie = this.getRefreshTokenFromCookie(request);
    this.clearRefreshTokenCookie(response);
    return this.authService.revoke(refreshTokenFromCookie);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(
    @Body() registerInputDto: RegisterInputDto,
    @Res({ passthrough: true }) response: Response,
  ): SessionDto {
    const { accessToken, refreshToken } =
      this.authService.register(registerInputDto);
    this.setRefreshTokenCookie(response, refreshToken);
    return { accessToken };
  }

  private getRefreshTokenFromCookie(request: Request): string {
    // TODO: get refresh token from http-only cookie
    return 'refresh-token-from-cookie';
  }

  private setRefreshTokenCookie(request: Response, refreshToken: string) {
    // TODO: add refresh token in http-only cookie
    // response.cookie('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    // });
  }

  private clearRefreshTokenCookie(request: Response) {
    // TODO: remove refresh token cookie
    // res.clearCookie('refresh_token', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    // });
  }
}
