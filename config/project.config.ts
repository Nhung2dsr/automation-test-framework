import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Đọc lựa chọn project mặc định khi phát triển
dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
    override: false
});

const projectName = process.env.TEST_PROJECT;

if (!projectName) {
    throw new Error('TEST_PROJECT is required. Example: TEST_PROJECT=e-commerce');
}

const projectRoot = path.resolve(
    process.cwd(),
    'projects',
    projectName
);

if (!fs.existsSync(projectRoot) ||!fs.statSync(projectRoot).isDirectory()) {
    throw new Error(`Project not found: ${projectRoot}`);
}

export const projectConfig = {
    name: projectName,
    root: projectRoot
};