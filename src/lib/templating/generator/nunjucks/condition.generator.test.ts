import { describe, it, expect } from 'vitest';
import { NunjucksConditionGenerator, NunjucksIfConditionGenerator, NunjucksElseIfConditionGenerator, NunjucksElseConditionGenerator } from './condition.generator';
import { ArrayGenerator } from '../ts/array.generator';
import { IdentifierGenerator } from '../struct/identifier.generate';

describe('NunjucksConditionGenerator', () => {
    it('should generate if condition', () => {
        const condition = NunjucksIfConditionGenerator.create('true', 'content', true);
        expect(condition.generate()).toBe('{% if true %}content{% endif %}');
    });

    it('should generate if-else condition', () => {
        const condition = NunjucksConditionGenerator.create({
            if: NunjucksIfConditionGenerator.create('condition1', 'content1'),
            else: NunjucksElseConditionGenerator.create('content2')
        });
        expect(condition.generate()).toBe('{% if condition1 %}content1{% else %}content2{% endif %}');
    });

    it('should generate if-elseif-else condition', () => {
        const condition = NunjucksConditionGenerator.create({
            if: NunjucksIfConditionGenerator.create('condition1', 'content1'),
            elseIf: [NunjucksElseIfConditionGenerator.create('condition2', 'content2')],
            else: NunjucksElseConditionGenerator.create('content3')
        });
        expect(condition.generate()).toBe('{% if condition1 %}content1{% elseif condition2 %}content2{% else %}content3{% endif %}');
    });

    it('should clone condition correctly', () => {
        const original = NunjucksConditionGenerator.create({
            if: NunjucksIfConditionGenerator.create('condition', 'content')
        });
        const clone = original.clone();
        expect(clone.generate()).toBe(original.generate());
        expect(clone).not.toBe(original);
    });

    it('should get children by identifier', () => {
        const condition = NunjucksConditionGenerator.create({
            if: NunjucksIfConditionGenerator.create(
                'true',
                IdentifierGenerator.create(
                    'test',
                    ArrayGenerator.create(['1', '2', '3'] as const)
                )
            )
        });
        const children = condition.getChildrenByIdentifier('test');
        expect(children).toHaveLength(1);
    });
});