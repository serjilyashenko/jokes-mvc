import { Request } from 'express';
import { AuthIdentity } from './auth-identity.type';

export type AuthenticatedRequest = Request & {
  identity?: AuthIdentity;
};
