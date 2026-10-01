import { LocatorDefinition, LocatorType, ObjectRepository } from "../types/locator.types";

const VALID_LOCATOR_TYPES: LocatorType[] = [
    'css',
    'xpath',
    'testId',
    'text',
    'role',
    'label',
    'placeholder',
];

function validateLocatorDefinition (objectName: string, data: unknown): LocatorDefinition {

    if (typeof data !== 'object' || data == null){
        
        throw new Error(`Invalid object "${objectName}": locator definition must be an object.`);

    }

    const definition = data as Record<string, unknown>;

    if (typeof definition.type !== 'string' || !VALID_LOCATOR_TYPES.includes(definition.type as LocatorType)){

        throw new Error (`Invalid object "${objectName}": unsupported locator type "${definition.type}"`);

    }

    if (typeof definition.value !== 'string' || definition.value.trim() == '') {

        throw new Error (`Invalid object "${objectName}": locator value is required.`);

    }

    if (definition.name !== undefined && typeof definition.name !== 'string'){

        throw new Error (`Invalid object "${objectName}": name must be a string.`);

    }

    return {
        type: definition.type as LocatorType,
        value: definition.value,
        name: typeof definition.name == 'string' ? definition.name : undefined,
    };
}

export function validateObjectRepository(data: unknown): ObjectRepository{

    if (typeof data !== 'object' || data == null || Array.isArray(data)) {

        throw new Error (`Invalid object repository: repository must be an object.`);

    }

    const repositoryData = data as Record<string, unknown>;

    const repository: ObjectRepository = {};

    for( const [objectName, definition] of Object.entries(repositoryData)){

        if (objectName.trim() == '') {

            throw new Error (`Invalid object repository: object name is required.`);

        }

        repository[objectName] = validateLocatorDefinition(objectName, definition);

    }

    return repository;

}

