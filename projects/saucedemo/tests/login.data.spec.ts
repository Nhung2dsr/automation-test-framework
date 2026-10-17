
import { test } from '../fixtures/saucedemo.fixture';
import { LoadTestCase } from '../../../src/data/loaders/loadTestCase';
import { TestDataLoader } from '../../../src/data/loaders/testDataLoader';

const testCases = LoadTestCase(
    'projects/saucedemo/testcases/login.json'
);

const loader = new TestDataLoader();

const testData = loader.load(
    'projects/saucedemo/testdata/login.json'
);

for (const testCase of testCases) {
    const expectedResult =
        testCase.id === 'LOGIN_DDT_001'
            ? 'success'
            : 'error';

    const matchingData = testData.filter(
        row => row.expected === expectedResult
    );

    for (const [index, data] of matchingData.entries()) {
        const rowId =
            typeof data.id === 'string'
                ? data.id
                : `ROW_${index + 1}`;

        test(`${testCase.id} - ${rowId}`, async ({
            page,
            testEngine
        }) => {
            await page.goto('/');
            await testEngine.run(testCase, data);
        });
    }
}
