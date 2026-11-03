import { TestStep } from '../../core/types/testStep.types';
import { Keyword } from '../../keywords/types/keyword.types';

const VALID_KEYWORDS: Keyword[] = [
    'NAVIGATE',
    'CLICK',
    'INPUT',
    'SELECT',
    'WAIT',
    'VERIFY_TEXT',
    'VERIFY_VISIBLE',
    'VERIFY_URL',
];

// Kiểm tra keyword có target (locator) hợp lệ
function requireTarget(step: Record<string, unknown>): void {
    if (typeof step.target !== 'string' || step.target.trim() === '') {
        throw new Error(`Keyword "${step.keyword}" requires target. ` + `Received: ${JSON.stringify(step)}`);
    }
}

// Kiểm tra data có kiểu string
// Cho phép chuỗi rỗng để kiểm thử trường nhập liệu bỏ trống
function requireData(step: Record<string, unknown>): void {
    if (typeof step.data !== 'string') {
        throw new Error('Data is required for this keyword.');
    }
}

// Kiểm tra giá trị expected bắt buộc
function requireExpected(step: Record<string, unknown>): void {
    if (
        typeof step.expected !== 'string' ||
        step.expected.trim() === ''
    ) {
        throw new Error('Expected value is required for this keyword.');
    }
}

export function validateTestStep(data: unknown): TestStep {
    // 1. Kiểm tra cấu trúc step
    if (
        typeof data !== 'object' ||
        data === null ||
        Array.isArray(data)
    ) {
        throw new Error('Invalid test step: step must be an object.');
    }

    const step = data as Record<string, unknown>;

    // 2. Kiểm tra keyword
    if (typeof step.keyword !== 'string') {
        throw new Error('Invalid test step: keyword is required.');
    }

    if (!VALID_KEYWORDS.includes(step.keyword as Keyword)) {
        throw new Error(`Unsupported keyword: "${step.keyword}".`);
    }

    const keyword = step.keyword as Keyword;

    // 3. Kiểm tra dữ liệu bắt buộc theo từng keyword
    switch (keyword) {
        case 'NAVIGATE':
            requireData(step);

            if ((step.data as string).trim() === '') {
                throw new Error('URL is required for NAVIGATE.');
            }
            break;

        case 'CLICK':
        case 'WAIT':
        case 'VERIFY_VISIBLE':
            requireTarget(step);
            break;

        case 'INPUT':
        case 'SELECT':
            requireTarget(step);
            requireData(step);
            break;

        case 'VERIFY_TEXT':
            requireTarget(step);
            requireExpected(step);
            break;

        case 'VERIFY_URL':
            requireExpected(step);
            break;
    }

    // 4. Trả về TestStep đã được kiểm tra
    return {
        keyword,
        target:
            typeof step.target === 'string'
                ? step.target
                : undefined,

        data:
            typeof step.data === 'string'
                ? step.data
                : undefined,

        expected:
            typeof step.expected === 'string'
                ? step.expected
                : undefined,
    };
}
