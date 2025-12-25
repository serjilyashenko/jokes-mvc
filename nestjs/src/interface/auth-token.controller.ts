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

@Controller('auth/token')
export class AuthTokenController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  authorize(): string {
    // TODO: implement
    return 'jwt-token';
  }

  @Post('refresh')
  refresh(): string {
    // TODO: implement
    return 'new-jwt-token';
  }

  @Post('revoke')
  async revoke(): Promise<void> {
    // TODO: implement? invalidate refresh token
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
