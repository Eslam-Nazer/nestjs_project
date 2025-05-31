import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromise } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Cairo',
    }).format(new Date())} ${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromise.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }

      await fsPromise.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'nest.log'),
        formattedEntry,
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
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
