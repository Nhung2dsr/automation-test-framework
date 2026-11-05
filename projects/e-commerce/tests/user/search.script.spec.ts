import path from 'path';

import { test, expect } from '../../fixture/search.fixture';
import { paths } from '../../../../config/paths';
import { TestDataLoader } from '../../../../src/data/loaders/testDataLoader';


const testData = new TestDataLoader().load(path.join(paths.testdata, 'user', 'search.script.csv'));


for (const row of testData) {

    const id = String(row.id);
    const keyword = String(row.keyword);
    const expectedKeyword = String(row.expectedKeyword);

    test(`${id} - Search ${keyword}`, async ({ searchPage }) => {

        // Thực hiện tìm kiếm
        await searchPage.Search(keyword);

        const productNames = await searchPage.getSearchResultNames();

        // Kiểm tra có kết quả
        expect(productNames.length).toBeGreaterThan(0);

        // Kiểm tra số lượng theo CSV (nếu có expectedCount)
        const expectedCount = Number(row.expectedCount);

        expect(productNames).toHaveLength(expectedCount);

        // Kiểm tra từng tên chứa từ khóa
        for (const name of productNames) {
            expect(name.toLowerCase()).toContain(expectedKeyword.toLowerCase());
        }
    });
}
