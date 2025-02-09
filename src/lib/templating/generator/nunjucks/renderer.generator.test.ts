import { describe, it, expect, vi } from 'vitest';
import { NunjucksRendererGenerator } from './renderer.generator';
import { TemplateStringGenerator } from '../utils';
import { TemplateRenderer } from '../../../../types/template';

describe('NunjucksRendererGenerator', () => {
    const mockContent = {
        generate: vi.fn().mockReturnValue('template content'),
        clone: vi.fn().mockReturnValue({ generate: vi.fn() })
    } as unknown as TemplateStringGenerator;

    const mockRenderer = {
        fromString: vi.fn().mockReturnValue('rendered content')
    } as unknown as TemplateRenderer;

    const context = { foo: 'bar' };

    it('should create instance with static create method', () => {
        const generator = NunjucksRendererGenerator.create(mockContent, mockRenderer, context);
        expect(generator).toBeInstanceOf(NunjucksRendererGenerator);
    });

    it('should generate content with context', () => {
        const generator = new NunjucksRendererGenerator(mockContent, mockRenderer, context);
        const result = generator.generate();
        
        expect(mockContent.generate).toHaveBeenCalled();
        expect(mockRenderer.fromString).toHaveBeenCalledWith('template content', context);
        expect(result).toBe('rendered content');
    });

    it('should set new context', () => {
        const generator = new NunjucksRendererGenerator(mockContent, mockRenderer);
        const newContext = { baz: 'qux' };
        const result = generator.setContext(newContext);

        expect(result).toBeInstanceOf(NunjucksRendererGenerator);
        expect(result.generate()).toBe('rendered content');
    });

    it('should set new content', () => {
        const generator = new NunjucksRendererGenerator(mockContent, mockRenderer);
        const newContent = { ...mockContent } as unknown as typeof mockContent;
        const result = generator.setContent(newContent);

        expect(result).toBeInstanceOf(NunjucksRendererGenerator);
        expect(result.generate()).toBe('rendered content');
    });

    it('should set new renderer', () => {
        const generator = new NunjucksRendererGenerator(mockContent, mockRenderer);
        const newRenderer = { ...mockRenderer };
        const result = generator.setRenderer(newRenderer);

        expect(result).toBeInstanceOf(NunjucksRendererGenerator);
        expect(result.generate()).toBe('rendered content');
    });

    it('should clone generator', () => {
        const generator = new NunjucksRendererGenerator(mockContent, mockRenderer);
        const clone = generator.clone();

        expect(clone).toBeInstanceOf(NunjucksRendererGenerator);
        expect(mockContent.clone).toHaveBeenCalled();
    });

    it('should generate with static generate method', () => {
        const result = NunjucksRendererGenerator.generate(mockContent, mockRenderer, context);
        
        expect(mockContent.generate).toHaveBeenCalled();
        expect(mockRenderer.fromString).toHaveBeenCalledWith('template content', context);
        expect(result).toBe('rendered content');
    });
});