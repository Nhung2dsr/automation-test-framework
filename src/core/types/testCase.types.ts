import { TestStep } from "./testStep.types";

export interface TestCase {

    id: string;
    name: string;
    description?: string;
    steps: TestStep[]
}