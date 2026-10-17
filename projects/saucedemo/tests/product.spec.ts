
import { test } from '../fixtures/saucedemo.fixture';
import { LoadTestCase } from '../../../src/data/loaders/loadTestCase';

const testCases = LoadTestCase(
    'projects/saucedemo/testcases/product.json'
);

for (const testCase of testCases) {
    test(`${testCase.id} - ${testCase.name}`, async ({
        page,
        testEngine
    }) => {
        await page.goto('/');

        await testEngine.run(testCase);
    });
}
