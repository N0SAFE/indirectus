import { StringGenerator } from './string.generator';
import { describe, expect, it } from 'vitest';

describe('StringGenerator', () => {
    describe('constructor', () => {
        it('should create instance with default options', () => {
            const generator = new StringGenerator('test');
            expect(generator.generate()).toBe("'test'");
        });

        it('should create instance with custom quote', () => {
            const generator = new StringGenerator('test', { quote: 'double' });
            expect(generator.generate()).toBe('"test"');
        });

        it('should create instance with asConst', () => {
            const generator = new StringGenerator('test', { asConst: true });
            expect(generator.generate()).toBe("'test' as const");
        });
    });

    describe('setValue', () => {
        it('should update value and return instance', () => {
            const generator = new StringGenerator('test');
            const result = generator.setValue('new');
            expect(result.generate()).toBe("'new'");
            expect(result).toBe(generator);
        });
    });

    describe('setAsConst', () => {
        it('should update asConst and return instance', () => {
            const generator = new StringGenerator('test');
            const result = generator.setAsConst(true);
            expect(result.generate()).toBe("'test' as const");
            expect(result).toBe(generator);
        });
    });

    describe('setQuote', () => {
        it('should update quote and return instance', () => {
            const generator = new StringGenerator('test');
            expect(generator.setQuote('single').generate()).toBe("'test'");
            expect(generator.setQuote('double').generate()).toBe('"test"');
            expect(generator.setQuote('backtick').generate()).toBe('`test`');
        });
    });

    describe('clone', () => {
        it('should create new instance with same properties', () => {
            const original = new StringGenerator('test', { quote: 'double', asConst: true });
            const clone = original.clone();
            expect(clone.generate()).toBe(original.generate());
            expect(clone).not.toBe(original);
        });
    });

    describe('static methods', () => {
        it('create should return new instance', () => {
            const generator = StringGenerator.create('test');
            expect(generator).toBeInstanceOf(StringGenerator);
        });

        it('generate should return generated string', () => {
            const result = StringGenerator.generate('test', { quote: 'double', asConst: true });
            expect(result).toBe('"test" as const');
        });
    });

    describe('getAllChildren', () => {
        it('should return empty array', () => {
            const generator = new StringGenerator('test');
            expect(generator.getAllChildren()).toEqual([]);
        });
    });
});