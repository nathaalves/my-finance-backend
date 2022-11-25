import { prisma } from '../src/config/prisma';

export async function cleanDb() {
  await prisma.user.deleteMany({});
}
