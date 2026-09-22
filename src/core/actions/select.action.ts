import { Page } from "@playwright/test";

export async function selectAction(
    page: Page,
    locator: string,
    value: string
): Promise<void> {

    await page.locator(locator).selectOption(value);
    
}