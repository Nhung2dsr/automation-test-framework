import { Page } from "@playwright/test";

export async function inputAction(
    page: Page,
    locator: string,
    value: string
): Promise <void> {

    await page.locator(locator).fill(value);   
}