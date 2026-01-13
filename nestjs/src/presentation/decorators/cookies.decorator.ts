import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ReadCookies = createParamDecorator<
  string | undefined,
  string | undefined | Record<string, string | undefined>
>(
  (
    data: string,
    ctx: ExecutionContext,
  ): string | undefined | Record<string, string | undefined> => {
    const request: Request = ctx.switchToHttp().getRequest();
    const cookies: Record<string, string | undefined> = request.cookies;
    return data ? cookies?.[data] : cookies;
  },
);
