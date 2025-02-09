import { describe, it, expect } from 'vitest';
import { NunjucksBlockGenerator } from './block.generator';
import { TemplateGenerator } from '../utils';

describe('NunjucksBlockGenerator', () => {
    it('should create a block with string content', () => {
        const block = new NunjucksBlockGenerator('test', 'content');
        expect(block.generate()).toBe('{% block test %}content{% endblock %}');
    });

    it('should create a block with generator content', () => {
        class TestGenerator extends TemplateGenerator {
            generate() {
                return 'generated';
            }
            clone() {
                return new TestGenerator();
            }
        }
        const generator = new TestGenerator();
        const block = new NunjucksBlockGenerator('test', generator);
        expect(block.generate()).toBe('{% block test %}generated{% endblock %}');
    });

    it('should allow changing name via setName', () => {
        const block = new NunjucksBlockGenerator('test', 'content');
        const newBlock = block.setName('newTest');
        expect(newBlock.generate()).toBe('{% block newTest %}content{% endblock %}');
    });

    it('should allow changing content via setContent', () => {
        const block = new NunjucksBlockGenerator('test', 'content');
        const newBlock = block.setContent('newContent');
        expect(newBlock.generate()).toBe('{% block test %}newContent{% endblock %}');
    });

    it('should clone correctly with string content', () => {
        const block = new NunjucksBlockGenerator('test', 'content');
        const clone = block.clone();
        expect(clone.generate()).toBe(block.generate());
    });

    it('should clone correctly with generator content', () => {
        class TestGenerator extends TemplateGenerator {
            generate() {
                return 'generated';
            }
            clone() {
                return new TestGenerator();
            }
        }
        const block = new NunjucksBlockGenerator('test', new TestGenerator());
        const clone = block.clone();
        expect(clone.generate()).toBe(block.generate());
    });

    it('should return children when content is generator', () => {
        class TestGenerator extends TemplateGenerator {
            generate() {
                return 'generated';
            }
            clone() {
                return new TestGenerator();
            }
        }
        const generator = new TestGenerator();
        const block = new NunjucksBlockGenerator('test', generator);
        expect(block.getAllChildren()).toEqual([generator]);
    });

    it('should return empty array when content is string', () => {
        const block = new NunjucksBlockGenerator('test', 'content');
        expect(block.getAllChildren()).toEqual([]);
    });

    it('should create block using static create method', () => {
        const block = NunjucksBlockGenerator.create('test', 'content');
        expect(block.generate()).toBe('{% block test %}content{% endblock %}');
    });

    it('should create block using static generator method', () => {
        const block = NunjucksBlockGenerator.generator('test', 'content');
        expect(block.generate()).toBe('{% block test %}content{% endblock %}');
    });
});