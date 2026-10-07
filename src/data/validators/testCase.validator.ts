import { TestCase } from '../../core/types/testCase.types';
import { validateTestStep } from './testStep.validator';

export function validateTestCase(data: unknown): TestCase {
    if (typeof data !== 'object' || data === null) {

        throw new Error('Invalid test case: test case must be an object.');

    }

    const testCase = data as Record<string, unknown>;

    if (typeof testCase.id !== 'string' || testCase.id.trim() === '') {

        throw new Error(`Invalid test case "${testCase.id}": id is required.`);

    }

    if (typeof testCase.name !== 'string' || testCase.name.trim() === '') {

        throw new Error(`Invalid test case "${testCase.id}": name is required.`);

    }

    if (testCase.description !== undefined && typeof testCase.description !== 'string') {
        throw new Error(`Invalid test case "${testCase.id}": description must be a string.`);
    }

    if (!Array.isArray(testCase.steps) || testCase.steps.length === 0) {
        throw new Error(`Invalid test case "${testCase.id}": steps must be a non-empty array.`);
    }

    const steps = testCase.steps.map(step => validateTestStep(step));

    return {
        id: testCase.id,
        name: testCase.name,
        description: testCase.description as string | undefined,
        steps,
    };
}