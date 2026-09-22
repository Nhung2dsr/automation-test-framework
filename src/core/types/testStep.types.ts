import { Keyword } from './keyword.types';

export interface TestStep {
    keyword: Keyword;
    target?: string;
    data?: string;
    expected?: string;
}