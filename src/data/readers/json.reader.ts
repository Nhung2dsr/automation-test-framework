import fs from 'fs';
import path from 'path';

import { DataReader } from './dataReader';

export class JsonReader<T> implements DataReader<T> {
    read(filePath: string): T {
        
        const absolutePath = path.resolve(process.cwd(), filePath);

        if (!fs.existsSync(absolutePath)) {

            throw new Error(`JSON file not found: ${absolutePath}`);
        }

        const content = fs.readFileSync(absolutePath, 'utf-8');

        try {

            return JSON.parse(content) as T;

        } catch {

            throw new Error(`Invalid JSON file: ${absolutePath}`);
        }
    }
}