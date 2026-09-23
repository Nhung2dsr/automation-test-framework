import { Page, Locator} from '@playwright/test'
import { ObjectRegistry } from '../../objects/registry/objectRegistry'
import { ObjectResolver } from '../../objects/resolver/objectResolver'

import { clickAction } from '../actions/click.action';
import { inputAction } from '../actions/input.action';
import { selectAction } from '../actions/select.action';
import { waitAction } from '../actions/wait.action';

import { verifyText } from '../assertions/verifyText';
import { verifyURL } from '../assertions/verifyURL';
import { verifyVisible } from '../assertions/verifyVisible';

import { TestStep } from '../types/testStep.types';

export class KeywordEngine {
    private readonly registry: ObjectRegistry;
    private readonly resolver: ObjectResolver;

    constructor (private readonly page: Page){
        this.registry = new ObjectRegistry();
        this.resolver = new ObjectResolver(page);
    }

    private resolveTarget(target?: string): Locator {
        if (!target) {
            throw new Error('Target is required for this keyword');
        }

        const definition = this.registry.get(target);

        return this.resolver.resolve(definition);
    }

    async execute(step: TestStep){
        switch (step.keyword) {
            // CLICK
            case 'CLICK': {
                const locator = this.resolveTarget(step.target);

                await clickAction(locator);

                break;
            }
            // INPUT
            case 'INPUT': {
                const locator = this.resolveTarget(step.target);
                if (step.data == undefined){
                    throw new Error ('Data is required for INPUT keyword');
                }

                await inputAction(locator, step.data);
                break;
            }
            // SELECT
            case 'SELECT': {
                const locator = this.resolveTarget(step.target);
                if (step.data == undefined) {
                    throw new Error ('Data is required for SELECT keyword.');
                }
                await selectAction(locator, step.data);
                break;
            }
            // WAIT
            case 'WAIT': {
                const locator = this.resolveTarget(step.target);
                await waitAction(locator);
                break;
            }
            // VERIFY VISIBLE
            case 'VERIFY_VISIBLE': {
                const locator = this.resolveTarget(step.target);
                await verifyVisible(locator);
                break;
            }
            // VERIFY TEXT
            case 'VERIFY_TEXT': {
                const locator = this.resolveTarget(step.target);

                if(step.expected == undefined) {
                    throw new Error('Expected value is required for VERIFY TEXT keyword.');
                }
                await verifyText(locator, step.expected);
                break;
            }
            // VERIFY URL
            case 'VERIFY_URL': {
                if (step.expected == undefined){
                    throw new Error ('Expected value is required for VERIFY_URL keyword.');
                }

                await verifyURL(this.page, step.expected);
                break;
            }
            default:
                throw new Error(`Unsupported keyword: ${step.keyword}`);
        }
        
    }
}