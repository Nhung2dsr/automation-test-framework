import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

import { DataReader } from './dataReader';

export type CsvRow = Record<string, string>;

export class CsvReader implements DataReader<CsvRow[]> {
   
    read(filePath: string): CsvRow[] {
         const absolutePath = path.resolve(filePath);

         if (!fs.existsSync(absolutePath)){
            throw new Error(`CSV file not found: ${absolutePath}`);
         }

         const content = fs.readFileSync(absolutePath, 'utf-8');

         const data = parse(content, {
            columns: (headers: string[]) =>
               headers.map(header => header.trim()),

            skip_empty_lines: true,
            trim: false
         }) as CsvRow[];

         return data;
    }
}