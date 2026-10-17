import { defineConfig, devices } from '@playwright/test';

import { env } from './config/environment';
import { paths } from './config/paths';
import path from 'path'

const reportRoot = path.join(paths.project, 'reports');

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
    // reporter: 'html',
    reporter: [
        ['list'],
        ['html', {
            outputFolder: path.join(reportRoot, 'html'),
            open: 'never'
        }],
        ['json', {
            outputFile: path.join(reportRoot, 'results.json')
        }]
    ],

outputDir: path.join(reportRoot, 'test-results'),


    use: {
        // URL từ môi trường được chọn
        baseURL: env.baseURL,

        // Thu thập trace khi retry lần đầu
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
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