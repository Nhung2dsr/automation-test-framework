
import { test, expect } from '@playwright/test';

import {
    prepareDataDrivenCases
} from '../../src/runners/dataDrivenCases';

test.describe('DataDrivenCases', () => {

    test('should prepare multiple data rows', () => {
        const result = prepareDataDrivenCases([
            { id: 'DATA_01', username: 'admin' },
            { id: 'DATA_02', username: 'user01' }
        ]);

        expect(result).toHaveLength(2);

        expect(result.map(item => item.id)).toEqual([
            'DATA_01',
            'DATA_02'
        ]);
    });

    test('should preserve original test data', () => {
        const data = {
            id: 'DATA_01',
            username: 'admin',
            password: '123456'
        };

        const result = prepareDataDrivenCases([data]);

        expect(result[0]?.data).toEqual(data);
    });

    test('should generate ID when missing', () => {
        const result = prepareDataDrivenCases([
            { username: 'admin' },
            { username: 'user01' }
        ]);

        expect(result.map(item => item.id)).toEqual([
            'ROW_1',
            'ROW_2'
        ]);
    });

    test('should reject empty test data', () => {
        expect(() => {
            prepareDataDrivenCases([]);
        }).toThrow('Test data must not be empty.');
    });

    test('should reject duplicate IDs', () => {
        expect(() => {
            prepareDataDrivenCases([
                { id: 'DATA_01', username: 'admin' },
                { id: 'DATA_01', username: 'user01' }
            ]);
        }).toThrow('Duplicate test data ID: DATA_01');
    });
});
