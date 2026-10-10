
import { test, expect } from '@playwright/test';

import { TestDataLoader } from '../../src/data/loaders/testDataLoader';
import { TestDataResolver } from '../../src/data/resolvers/testDataResolver';

test.describe('TestDataResolver', () => {
    const loader = new TestDataLoader();
    const resolver = new TestDataResolver();

    test('should resolve JSON test data', () => {
        const data = loader.load(
            'data-files/testdata/login.json'
        );

        expect(data).toHaveLength(2);

        const firstRow = data[0];

        if (!firstRow) {
            throw new Error('Missing first JSON data row');
        }

        expect(
            resolver.resolve('${username}', firstRow)
        ).toBe('admin');

        expect(
            resolver.resolve('${password}', firstRow)
        ).toBe('123456');
    });

    test('should resolve CSV test data', () => {
        const data = loader.load(
            'data-files/testdata/login.csv'
        );

        expect(data).toHaveLength(2);

        const secondRow = data[1];

        if (!secondRow) {
            throw new Error('Missing second CSV data row');
        }

        expect(
            resolver.resolve('${username}', secondRow)
        ).toBe('user01');

        expect(
            resolver.resolve('${expected}', secondRow)
        ).toBe('error');
    });

    test('should resolve variables inside strings', () => {
        const result = resolver.resolve(
            'Login with ${username}',
            { username: 'admin' }
        );

        expect(result).toBe('Login with admin');
    });

    test('should preserve values without variables', () => {
        expect(
            resolver.resolve('Login', {})
        ).toBe('Login');
    });

    test('should preserve primitive types', () => {
        expect(
            resolver.resolve('${age}', { age: 20 })
        ).toBe(20);

        expect(
            resolver.resolve('${enabled}', { enabled: false })
        ).toBe(false);
    });

    test('should throw for missing variables', () => {
        expect(() => {
            resolver.resolve('${username}', {});
        }).toThrow(
            'Test data variable not found: username'
        );
    });
});
