import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth-guard.service';

export function JwtAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
