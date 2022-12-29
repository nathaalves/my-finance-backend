import { prisma } from '../config/prisma';

export async function requestUserContentByType(userId: string, type: string) {
  const categories = await prisma.category.findMany({
    where: {
      type: type,
      user: {
        id: userId,
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
          note: true,
          value: true,
          description: true,
          date: true,
          categoryId: true,
        },
        orderBy: [
          {
            date: 'desc',
          },
          {
            createdAt: 'desc',
          },
        ],
      },
    },
  });

  return categories;
}
