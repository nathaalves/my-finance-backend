import { prisma } from '../config/prisma';

async function createSession(userId: string) {
  const session = await prisma.session.create({
    data: {
      userId,
    },
  });
  return session;
}

async function findSession(id: string) {
  const session = await prisma.session.findUnique({
    where: {
      id,
    },
  });
  return session;
}

async function removeSession(id: string) {
  await prisma.session.delete({
    where: {
      id,
    },
  });
}

export const authRepository = {
  createSession,
  findSession,
  removeSession,
};
