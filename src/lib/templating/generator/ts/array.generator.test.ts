import { ArrayGenerator } from './array.generator';
import { describe, it, expect } from 'vitest';

describe('ArrayGenerator', () => {
    describe('constructor', () => {
        it('should create array generator with default options', () => {
            const generator = new ArrayGenerator(['a', 'b', 'c']);
            expect(generator.generate()).toBe('[a, b, c]');
        });

        it('should create array generator with asConst option', () => {
            const generator = new ArrayGenerator(['a', 'b', 'c'], { asConst: true });
            expect(generator.generate()).toBe('[a, b, c] as const');
        });
    });

    describe('setContent', () => {
        it('should set new content', () => {
            const generator = new ArrayGenerator(['a']);
            generator.setContent(['b', 'c']);
            expect(generator.generate()).toBe('[b, c]');
        });
    });

    describe('addContent', () => {
        it('should add content to existing array', () => {
            const generator = new ArrayGenerator(['a']);
            generator.addContent('b');
            expect(generator.generate()).toBe('[a, b]');
        });
    });

    describe('setAsConst', () => {
        it('should set asConst flag', () => {
            const generator = new ArrayGenerator(['a']);
            generator.setAsConst(true);
            expect(generator.generate()).toBe('[a] as const');
        });
    });

    describe('clone', () => {
        it('should create deep copy', () => {
            const original = new ArrayGenerator(['a', 'b'], { asConst: true });
            const clone = original.clone();
            expect(clone.generate()).toBe(original.generate());
            expect(clone).not.toBe(original);
        });
    });

    describe('getAllChildren', () => {
        it('should return only TemplateGenerator instances', () => {
            const child = new ArrayGenerator(['x']);
            const generator = new ArrayGenerator(['a', child, 'b']);
            expect(generator.getAllChildren()).toEqual([child]);
        });
    });

    describe('static create', () => {
        it('should create new instance', () => {
            const generator = ArrayGenerator.create(['a', 'b']);
            expect(generator).toBeInstanceOf(ArrayGenerator);
            expect(generator.generate()).toBe('[a, b]');
        });
    });

    describe('static generate', () => {
        it('should create and generate in one step', () => {
            const result = ArrayGenerator.generate(['a', 'b'], { asConst: true });
            expect(result).toBe('[a, b] as const');
        });
    });
});