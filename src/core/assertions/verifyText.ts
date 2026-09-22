import { Page, expect } from '@playwright/test'

export async function verifyText(
    page: Page,
    locator: string,
    expected: string
): Promise<void> {

    await expect(page.locator(locator)).toHaveText(expected);
    
}