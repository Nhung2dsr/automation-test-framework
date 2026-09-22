import { Locator } from "@playwright/test";

export async function waitAction(
    locator: Locator
): Promise<void> {

    await locator.waitFor({state: 'visible'}); 
      
}