import { ROLES } from 'src/auth/types/roles.types';

export interface User {
  id: number;
  name: string;
  role: ROLES;
  email: string;
  iQuci: number;
  hash: string;
  hashRt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserReturned {
  id: number;
  name: string;
  role: ROLES;
  email: string;
  iQuci: number;
}
