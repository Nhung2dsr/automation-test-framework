import { Locator, Page } from '@playwright/test';
import { LocatorDefinition } from '../types/locator.types';

/**
 * ObjectResolver chịu trách nhiệm chuyển LocatorDefinition
 * trong Object Repository thành Locator thực tế của Playwright.
 */
export class ObjectResolver {

  constructor(
    private readonly page: Page
  ) {}

  /**
   * Chuyển một LocatorDefinition thành Playwright Locator.
   *
   * Ví dụ:
   * { type: 'css', value: '#submit' }
   *              ↓
   * page.locator('#submit')
   */
  resolve(
    definition: LocatorDefinition
  ): Locator {

    switch (definition.type) {

      case 'css':
        return this.page.locator(definition.value);

      case 'xpath':
        return this.page.locator(definition.value);

      case 'testId':
        return this.page.getByTestId(definition.value);

      case 'text':
        return this.page.getByText(definition.value);

      case 'label':
        return this.page.getByLabel(definition.value);

      case 'placeholder':
        return this.page.getByPlaceholder(definition.value);

      case 'role':
        return this.page.getByRole(
          definition.value as Parameters<Page['getByRole']>[0],
          definition.name
            ? { name: definition.name }
            : undefined
        );

      default:
        throw new Error(
          `Unsupported locator type: ${definition.type}`
        );
    }
  }
}