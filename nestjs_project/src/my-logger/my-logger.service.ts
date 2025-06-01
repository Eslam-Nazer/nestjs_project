import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromise } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logFile(entry): Promise<void> {
    const timestamp = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Cairo',
    }).format(new Date())}`;

    const formattedEntry = `${timestamp}\t${entry}\n`;

    const logsDir = path.resolve(process.cwd(), 'logs');
    const logFilePath = path.join(logsDir, 'nest.log');

    try {
      if (!fs.existsSync(logsDir)) {
        await fsPromise.mkdir(logsDir, { recursive: true });
      }

      await fsPromise.appendFile(path.join(logFilePath), formattedEntry);
    } catch (error) {
      console.error(
        `Logger failed: `,
        error instanceof Error ? error.message : error,
      );
    }
  }

  log(message: any, context?: string) {
    const entry = `${context ? `${context}: ` : ''}\t${message}`;

    this.logFile(entry);

    super.log(message, context);
  }

  error(message: any, stack?: string, context?: string) {
    const entry = `${context ? `${context}: ` : ''}\t${stack ? stack : ''}\t${message}`;
    this.logFile(entry);
    super.error(message, stack, context);
  }
}
