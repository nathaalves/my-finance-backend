import { prisma } from '../config/prisma';
import { insertUser } from '../types/userType';

async function addUser(user: insertUser) {
  const data = await prisma.user.create({
    data: user,
  });

  return data;
}

async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export { addUser, findUserByEmail };
