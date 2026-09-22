import { Locator } from "@playwright/test";

export async function selectAction(
    locator: Locator,
    value: string
): Promise<void> {

    await locator.selectOption(value);
    
}