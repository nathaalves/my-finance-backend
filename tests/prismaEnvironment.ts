import { TestEnvironment as NodeEnvironment } from 'jest-environment-node';
import dotenv from 'dotenv';
import { prisma } from '../src/config/prisma';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { JestEnvironmentConfig } from '@jest/environment';

dotenv.config({
  path: resolve(__dirname, '..', '.env.test'),
});

const prismaCli = './node_modules/.bin/prisma';

class CustomEnvironment extends NodeEnvironment {
  connectionString: string;

  constructor(config: JestEnvironmentConfig, _: any) {
    super(config, _);
    this.connectionString = `${process.env.DATABASE_URL}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    execSync(`${prismaCli} migrate dev`);
  }

  // async teardown() {
  //   await prisma.$executeRaw`DROP SCHEMA IF EXISTS "test" CASCADE`;
  //   await prisma.$disconnect();
  // }
}

module.exports = CustomEnvironment;
