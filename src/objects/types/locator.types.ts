// Các cách tìm locator framework hỗ trợ
export type LocatorType =
  | 'css'
  | 'xpath'
  | 'testId'
  | 'text'
  | 'role'
  | 'label'
  | 'placeholder';

export interface LocatorDefinition {
  type: LocatorType;
  value: string;
  name?: string;
}

export type ObjectRepository = Record<string, LocatorDefinition>;