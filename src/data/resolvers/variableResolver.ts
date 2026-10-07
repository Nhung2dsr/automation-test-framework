import { TestCase } from "../../core/types/testCase.types";

export type VariableContext = Record<string, string>;

export class VariableResolver {

    resolve( testCase: TestCase, context: VariableContext): TestCase {

        return {
            ...testCase,
            steps: testCase.steps.map(step => ({
                ...step,

                target: this.resolveValue(step.target, context),

                data: this.resolveValue(step.data, context),

                expected: this.resolveValue(step.expected, context),

            }))
        };

    }

    private resolveValue (value: string | undefined, context: VariableContext): string | undefined {

        if (value == undefined) {
            return undefined;
        }

        return value.replace(/\$\{([^}]+)\}/g,  (_, variableName: string) => {
            
            const resolvedValue = context[variableName];

            if (resolvedValue === undefined) {

                throw new Error(`Variable "${variableName}" is not defined.`);

            }
            return resolvedValue;
        })
    }
}