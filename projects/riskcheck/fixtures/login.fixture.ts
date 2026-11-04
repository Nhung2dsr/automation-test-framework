import { test as base, expect } from '../../../fixtures/engine.fixture';

import { LoginPage } from '../pages/LoginPage';

type LoginFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<LoginFixtures>({
    loginPage: async ({ page, objectRegistry }, use) => {
        await use(new LoginPage(page, objectRegistry));
    }
});

export { expect };
