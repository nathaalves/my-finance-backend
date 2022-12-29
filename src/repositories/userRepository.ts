import { categories } from '../../prisma/data/categoriesData';
import { prisma } from '../config/prisma';
import { insertUser } from '../types/userTypes';

async function addUser(user: insertUser) {
  const data = await prisma.user.create({
    data: {
      ...user,
      categories: {
        createMany: {
          data: categories,
        },
      },
    },
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
