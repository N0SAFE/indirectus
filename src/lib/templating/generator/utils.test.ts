import { wrapInBrackets, wrapInBraces, TemplateGenerator } from './utils';
import { describe, it, expect } from 'vitest';

describe('Utils', () => {
    describe('wrapInBrackets', () => {
        it('should wrap content in square brackets', () => {
            expect(wrapInBrackets('test')).toBe('[test]');
            expect(wrapInBrackets('123')).toBe('[123]');
            expect(wrapInBrackets('')).toBe('[]');
        });
    });

    describe('wrapInBraces', () => {
        it('should wrap content in curly braces', () => {
            expect(wrapInBraces('test')).toBe('{test}');
            expect(wrapInBraces('123')).toBe('{123}');
            expect(wrapInBraces('')).toBe('{}');
        });
    });

    describe('TemplateGenerator', () => {
        class TestGenerator extends TemplateGenerator {
            private children: TemplateGenerator[] = [];

            getAllChildren(): TemplateGenerator[] {
                return this.children;
            }

            addChild(child: TemplateGenerator): void {
                this.children.push(child);
            }

            generate(): string {
                return this.children.map(child => child.toString()).join('');
            }
            
            clone(): this {
                return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
            }

            getChildrenByIdentifier(): TemplateGenerator[] {
                return [];
            }
        }

        it('should be able to create a concrete implementation', () => {
            const generator = new TestGenerator();
            expect(generator).toBeInstanceOf(TemplateGenerator);
        });

        it('should be able to clone', () => {
            const generator = new TestGenerator();
            const clone = generator.clone();
            expect(clone).toBeInstanceOf(TestGenerator);
            expect(clone).not.toBe(generator);
        });
    });
});