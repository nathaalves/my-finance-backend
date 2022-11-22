import { prisma } from '../config/prisma';
import { insertUser } from '../types/userType';

async function addUser(user: insertUser) {
  const data = await prisma.user.create({
    data: user,
  });

  return data;
}

export const userRepository = {
  addUser,
};
