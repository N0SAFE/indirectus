import { describe, it, expect } from 'vitest';
import { ArrayTypeGenerator } from './array.generator';
import { TemplateTypescriptTypeDeclaratorGenerator } from './declarator.generator';
import { TemplateGenerator } from '../utils';

describe('ArrayTypeGenerator', () => {
    it('should create array with string content', () => {
        const array = ArrayTypeGenerator.create(['a', 'b', 'c']);
        expect(array.generate()).toBe('[a, b, c]');
    });

    it('should create empty array', () => {
        const array = ArrayTypeGenerator.create([]);
        expect(array.generate()).toBe('[]');
    });

    it('should set new content', () => {
        const array = ArrayTypeGenerator.create(['a', 'b']);
        array.setContent(['c', 'd']);
        expect(array.generate()).toBe('[c, d]');
    });

    it('should add new content', () => {
        const array = ArrayTypeGenerator.create(['a']);
        array.addContent('b');
        expect(array.generate()).toBe('[a, b]');
    });

    it('should clone array', () => {
        const array = ArrayTypeGenerator.create(['a', 'b']);
        const clone = array.clone();
        expect(clone.generate()).toBe('[a, b]');
        expect(clone).not.toBe(array);
    });

    it('should get children generators', () => {
        class ConcreteTypeDeclarator extends TemplateTypescriptTypeDeclaratorGenerator {
            clone(): this {
                throw new Error('Method not implemented.');
            }
            getChildrenByIdentifier(identifier: string): TemplateGenerator[] {
                throw new Error('Method not implemented.');
            }
            getAllChildren(): TemplateGenerator[] {
                throw new Error('Method not implemented.');
            }
            generate(): string {
                return 'Test';
            }
        }
        const declarator = new ConcreteTypeDeclarator();
        const array = ArrayTypeGenerator.create(['a', declarator, 'b']);
        const children = array.getAllChildren();
        expect(children).toHaveLength(1);
        expect(children[0]).toBe(declarator);
    });

    it('should generate array directly using static method', () => {
        const result = ArrayTypeGenerator.generate(['a', 'b']);
        expect(result).toBe('[a, b]');
    });
});