import fs from 'fs';
import path from 'path';

import { JsonReader } from '../../data/readers/json.reader';
import { ObjectRegistry } from '../objectRegistry';
import { ObjectRepositoryLoader } from './objectRepository.loader';

export function registerObjectRepositories(registry: ObjectRegistry, directoryPath: string): void {
    const absolutePath = path.resolve(process.cwd(), directoryPath);

    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Object repository directory not found: ${absolutePath}`);
    }

    const files: string[] = fs.readdirSync(absolutePath, { encoding: 'utf-8'}).filter((file: string) => file.toLowerCase().endsWith('.json')).sort();

    if (files.length === 0) {
        throw new Error( `No JSON object repositories found in: ${absolutePath}`);
    }

    const loader = new ObjectRepositoryLoader(new JsonReader<unknown>());

    for (const file of files) {
        const repositoryName = path.parse(file).name;

        const filePath = path.join(absolutePath, file);

        const repository = loader.load(filePath);

        registry.register(repositoryName, repository);
    }
}