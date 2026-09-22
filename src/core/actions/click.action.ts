import { Page } from '@playwright/test'

export async function clickAction(
    page: Page,
    locator: string

): Promise<void> {
    await page.locator(locator).click();
}