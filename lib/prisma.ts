// lib/prisma.ts
import { PrismaClient, Prisma } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

const options: Prisma.PrismaClientOptions = {
  // log: ["query", "info", "warn", "error"],
};

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(options);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options);
  }
  prisma = global.prisma;
}

export default prisma;
