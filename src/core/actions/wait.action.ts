import { Locator, Page } from "@playwright/test";

export async function waitAction(
    page: Page,
    locator: string
): Promise<void> {

    await page.locator(locator).waitFor({state: 'visible'}); 
      
}