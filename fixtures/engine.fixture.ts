import { test as base } from '@playwright/test';
import { KeywordEngine } from '../src/keywords/keywordEngine';
import { TestEngine } from '../src/core/engine/testEngine';
import { ObjectRegistry } from '../src/objects/objectRegistry';

type EngineFixtures = {
    objectRegistry: ObjectRegistry;
    keywordEngine: KeywordEngine;
    testEngine: TestEngine;
};

export const test = base.extend<EngineFixtures>({
    objectRegistry: async ({ page }, use) => {
        const registry = new ObjectRegistry();
        await use(registry);
    },
    
    keywordEngine: async ({ page, objectRegistry}, use) => {
        const keywordEngine = new KeywordEngine(page, objectRegistry);

        await use(keywordEngine);
    },

    testEngine: async ({ keywordEngine }, use) => {
        const testEngine = new TestEngine(keywordEngine);

        await use(testEngine);
    },
});

export { expect } from '@playwright/test';