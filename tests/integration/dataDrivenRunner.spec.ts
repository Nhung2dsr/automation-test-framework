
import { test } from './fixtures/mockEngine.fixture';

import type {
    TestCase
} from '../../src/core/types/testCase.types';

import {
    registerDataDrivenTests
} from '../../src/runners/dataDrivenRunner';

const testCase: TestCase = {
    id: 'TC_LOGIN_01',
    name: 'Data-Driven Integration Test',
    steps: [
        {
            keyword: 'INPUT',
            target: 'LoginPage.username',
            data: '${username}'
        },
        {
            keyword: 'VERIFY_TEXT',
            target: 'LoginPage.message',
            expected: '${expected}'
        }
    ]
};

registerDataDrivenTests(test, {
    testCase,
    dataFile: 'tests/integration/data/runner.data.json'
});
