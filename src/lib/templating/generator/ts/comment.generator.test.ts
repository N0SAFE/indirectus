import { CommentGenerator } from './comment.generator';
import { describe, expect, it } from 'vitest';

describe('CommentGenerator', () => {
    const removeStartLineBlankSpace = (str: string) => str.replace(/^\s+/gm, '');
    describe('generate()', () => {
        it('should generate empty string when no content and no force options', () => {
            expect(removeStartLineBlankSpace(CommentGenerator.generate([]))).toBe('');
        });

        it('should generate single line comment for single content', () => {
            expect(removeStartLineBlankSpace(CommentGenerator.generate(['test']))).toBe('// test');
        });

        it('should generate multiline comment for multiple contents', () => {
            expect(removeStartLineBlankSpace(CommentGenerator.generate(['line1', 'line2'])))
            .toBe('/**\n* line1\n*  * line2\n*/');
        });

        it('should generate empty comment when forceComment is true', () => {
            expect(removeStartLineBlankSpace(CommentGenerator.generate([], { forceComment: true })))
            .toBe('//');
        });

        it('should generate empty multiline comment when both force options are true', () => {
            expect(removeStartLineBlankSpace(CommentGenerator.generate([], { 
            forceComment: true,
            forceMultiline: true 
            }))).toBe('/** */');
        });
    });

    describe('instance methods', () => {
        it('should allow chaining content modifications', () => {
            const comment = new CommentGenerator()
                .addContent('first')
                .addContent('second')
                .setForceMultiline(true);
            expect(removeStartLineBlankSpace(comment.generate()))
                .toBe('/**\n* first\n*  * second\n*/');
        });

        it('should clone correctly', () => {
            const original = new CommentGenerator(['test'], {
                forceMultiline: true
            });
            const clone = original.clone();
            expect(removeStartLineBlankSpace(clone.generate())).toBe('/**\n* test\n*/');
        });

        it('should allow setting new contents', () => {
            const comment = new CommentGenerator(['old'])
                .setContents(['new']);
            expect(removeStartLineBlankSpace(comment.generate())).toBe('// new');
        });

        it('should return empty array for getAllChildren', () => {
            const comment = new CommentGenerator();
            expect(comment.getAllChildren()).toEqual([]);
        });
    });
});