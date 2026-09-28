import { TestStep } from '../../core/types/testStep.types';
import { Keyword } from '../../keywords/types/keyword.types';

const VALID_KEYWORDS: Keyword[] = [
    'CLICK',
    'INPUT',
    'SELECT',
    'WAIT',
    'VERIFY_TEXT',
    'VERIFY_VISIBLE',
    'VERIFY_URL',
];

function requireTarget(step: Record<string, unknown>): void {
    if (typeof step.target !== 'string' || step.target.trim() === '') {

        throw new Error('Target is required for this keyword.');
    }
}

function requireExpected(step: Record<string, unknown>): void {
    if (typeof step.expected !== 'string' || step.expected.trim() === '') {

        throw new Error('Expected value is required for this keyword.');
    }
}


function requireData(step: Record<string, unknown>): void {
    if (typeof step.data !== 'string' || step.data.trim() === '') {

        throw new Error('Data is required for this keyword.');
    }
}

export function validateTestStep(data: unknown): TestStep {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid test step: step must be an object.');
    }

    const step = data as Record<string, unknown>;

    if (typeof step.keyword !== 'string') {
        throw new Error('Invalid test step: keyword is required.');
    }

    if (!VALID_KEYWORDS.includes(step.keyword as Keyword)) {
        throw new Error(`Unsupported keyword: "${step.keyword}".`);
    }

    const keyword = step.keyword as Keyword;

    switch (keyword) {
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

    return {
        keyword,
        target:
            typeof step.target === 'string' ? step.target : undefined,

        data:
            typeof step.data === 'string' ? step.data : undefined,

        expected:
            typeof step.expected === 'string' ? step.expected : undefined,
    };
}