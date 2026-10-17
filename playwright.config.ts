import { defineConfig, devices } from '@playwright/test';

import { env } from './config/environment';
import { paths } from './config/paths';

export default defineConfig({

    // Chỉ chạy tests của project được chọn
    testDir: paths.tests,

    // Nhận diện Playwright test scripts
    testMatch: '**/*.spec.ts',

    // Chạy song song
    fullyParallel: true,

    // Không cho phép test.only trên CI
    forbidOnly: !!process.env.CI,

    // Retry khi chạy CI
    retries: process.env.CI ? 2 : 0,

    // Giới hạn worker trên CI
    workers: process.env.CI ? 1 : undefined,

    // Báo cáo HTML
    reporter: 'html',

    use: {
        // URL từ môi trường được chọn
        baseURL: env.baseURL,

        // Thu thập trace khi retry lần đầu
        trace: 'on-first-retry',
    },

    // Cấu hình trình duyệt
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});