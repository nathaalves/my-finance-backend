import type { User } from '@prisma/client';

export interface CreateUser extends Pick<User, 'email' | 'name'> {
  password: string;
  confirm_password: string;
}

export type insertUser = Pick<User, 'email' | 'name' | 'password_hash'>;
