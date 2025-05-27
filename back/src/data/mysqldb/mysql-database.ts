import { PrismaClient } from "../../generated/prisma";

interface Options {
  databaseUrl: string;
  dbName: string;
}

export class MySQLDatabase {
  private static isConnected = false;
  private static prisma: PrismaClient;

  static async connect(options: Options): Promise<void> {
    if (this.isConnected) {
      console.log('[INFO] MySQL already connected');
      return;
    }

    const url = `${options.databaseUrl}/${options.dbName}`;

    this.prisma = new PrismaClient({
      datasources: {
        db: { url },
      },
    });

    try {
      await this.prisma.$connect();
      this.isConnected = true;
      console.log('[OK] MySQL connection established');
    } catch (error) {
      console.error('[ERROR] MySQL connection error:', error);
      throw error;
    }
  }

  static get client(): PrismaClient {
    if (!this.prisma) {
      throw new Error('[ERROR] MySQL client not initialized. Call connect() first.');
    }
    return this.prisma;
  }

  static async disconnect(): Promise<void> {
    if (!this.isConnected || !this.prisma) {
      console.warn('[WARN] No MySQL connection to close.');
      return;
    }

    await this.prisma.$disconnect();
    this.isConnected = false;
    console.log('[OK] MySQL connection closed');
  }
}
