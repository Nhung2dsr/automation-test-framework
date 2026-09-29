import { LocatorDefinition, ObjectRepository } from './types/locator.types';

/**
 * Quản lý toàn bộ Object Repository được đăng ký trong framework.
 *
 * Target sử dụng format:
 * repository.object
 *
 * Ví dụ:
 * product.btnAddCart
 * product.email
 * product.successMessage
 */
export class ObjectRegistry {

    private readonly repositories: Record<string, ObjectRepository> = {};

    register(
        name: string,
        repository: ObjectRepository
    ): void {

        const repositoryName = name.trim();
        if (!repositoryName) {
            throw new Error ('Repository name is required.');
        }

        if (this.repositories[repositoryName]) {
            throw new Error (`Repository "${repositoryName}" is already registered.`);
        }

        this.repositories[repositoryName] = repository;
    }

    get(target: string): LocatorDefinition {

        const parts = target.split('.');

        if (parts.length !== 2) {
            throw new Error(`Invalid target "${target}". Expected format: repository.object`);
        }

        const repositoryName = parts[0];
        const objectName = parts[1];

        if (!repositoryName || !objectName) {
            throw new Error(`Invalid target "${target}". Expected format: repository.object`);
        }

        const repository = this.repositories[repositoryName];

        if (!repository) {
            throw new Error(`Repository "${repositoryName}" is not registered.`);
        }

        const definition = repository[objectName];

        if (!definition) {
            throw new Error(`Object "${objectName}" does not exist in repository "${repositoryName}".`);
        }

        return definition;
    }
    
}