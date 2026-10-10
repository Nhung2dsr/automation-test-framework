
import type { TestType } from '@playwright/test';

import { TestDataLoader } from '../data/loaders/testDataLoader';
import type {TestDataRow } from '../data/loaders/testDataLoader';

import type { TestCase } from '../core/types/testCase.types';

import { prepareDataDrivenCases } from './dataDrivenCases';

type EngineFixture = { testEngine: {
        run(
            testCase: TestCase,
            data?: TestDataRow
        ): Promise<void>;
    };
};

type DataDrivenOptions = {
    testCase: TestCase;
    dataFile: string;
};

export function registerDataDrivenTests<
    T extends EngineFixture,
    W extends {}
>(
    test: TestType<T, W>,
    options: DataDrivenOptions
): void {
    const loader = new TestDataLoader();

    const rows = loader.load(options.dataFile);

    const cases = prepareDataDrivenCases(rows);

    for (const testData of cases) {
        test(
            `${options.testCase.id} - ${testData.id}`,
            async ({ testEngine }) => {
                await testEngine.run(
                    options.testCase,
                    testData.data
                );
            }
        );
    }
}
