import { prisma } from '../config/prisma';

export async function requestUserContentByType(userId: string, type: string) {
  const categories = await prisma.category.findMany({
    where: {
      type: type,
      user: {
        id: userId,
      },
      transactions: {
        some: {
          value: {
            gt: 0,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      icon: true,
      iconColor: true,
      transactions: {
        select: {
          id: true,
          name: true,
          value: true,
          description: true,
          date: true,
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
  });

  return categories;
}