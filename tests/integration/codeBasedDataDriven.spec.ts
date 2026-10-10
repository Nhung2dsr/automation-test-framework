
import { test, expect } from '@playwright/test';

import {
    TestDataLoader
} from '../../src/data/loaders/testDataLoader';

const loader = new TestDataLoader();

const testData = loader.load(
    'tests/integration/data/runner.data.json'
);

for (const [index, row] of testData.entries()) {
    const rowId =
        typeof row.id === 'string'
            ? row.id
            : `ROW_${index + 1}`;

    test(`Code-Based - ${rowId}`, async () => {
        // Validate data types before using them
        expect(typeof row.username).toBe('string');
        expect(typeof row.expected).toBe('string');

        // Code-Based accesses row values directly
        expect(row.username).toBeTruthy();

        expect(['success', 'error']).toContain(
            row.expected
        );
    });
}
