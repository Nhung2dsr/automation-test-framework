import { TestCase } from '../../core/types/testCase.types';
import { DataReader } from '../readers/dataReader';
import { validateTestCase } from '../validators/testCase.validator';

export class TestCaseLoader {
    constructor( private readonly reader: DataReader<unknown> ) {}

    load(filePath: string): TestCase[] {
        const data = this.reader.read(filePath);

        if (!Array.isArray(data)) {
            throw new Error('Invalid test case data: root must be an array.');
        }

        return data.map(item => validateTestCase(item));
    }
}