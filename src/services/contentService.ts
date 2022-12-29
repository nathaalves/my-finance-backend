import { Category } from '@prisma/client';
import { requestUserContentByType } from '../repositories/contentRepository';

interface Categories extends Partial<Category> {
  transactions: {
    id: string;
    note: string;
    value: number;
    description: string;
    date: Date;
  }[];
}

function handleContent(content: Categories[]) {
  let totalValue = 0;
  let transactionsAmount = 0;
  const treatedContent = content.map((category) => {
    let sum = 0;
    let count = 0;

    category.transactions.forEach((transaction) => {
      sum += transaction.value;
      count++;
      transactionsAmount++;
    });

    totalValue += sum;
    return {
      ...category,
      count,
      sum,
    };
  });

  treatedContent.sort(function (a, b) {
    return b.sum - a.sum;
  });

  return { categories: treatedContent, totalValue, transactionsAmount };
}

export async function requestContent(userId: string) {
  const types = ['entradas', 'saidas'];

  let allContent = {};
  for (let i = 0; i < types.length; i++) {
    const content = await requestUserContentByType(userId, types[i]);

    const { categories, totalValue, transactionsAmount } =
      handleContent(content);

    allContent = {
      ...allContent,
      [types[i] === 'entradas' ? 'inflow' : 'outflow']: {
        categories,
        totalValue,
        transactionsAmount,
      },
    };
  }

  return allContent;
}
