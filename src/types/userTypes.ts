import type { User } from '@prisma/client';

export type Signup = Pick<User, 'email' | 'name'> & {
  password: string;
  confirm_password: string;
};

export type UserData = Omit<Signup, 'confirm_password'>;

export type insertUser = Pick<User, 'email' | 'name' | 'password_hash'>;

export type Signin = Pick<User, 'email'> & {
  password: string;
};

export type JWTPayload = {
  userId: string;
  name: string;
  type: 'access' | 'refresh';
  sessionId: string;
};
