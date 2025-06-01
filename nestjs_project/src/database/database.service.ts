import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MyLoggerService } from '../my-logger/my-logger.service';
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // constructor(private readonly logger: MyLoggerService) {}
  private readonly logger = new MyLoggerService(DatabaseService.name);
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected');
    } catch (error) {
      this.logger.error('Database connection failed', error.stack);
    }
  }
}
