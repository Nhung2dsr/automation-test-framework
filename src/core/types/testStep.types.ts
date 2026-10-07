import { Keyword } from '../../keywords/types/keyword.types';

export interface TestStep {
    keyword: Keyword;
    target?: string;
    data?: string;
    expected?: string;
}