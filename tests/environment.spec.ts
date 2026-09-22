import { test, expect } from '@playwright/test';

test('Kiểm tra environment DEV', async ({ page }) => {

  // "/" sẽ được ghép với baseURL trong playwright.config.ts
  await page.goto('/');

  // Kiểm tra trang đã được mở
  await expect(page).toHaveURL(/.+/);
});