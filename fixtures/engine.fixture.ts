
import { test as base, expect } from '@playwright/test';

import { paths } from '../config/paths';

import { KeywordEngine } from '../src/keywords/keywordEngine';
import { TestEngine } from '../src/core/engine/testEngine';

import { ObjectRegistry } from '../src/objects/objectRegistry';
import { registerObjectRepositories } from '../src/objects/loaders/registerObjectRepositories';

type EngineFixtures = {
    objectRegistry: ObjectRegistry;
    keywordEngine: KeywordEngine;
    testEngine: TestEngine;
};

export const test = base.extend<EngineFixtures>({

    objectRegistry: async ({}, use) => {
        const registry = new ObjectRegistry();

        registerObjectRepositories(registry, paths.objects);

        await use(registry);
    },

    keywordEngine: async ({ page, objectRegistry }, use) => {
        const keywordEngine = new KeywordEngine(page, objectRegistry);

        await use(keywordEngine);
    },

    testEngine: async ({ keywordEngine }, use) => {
        const testEngine = new TestEngine(keywordEngine);

        await use(testEngine);
    },
});

export { expect };
