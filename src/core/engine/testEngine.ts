import { KeywordEngine } from '../../keywords/keywordEngine';
import { TestCase } from '../types/testCase.types';

export class TestEngine {

    constructor(private readonly keywordEngine: KeywordEngine) {}

    async run(testCase: TestCase) {
        for (const step of testCase.steps) {
            await this.keywordEngine.execute(step);
        }
    }

    async runAll(testCases: TestCase[]){
        for(const testCase of testCases){
            await this.run(testCase);
        }
    }

}