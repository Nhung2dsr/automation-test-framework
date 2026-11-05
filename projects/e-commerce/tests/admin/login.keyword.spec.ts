
import path from 'path';

import { test } from '../../fixture/search.fixture';
import { TestCaseLoader } from '../../../../src/data/loaders/testCase.loader';
import { JsonReader } from '../../../../src/data/readers/json.reader';
import { TestDataLoader } from '../../../../src/data/loaders/testDataLoader';

import { paths } from '../../../../config/paths';
import { verifyLoginResult } from '../../keywords/verifyLoginResult';

const testcaseFile = path.join(paths.testcases,'admin','login.testcases.json');

const dataFile = path.join(paths.testdata, 'admin', 'login.data.csv');

const testcaseLoader = new TestCaseLoader(new JsonReader());
const testCases = testcaseLoader.load(testcaseFile);

const dataLoader = new TestDataLoader();
const testData = dataLoader.load(dataFile);

for (const testCase of testCases) {
    for (const row of testData) {
        const caseId = String(row.id ?? '').trim();

        if (!caseId) {
            throw new Error(`Missing test data ID. Available columns: ${Object.keys(row).join(', ')}`);
        }

        test(`${testCase.id} - ${caseId}`, async ({page, testEngine}) => {
            // Thực thi các bước Keyword-Driven
            await testEngine.run(testCase, row);

            // Xác minh kết quả theo dữ liệu CSV
            await verifyLoginResult(page, String(row.expectedResult ?? ''), String(row.expectedMessage ?? ''));
        });
    }
}
