import path from 'path';
import dotenv from 'dotenv';
import { projectConfig } from './project.config';

// Các môi trường được hỗ trợ
type Environment = 'dev' | 'staging' | 'prod';

const allowedEnvironments: Environment[] = [
    'dev',
    'staging',
    'prod'
];

// Xác định môi trường chạy
const environmentName = process.env.TEST_ENV || 'dev';

// Kiểm tra môi trường hợp lệ
if (!allowedEnvironments.includes(environmentName as Environment)) {
    throw new Error(`Invalid environment: ${environmentName}`);
}

const environment = environmentName as Environment;

// Xác định đường dẫn file .env theo project
const envPath = path.resolve(
    process.cwd(),
    'config',
    'environments',
    projectConfig.name,
    `${environment}.env`
);

// Đọc file cấu hình môi trường
const result = dotenv.config({
    path: envPath
});

// Kiểm tra lỗi đọc file
if (result.error) {
    throw new Error(`Cannot load environment file: ${envPath}`, { cause: result.error });
}

// Lấy BASE_URL từ file đã đọc
const baseURL = result.parsed?.BASE_URL;

// Kiểm tra BASE_URL có tồn tại
if (!baseURL?.trim()) {
    throw new Error(`BASE_URL is not defined in: ${envPath}`);
}

// Kiểm tra định dạng URL
try {
    const url = new URL(baseURL);

    if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Unsupported protocol');
    }
} catch {
    throw new Error(`Invalid BASE_URL in: ${envPath}`);
}

// Export cấu hình môi trường
export const env = {
    name: environment,
    project: projectConfig.name,
    baseURL
};