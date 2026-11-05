import { expect, Page } from '@playwright/test';

export async function verifyLoginResult(
    page: Page,
    expectedResult: string,
    expectedMessage: string = ''
): Promise<void> {
    switch (expectedResult.trim()) {

        case 'success': {
            await expect(page).toHaveURL(/\/wp-admin(?:\/|$)/);

            await expect(page.locator('#wpbody-content')).toBeVisible();

            break;
        }

        case 'failure': {
            const error = page.locator('#login_error');

            await expect(error).toBeVisible();

            if (expectedMessage.trim()) {
                await expect(error).toContainText(expectedMessage);
            }

            break;
        }

        case 'required_username': {
            const username = page.locator('#user_login');

            await expect(username).toBeVisible();
            await expect(username).toBeEmpty();

            const valueMissing = await username.evaluate(
                (element: HTMLInputElement) =>
                    element.validity.valueMissing
            );

            expect(valueMissing).toBe(true);
            break;
        }

        case 'required_password': {
            const password = page.locator('#user_pass');

            await expect(password).toBeVisible();
            await expect(password).toBeEmpty();

            const valueMissing = await password.evaluate(
                (element: HTMLInputElement) =>
                    element.validity.valueMissing
            );

            expect(valueMissing).toBe(true);
            break;
        }

        default:
            throw new Error(`Unsupported expectedResult: ${expectedResult}`);
    }
}
