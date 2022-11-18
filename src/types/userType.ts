import type { User } from '@prisma/client';

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
