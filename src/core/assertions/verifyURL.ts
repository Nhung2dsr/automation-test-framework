import { expect, Page } from '@playwright/test'

export async function verifyVisible(
    page: Page,
    expected: string

): Promise<void> {

    await expect (page).toHaveURL(expected);
    
}