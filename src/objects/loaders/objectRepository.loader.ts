import { DataReader } from "../../data/readers/dataReader";

import { ObjectRepository } from "../types/locator.types";

import { validateObjectRepository } from "../validators/objectRepository.validator";

export class ObjectRepositoryLoader {

    constructor (private readonly reader: DataReader<unknown>) {}

    load(filePath: string): ObjectRepository {
        
        const data = this.reader.read(filePath);

        return validateObjectRepository(data);
    }
}