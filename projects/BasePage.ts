import { Page, Locator } from '@playwright/test';

import { ObjectRegistry } from '../src/objects/objectRegistry';
import { ObjectResolver } from '../src/objects/objectResolver';

// Lớp cơ sở dùng chung cho các Page Object kế thừa
export abstract class BasePage {

    // Chuyển đổi định nghĩa locator thành Playwright Locator
    protected readonly resolver: ObjectResolver;

    constructor(protected readonly page: Page, protected readonly registry: ObjectRegistry) {
        this.resolver = new ObjectResolver(page);
    }

    // Lấy locator theo key từ Object Repository
    protected getLocator(key: string): Locator { 
        return this.resolver.resolve(this.registry.get(key));
    }
}