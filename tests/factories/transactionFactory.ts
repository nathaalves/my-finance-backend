import { faker } from '@faker-js/faker';
import { TransactionBody } from '../../src/types/transactionTypes';

export function generateTransactionInfo(
  changeInformations?: Partial<TransactionBody>
): TransactionBody {
  let transactionInfo = {
    note: faker.lorem.text(),
    description: faker.lorem.sentence(),
    value: faker.datatype.number({ max: 99999999 }),
    date: faker.date.recent(),
    categoryId: faker.datatype.uuid(),
  };

  transactionInfo = { ...transactionInfo, ...changeInformations };

  return transactionInfo;
}

export function generateUuid() {
  return faker.datatype.uuid();
}
