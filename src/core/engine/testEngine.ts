import { KeywordEngine } from '../../keywords/keywordEngine';
import { TestCase } from '../types/testCase.types';

import { TestDataResolver } from '../../data/resolvers/testDataResolver';
import { TestDataRow } from '../../data/loaders/testDataLoader';
import { TestStep } from '../types/testStep.types';


export class TestEngine {

    private readonly dataResolver = new TestDataResolver();

    constructor(private readonly keywordEngine: KeywordEngine) {}

    async run(testCase: TestCase, testData? : TestDataRow) {
        for (const step of testCase.steps) {

            const resolvedStep = testData ? this.resolveStep(step, testData): step;

            await this.keywordEngine.execute(resolvedStep);
        }
    }

    private resolveStep(step: TestStep, testData: TestDataRow): TestStep {

        return {
            ...step,
            data: this.resolveString(step.data, testData),
            expected: this.resolveString(step.expected, testData)
        };
    }

    private resolveString(value: string | undefined, testData: TestDataRow): string | undefined {
        if (value === undefined) {
            return undefined;
        }

        const resolved = this.dataResolver.resolve(value, testData);

        if (typeof resolved !== 'string') {
            throw new Error(`Expected string after resolving "${value}", ` + `but received ${typeof resolved}`);
        }

        return resolved;

    }

}