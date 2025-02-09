import { LoopGenerator } from './loop.generator';
import { TemplateGenerator, TemplateStringGenerator } from '../utils';
import { describe, it, expect } from 'vitest';

describe('LoopGenerator', () => {
    describe('constructor', () => {
        it('should create instance with variables and callback', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            expect(generator).toBeInstanceOf(LoopGenerator);
            expect(generator.getVariable()).toEqual([1, 2, 3]);
        });
    });

    describe('setContent', () => {
        it('should create new instance with new content', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            const newGenerator = generator.setContent(['a', 'b'], (x) => x.toUpperCase());
            expect(newGenerator).toBeInstanceOf(LoopGenerator);
            expect(newGenerator.generate()).toEqual(['A', 'B']);
        });
    });

    describe('setCallback', () => {
        it('should update callback', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            const updated = generator.setCallback((x) => x * 3);
            expect(updated.generate()).toEqual([3, 6, 9]);
        });
    });

    describe('loop', () => {
        it('should map over variables with callback', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            expect(generator.loop()).toEqual([2, 4, 6]);
        });

        it('should support additional transform callback', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            expect(generator.loop(x => `${x}`)).toEqual(['2', '4', '6']);
        });
    });

    describe('generate', () => {
        it('should return mapped values', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            expect(generator.generate()).toEqual([2, 4, 6]);
        });
    });

    describe('clone', () => {
        it('should create copy with same properties', () => {
            const generator = new LoopGenerator([1, 2, 3], (x) => x * 2);
            const clone = generator.clone();
            expect(clone).toBeInstanceOf(LoopGenerator);
            expect(clone.generate()).toEqual([2, 4, 6]);
        });
    });

    describe('static methods', () => {
        describe('create', () => {
            it('should create new instance', () => {
                const generator = LoopGenerator.create([1, 2, 3], (x) => x * 2);
                expect(generator).toBeInstanceOf(LoopGenerator);
                expect(generator.generate()).toEqual([2, 4, 6]);
            });
        });

        describe('generate', () => {
            it('should create and generate in one step', () => {
                const result = LoopGenerator.generate([1, 2, 3], (x) => x * 2);
                expect(result).toEqual([2, 4, 6]);
            });
        });

        describe('toLoop', () => {
            it('should handle array input', () => {
                const generator = LoopGenerator.toLoop([1, 2, 3]);
                expect(generator).toBeInstanceOf(LoopGenerator);
                expect(generator.generate()).toEqual([1, 2, 3]);
            });

            it('should handle array with callback', () => {
                const generator = LoopGenerator.toLoop([1, 2, 3], (x) => x * 2);
                expect(generator.generate()).toEqual([2, 4, 6]);
            });

            it('should return same instance if LoopGenerator provided', () => {
                const original = new LoopGenerator([1, 2, 3], (x) => x * 2);
                const result = LoopGenerator.toLoop(original);
                expect(result).toBe(original);
            });
        });
    });
});