import { describe, expect, it } from 'vitest';
import { FunctionTypeGenerator, FunctionTypeParamGenerator, FunctionTypeParamsGenerator } from './function.generator';

describe('FunctionTypeGenerator', () => {
    describe('FunctionTypeParamGenerator', () => {
        it('should generate a simple param', () => {
            const param = FunctionTypeParamGenerator.create({ name: 'test' });
            expect(param.generate()).toBe('test');
        });

        it('should generate a param with type', () => {
            const param = FunctionTypeParamGenerator.create({ name: 'test', type: 'string' });
            expect(param.generate()).toBe('test: string');
        });

        it('should generate an optional param', () => {
            const param = FunctionTypeParamGenerator.create({ name: 'test', optional: true });
            expect(param.generate()).toBe('test?');
        });
    });

    describe('FunctionTypeParamsGenerator', () => {
        it('should generate params list', () => {
            const params = FunctionTypeParamsGenerator.create([
                { name: 'a', type: 'string' },
                { name: 'b', type: 'number', optional: true }
            ]);
            expect(params.generate()).toBe('a: string, b?: number');
        });
    });

    describe('FunctionTypeGenerator', () => {
        it('should generate simple function type', () => {
            const func = FunctionTypeGenerator.create({
                params: [{ name: 'value', type: 'string' }],
                return: 'void'
            });
            expect(func.generate()).toBe('(value: string) => void');
        });

        it('should generate function type with generics', () => {
            const func = FunctionTypeGenerator.create({
                generics: [{ name: 'T' }],
                params: [{ name: 'value', type: 'T' }],
                return: 'T'
            });
            expect(func.generate()).toBe('<T>(value: T) => T');
        });

        it('should generate function type with constrained generic', () => {
            const func = FunctionTypeGenerator.create({
                generics: [{ name: 'T', extends: 'string' }],
                params: [{ name: 'value', type: 'T' }],
                return: 'T'
            });
            expect(func.generate()).toBe('<T extends string>(value: T) => T');
        });

        it('should handle clone method', () => {
            const func = FunctionTypeGenerator.create({
                params: [{ name: 'test', type: 'string' }],
                return: 'boolean'
            });
            const cloned = func.clone();
            expect(cloned.generate()).toBe(func.generate());
        });
    });
});