import { Locator, expect } from '@playwright/test'

export async function verifyText(
    locator: Locator,
    expected: string
): Promise<void> {

    await expect (locator).toHaveText(expected);
    
}