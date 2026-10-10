
import { test, expect } from '@playwright/test';

import { TestEngine } from '../../src/core/engine/testEngine';
import { KeywordEngine } from '../../src/keywords/keywordEngine';

import type { TestCase } from '../../src/core/types/testCase.types';
import type { TestStep } from '../../src/core/types/testStep.types';

test.describe('TestEngine Data-Driven', () => {

    test('should resolve data before executing keywords', async () => {
        const executedSteps: TestStep[] = [];

        const keywordEngine = {
            execute: async (step: TestStep) => {
                executedSteps.push(step);
            }
        } as KeywordEngine;

        const engine = new TestEngine(keywordEngine);

        const testCase: TestCase = {
            id: 'TC_LOGIN_01',
            name: 'Login test',
            steps: [
                {
                    keyword: 'INPUT',
                    target: 'LoginPage.username',
                    data: '${username}'
                },
                {
                    keyword: 'INPUT',
                    target: 'LoginPage.password',
                    data: '${password}'
                },
                {
                    keyword: 'VERIFY_TEXT',
                    target: 'LoginPage.message',
                    expected: '${expected}'
                }
            ]
        };

        await engine.run(testCase, {
            username: 'admin',
            password: '123456',
            expected: 'success'
        });

        expect(executedSteps).toEqual([
            {
                keyword: 'INPUT',
                target: 'LoginPage.username',
                data: 'admin'
            },
            {
                keyword: 'INPUT',
                target: 'LoginPage.password',
                data: '123456'
            },
            {
                keyword: 'VERIFY_TEXT',
                target: 'LoginPage.message',
                expected: 'success'
            }
        ]);

        // Testcase gốc không bị thay đổi
        expect(testCase.steps[0]?.data).toBe('${username}');
    });

    test('should run existing testcases without test data', async () => {
        const executedSteps: TestStep[] = [];

        const keywordEngine = {
            execute: async (step: TestStep) => {
                executedSteps.push(step);
            }
        } as KeywordEngine;

        const engine = new TestEngine(keywordEngine);

        const testCase: TestCase = {
            id: 'TC_OLD_01',
            name: 'Existing testcase',
            steps: [
                {
                    keyword: 'CLICK',
                    target: 'LoginPage.loginButton'
                }
            ]
        };

        await engine.run(testCase);

        expect(executedSteps).toEqual(testCase.steps);
    });

});
