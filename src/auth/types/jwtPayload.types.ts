import { ROLES } from './roles.types';

export type JwtPayload = {
  email: string;
  sub: number;
  // role: ROLES;
};
