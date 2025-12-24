import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthApiDto } from '../domain/auth/dto/auth-api.dto';

@Controller('auth')
export class AuthApiController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async authorize(@Body() authApiDto: AuthApiDto): Promise<string> {
    return await 'jwt-token';
  }

  // TODO: implement
  // @Post('refresh')
  // async refresh(): Promise<string> {
  //   return await 'new-jwt-token';
  // }
  //
  // TODO: implement
  // @Post('register')
  // async register(): Promise<object> {
  //   return await { user: 'user-registered' };
  // }
  //
  // TODO: implement? For api ? Invalidate?
  // @Post('logout')
  // async logout(): Promise<void> {
  //   return;
  // }
}
