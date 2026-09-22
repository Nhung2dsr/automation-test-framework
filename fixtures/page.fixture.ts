import { test as base} from '@playwright/test'

import { BasePage } from '../src/pages/BasePage'
import { ProductPage } from '../src/pages/ProductPage'

type PageFixtures = {
    basePage: BasePage;
    productPage: ProductPage;
};

export const test = base.extend<PageFixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);

        await use(basePage);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);

        await use(productPage);
    },
});

export { expect } from '@playwright/test'