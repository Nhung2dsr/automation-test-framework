
import path from 'path';

import { JsonReader } from '../readers/json.reader';
import { CsvReader } from '../readers/csv.reader';

export type TestDataRow = Record<string, unknown>;

export class TestDataLoader {
    load(filePath: string): TestDataRow[] {
        const extension = path.extname(filePath).toLowerCase();

        let data: unknown;

        switch (extension) {
            case '.json':
                data = new JsonReader<unknown>().read(filePath);
                break;

            case '.csv':
                data = new CsvReader().read(filePath);
                break;

            default:
                throw new Error(`Unsupported test data format: ${extension || '(none)'}`);
        }

        if (!Array.isArray(data)) {
            throw new Error('Invalid test data: root must be an array.');
        }

        for (const [index, row] of data.entries()) {
            if ( row === null || typeof row !== 'object' || Array.isArray(row)) {
                throw new Error(`Invalid test data at row ${index + 1}: expected an object.`);
            }
        }

        return data as TestDataRow[];
    }
}
