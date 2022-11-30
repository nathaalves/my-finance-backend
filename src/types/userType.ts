import type { User } from '@prisma/client';

export interface Signup extends Pick<User, 'email' | 'name'> {
  password: string;
  confirm_password: string;
}

export type UserData = Omit<Signup, 'confirm_password'>;

export type insertUser = Pick<User, 'email' | 'name' | 'password_hash'>;

export type JWTPayload = Pick<User, 'id' | 'name'>;

export interface Signin extends Pick<User, 'email'> {
  password: string;
}
