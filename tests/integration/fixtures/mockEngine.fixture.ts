
import { test as base, expect } from '@playwright/test';

import { TestEngine } from '../../../src/core/engine/testEngine';
import type { TestStep } from '../../../src/core/types/testStep.types';
import type { KeywordEngine } from '../../../src/keywords/keywordEngine';

type MockFixtures = {
    testEngine: TestEngine;
};

export const test = base.extend<MockFixtures>({
    testEngine: async ({}, use, testInfo) => {
        const executedSteps: TestStep[] = [];

        const mockKeywordEngine = {
            execute: async (step: TestStep) => {
                executedSteps.push(step);
            }
        } as KeywordEngine;

        const engine = new TestEngine(mockKeywordEngine);

        await use(engine);

        // Xác minh các step sau khi Engine thực thi
        const expectedUsername = testInfo.title.includes('DATA_01')
            ? 'admin'
            : 'user01';

        const expectedResult = testInfo.title.includes('DATA_01')
            ? 'success'
            : 'error';

        expect(executedSteps).toHaveLength(2);

        expect(executedSteps[0]).toMatchObject({
            keyword: 'INPUT',
            data: expectedUsername
        });

        expect(executedSteps[1]).toMatchObject({
            keyword: 'VERIFY_TEXT',
            expected: expectedResult
        });
    }
});

export { expect };
