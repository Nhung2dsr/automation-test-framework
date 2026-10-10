
import type {TestDataRow } from '../data/loaders/testDataLoader';

export interface DataDrivenCase {
    id: string;
    data: TestDataRow;
}

export function prepareDataDrivenCases(rows: TestDataRow[]): DataDrivenCase[] {
    if (rows.length === 0) {
        throw new Error('Test data must not be empty.');
    }

    const usedIds = new Set<string>();

    return rows.map((data, index) => {
        const id =
            typeof data.id === 'string' && data.id.trim()
                ? data.id.trim()
                : `ROW_${index + 1}`;

        if (usedIds.has(id)) {
            throw new Error(`Duplicate test data ID: ${id}`);
        }

        usedIds.add(id);

        return {id, data};
    });
}
