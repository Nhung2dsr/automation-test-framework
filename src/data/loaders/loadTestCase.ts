import { TestCase } from "../../core/types/testCase.types";
import { JsonReader } from "../readers/json.reader";
import { TestCaseLoader } from "./testCase.loader";

const loader = new TestCaseLoader(new JsonReader<unknown>);

export function LoadTestCase(filePath: string): TestCase [] {
    return loader.load(filePath);
}