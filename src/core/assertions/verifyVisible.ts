import { expect, Locator } from '@playwright/test'

export async function verifyVisible(
    locator: Locator 

): Promise<void> {

    await expect (locator).toBeVisible();
    
}