import { Locator } from "@playwright/test";

export async function inputAction(
    locator: Locator,
    value: string
): Promise <void> {

    await locator.fill(value);   
}