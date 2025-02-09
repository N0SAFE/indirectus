import { ExportGenerator } from './export.generator';
import { TemplateGenerator, TemplateStringGenerator } from '../utils';
import { describe, it, expect } from 'vitest';

describe('ExportGenerator', () => {
    describe('constructor', () => {
        it('should create instance with string content', () => {
            const generator = new ExportGenerator('const x = 5');
            expect(generator.generate()).toBe('export const x = 5');
        });

        it('should create instance with TemplateStringGenerator content', () => {
            const content = new class extends TemplateStringGenerator {
                clone(): this {
                    throw new Error('Method not implemented.');
                }
                getChildrenByIdentifier(identifier: string): TemplateGenerator[] {
                    throw new Error('Method not implemented.');
                }
                getAllChildren(): TemplateGenerator[] {
                    throw new Error('Method not implemented.');
                }
                generate() { return 'test'; }
            };
            const generator = new ExportGenerator(content);
            expect(generator.generate()).toBe('export test');
        });
    });

    describe('setContent', () => {
        it('should update content and return instance', () => {
            const generator = new ExportGenerator('const x = 5');
            const result = generator.setContent('const y = 10');
            expect(result.generate()).toBe('export const y = 10');
        });
    });

    describe('setDefault', () => {
        it('should update default flag and return instance', () => {
            const generator = new ExportGenerator('const x = 5');
            const result = generator.setDefault(true);
            expect(result.generate()).toBe('export default const x = 5');
        });
    });

    describe('clone', () => {
        it('should create new instance with same properties', () => {
            const original = new ExportGenerator('const x = 5', { default: true });
            const clone = original.clone();
            expect(clone.generate()).toBe(original.generate());
            expect(clone).not.toBe(original);
        });
    });

    describe('static methods', () => {
        it('create should return new instance', () => {
            const generator = ExportGenerator.create('const x = 5');
            expect(generator).toBeInstanceOf(ExportGenerator);
        });

        it('generate should return generated string', () => {
            const result = ExportGenerator.generate('const x = 5', { default: true });
            expect(result).toBe('export default const x = 5');
        });
    });
});