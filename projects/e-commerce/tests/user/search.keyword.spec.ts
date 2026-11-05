import { test } from "../../../../fixtures/engine.fixture";

import path from 'path';
import { paths } from  '../../../../config/paths';

import { LoadTestCase } from "../../../../src/data/loaders/loadTestCase";

import { registerDataDrivenTests } from "../../../../src/runners/dataDrivenRunner";

// Load keyword test case

const testCases = LoadTestCase(path.join(paths.testcases, 'user', 'search.no-results.json'));

// Mỗi test bắt đầu từ trang chủ

test.beforeEach(async ( { page }) => {
    await page.goto('/');
});

// Đăng kí các test theo từng bộ dữ liệu
for (const testCase of testCases) {
    registerDataDrivenTests(test, {testCase, dataFile: path.join(paths.testdata, 'user', 'search.no-results.json')});
}

// Đăng kí thêm test case Tìm kiếm không có kết quả trong danh mục

const categoryCases = LoadTestCase(path.join(paths.testcases, 'user', 'search.category-no-results.json'));

for (const testCase of categoryCases) {
    registerDataDrivenTests(test, {testCase, dataFile: path.join( paths.testdata, 'user', 'search.category-no-results.json')});
}

// Đăng kí thêm test case Tìm kiếm khi không nhập từ khóa
const emptyInputCases = LoadTestCase(path.join( paths.testcases, 'user', 'search.empty-input.json'));

for (const testCase of emptyInputCases) {
    registerDataDrivenTests(test, {testCase, dataFile: path.join(paths.testdata, 'user', 'search.empty-input.json')});
}

