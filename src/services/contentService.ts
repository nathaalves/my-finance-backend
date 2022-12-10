import { Category } from '@prisma/client';
import { requestUserContentByType } from '../repositories/contentRepository';

interface Categories extends Partial<Category> {
  transactions: {
    id: string;
    value: number;
    description: string;
    date: Date;
  }[];
}

function handleContent(content: Categories[]) {
  let total = 0;
  const treatedContent = content.map((category) => {
    let sum = 0;
    let count = 0;

    category.transactions.forEach((transaction) => {
      sum += transaction.value;
      count++;
    });

    total += sum;
    return {
      ...category,
      count,
      sum,
    };
  });

  return { categories: treatedContent, total };
}

export async function requestContent(userId: string) {
  const types = ['entradas', 'saidas'];

  let allContent = {};
  for (let i = 0; i < types.length; i++) {
    const content = await requestUserContentByType(userId, types[i]);

    const { categories, total } = handleContent(content);

    allContent = {
      ...allContent,
      [types[i] === 'entradas' ? 'inflow' : 'outflow']: { categories, total },
    };
  }

  return allContent;
}
