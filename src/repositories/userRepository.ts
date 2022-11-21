import { prisma } from '../config/prisma';
import { insertUser } from '../types/userType';

async function addUser(user: insertUser) {
  await prisma.user.create({
    data: user,
  });
}

export const userRepository = {
  addUser,
};
