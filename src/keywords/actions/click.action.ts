import { Locator } from '@playwright/test'

export async function clickAction(
    
    locator: Locator

): Promise<void> {
    await locator.click();
}