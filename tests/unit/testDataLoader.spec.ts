
import { test, expect } from '@playwright/test';
import { TestDataLoader } from '../../src/data/loaders/testDataLoader';

test.describe('TestDataLoader', () => {
    const loader = new TestDataLoader();

    test('should load JSON test data', () => {
        const data = loader.load('data-files/testdata/login.json');

        expect(data).toHaveLength(2);

        expect(data).toMatchObject([
            { username: 'admin' },
            { username: 'user01' }
        ]);
    });

    test('should load CSV test data', () => {
        const data = loader.load('data-files/testdata/login.csv');

        expect(data).toHaveLength(2);

        expect(data).toEqual([
            {
                username: 'admin',
                password: '123456',
                expected: 'success'
            },
            {
                username: 'user01',
                password: 'wrong',
                expected: 'error'
            }
        ]);
    });

    test('should reject unsupported formats', () => {
        expect(() => {
            loader.load('data-files/testdata/login.xlsx');
        }).toThrow('Unsupported test data format: .xlsx');
    });

    test('should reject missing files', () => {
        expect(() => {
            loader.load('data-files/testdata/missing.json');
        }).toThrow('JSON file not found');
    });
});
