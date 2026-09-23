import { LocatorDefinition, ObjectRepository } from '../types/locator.types';
import { productRepository } from '../repositories/product.repository';

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

    private readonly repositories: Record<string, ObjectRepository>;

    constructor() {
        this.repositories = {
            product: productRepository
        };
    }

    /**
     * Tìm LocatorDefinition dựa trên target.
     *
     * Ví dụ:
     * product.btnAddCart
     */
    get(target: string): LocatorDefinition {

        const [repositoryName, objectName] = target.split('.');

        if (!repositoryName || !objectName) {
            throw new Error(`Invalid target "${target}". Expected format: repository.object`);
        }

        const repository = this.repositories[repositoryName];

        if (!repository) {
            throw new Error(`Repository "${repositoryName}" is not registered.`);
        }

        const locatorDefinition = repository[objectName];

        if (!locatorDefinition) {
            throw new Error(`Object "${objectName}" does not exist in repository "${repositoryName}".`);
        }

        return locatorDefinition;
    }
}