import * as fs from 'fs';
import csv from 'csv-parser';
import { Logger } from '@nestjs/common';

export class CsvReaderService {
  private readonly logger = new Logger(
    CsvReaderService.name,
  );

  async readCsv(
    filePath: string,
  ): Promise<Record<string, string>[]> {
    this.logger.log(
      `Reading CSV file: ${filePath}`,
    );

    return new Promise((resolve, reject) => {
      const rows: Record<string, string>[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          rows.push(data);
        })
        .on('end', () => {
          this.logger.log(
            `Loaded ${rows.length} rows from ${filePath}`,
          );

          resolve(rows);
        })
        .on('error', (error) => {
          this.logger.error(
            `Failed to read ${filePath}`,
            error,
          );

          reject(error);
        });
    });
  }
}