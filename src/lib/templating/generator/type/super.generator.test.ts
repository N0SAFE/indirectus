import { describe, it, expect } from 'vitest';
import { TemplateTypescriptTypeGenerator } from './super.generator';

describe('TemplateTypescriptTypeGenerator', () => {
    it('should extend TemplateStringGenerator', () => {
        expect(TemplateTypescriptTypeGenerator.prototype).toBeInstanceOf(Object);
    });
});