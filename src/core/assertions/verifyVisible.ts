import { expect, Page } from '@playwright/test'

export async function verifyVisible(
    page: Page,
    locator: string 

): Promise<void> {

    await expect (page.locator(locator)).toBeVisible();
    
}