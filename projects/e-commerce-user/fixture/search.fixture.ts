import { test as base, expect } from '../../../fixtures/engine.fixture';
import { SearchPage } from '../pages/SearchPage';

type ProjectFixtures = {
    searchPage: SearchPage;
};

export const test = base.extend<ProjectFixtures>({
    searchPage: async ({ page, objectRegistry }, use) => {
        await use(new SearchPage(page, objectRegistry));
    },
});

export { expect };