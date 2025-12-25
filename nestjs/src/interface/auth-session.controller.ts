import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDto } from '../domain/auth/dto/register.dto';

@Controller('auth/session')
export class AuthSessionController {
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(): string {
    // TODO: implement
    return 'jwt-token';
  }

  @Post('refresh')
  refresh(): string {
    // TODO: implement
    return 'new-jwt-token';
  }

  @Post('logout')
  async logout(): Promise<void> {
    // TODO: implement
    // return;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() _authApiDto: RegisterDto): object {
    // TODO: implement
    return { user: 'user-registered' };
  }
}
