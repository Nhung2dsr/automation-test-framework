import path from 'path';
import dotenv from 'dotenv';

// Khai báo các môi trường mà framework cho phép sử dụng
type Environment = 'dev' | 'staging' | 'prod';

// Lấy môi trường từ biến TEST_ENV. Nếu người dùng không truyền TEST_ENV thì mặc định sử dụng môi trường dev
const environment = (process.env.TEST_ENV || 'dev') as Environment;

const allowedEnvironments: Environment[] = ['dev', 'staging','prod'];

// Kiểm tra TEST_ENV có thuộc danh sách môi trường được hỗ trợ hay không
if (!allowedEnvironments.includes(environment)) {
  throw new Error(
    `Invalid environment: ${environment}. ` +
    `Allowed environments: dev, staging, prod`
  );
}

// Tạo đường dẫn tuyệt đối đến file cấu hình môi trường tương ứng
const envPath = path.resolve(process.cwd(), 'config', 'environments', `${environment}.env`);

const result = dotenv.config({ path: envPath });

if (result.error) {
  throw new Error(`Cannot load environment file: ${envPath}`);
}

// Kiểm tra BASE_URL có được khai báo trong file môi trường hay không
if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is not defined for environment: ${environment}`);
}

// Export cấu hình môi trường để các file khác sử dụng
export const env = {
    name: environment,
    baseURL: process.env.BASE_URL
};