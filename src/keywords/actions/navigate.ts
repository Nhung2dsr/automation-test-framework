import { Page } from "@playwright/test";

export async function navigateAction(
    page: Page,
    url: string
): Promise<void> {

    await page.goto(url);
      
}