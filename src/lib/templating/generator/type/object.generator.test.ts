import { describe, expect, it } from 'vitest';
import { ObjectGenerator } from '../ts/object.generator';

describe('ObjectGenerator', () => {
    it('should create empty object', () => {
        const generator = ObjectGenerator.create({});
        expect(generator.generate()).toBe('{}');
    });

    it('should create object with primitive values', () => {
        const generator = ObjectGenerator.create({
            str: '"hello"',
            num: '42',
            bool: 'true'
        });
        expect(generator.generate()).toBe('{"str": "hello", "num": 42, "bool": true}');
    });

    it('should handle as const modifier', () => {
        const generator = ObjectGenerator.create({
            value: '"test"'
        }, { asConst: true });
        expect(generator.generate()).toBe('{"value": "test"} as const');
    });

    it('should clone correctly', () => {
        const original = ObjectGenerator.create({
            test: '"value"'
        }, { asConst: true });
        const clone = original.clone();
        expect(clone.generate()).toBe(original.generate());
    });

    it('should set new content', () => {
        const generator = ObjectGenerator.create({ old: '"value"' })
            .setContent({ new: '"updated"' });
        expect(generator.generate()).toBe('{"new": "updated"}');
    });

    it('should toggle asConst', () => {
        const generator = ObjectGenerator.create({ test: '"value"' })
            .setAsConst(true);
        expect(generator.generate()).toBe('{"test": "value"} as const');
    });

    it('should generate directly using static method', () => {
        const result = ObjectGenerator.generate({
            key: '"value"'
        });
        expect(result).toBe('{"key": "value"}');
    });
});