import { test as base } from '../../../fixtures/engine.fixture';

import { registerObjectRepositories } from '../../../src/objects/loaders/registerObjectRepositories';

export const test = base.extend({
    objectRegistry: async ({ objectRegistry }, use) => {
        
        registerObjectRepositories(objectRegistry, 'projects/saucedemo/objects');

        await use(objectRegistry);
    },
});

export { expect } from '@playwright/test';
