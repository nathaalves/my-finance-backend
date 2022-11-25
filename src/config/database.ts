import { Express } from 'express';
import { app } from '../app';
import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;

function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export function initDB(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}
