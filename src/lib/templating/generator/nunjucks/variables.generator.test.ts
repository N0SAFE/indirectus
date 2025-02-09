import { describe, it, expect } from 'vitest';
import { NunjucksVariableGenerator } from './variables.generator';

describe('NunjucksVariableGenerator', () => {
    it('should create variable template with name and value', () => {
        const variable = new NunjucksVariableGenerator('foo', 'bar');
        expect(variable.generate()).toBe('{% set foo = bar %}');
    });

    it('should allow changing name via setName', () => {
        const variable = new NunjucksVariableGenerator('foo', 'bar')
            .setName('baz');
        expect(variable.generate()).toBe('{% set baz = bar %}');
    });

    it('should allow changing value via setValue', () => {
        const variable = new NunjucksVariableGenerator('foo', 'bar')
            .setValue('qux');
        expect(variable.generate()).toBe('{% set foo = qux %}');
    });

    it('should create clone with same properties', () => {
        const original = new NunjucksVariableGenerator('foo', 'bar');
        const clone = original.clone();
        expect(clone.generate()).toBe(original.generate());
    });

    it('should create instance using static create method', () => {
        const variable = NunjucksVariableGenerator.create('foo', 'bar');
        expect(variable.generate()).toBe('{% set foo = bar %}');
    });

    it('should return empty array for getAllChildren', () => {
        const variable = new NunjucksVariableGenerator('foo', 'bar');
        expect(variable.getAllChildren()).toEqual([]);
    });
});