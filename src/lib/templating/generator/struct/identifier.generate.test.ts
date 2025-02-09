import { describe, expect, it } from "vitest";
import { IdentifierGenerator } from "./identifier.generate";
import { ArrayGenerator } from "../ts/array.generator";

describe("IdentifierGenerator", () => {
    it("should get children by identifier", () => {
        const childOfIdentifier = ArrayGenerator.create(["1", "2", "3"]);
        const identifierGen = IdentifierGenerator.create(
            "test",
            childOfIdentifier,
        );
        const arrayGen = ArrayGenerator.create([identifierGen, "2", "3"]);

        const result = arrayGen.getChildrenByIdentifier("test");
        expect(result).toEqual([childOfIdentifier]);
    });

    it("should return empty array when identifier not found", () => {
        const arrayGen = ArrayGenerator.create(["1", "2", "3"]);
        const identifierGen = IdentifierGenerator.create("test", arrayGen);

        // @ts-expect-error Testing for non-existent identifier
        const result = identifierGen.getChildrenByIdentifier("nonexistent");
        expect(result).toEqual([[]]);
    });
    
    // it('should clone identifier generator correctly', () => {
    //     const childContent = ArrayGenerator.create(['1', '2', '3']);
    //     const original = IdentifierGenerator.create('test', childContent);
    //     const clone = original.clone();
        
    //     expect(clone).toMatchObject(original);
    //     expect(clone).not.toBe(original);
    // });

    it('should set new name correctly', () => {
        const content = ArrayGenerator.create(['1', '2', '3']); 
        const identifier = IdentifierGenerator.create('oldName', content);
        const renamed = identifier.setName('newName');
        
        expect(renamed.getChildrenByIdentifier('newName')).toEqual([content]);
    });

    it('should set new content correctly', () => {
        const oldContent = ArrayGenerator.create(['1', '2', '3']);
        const newContent = ArrayGenerator.create(['4', '5', '6']);
        const identifier = IdentifierGenerator.create('test', oldContent);
        
        const modified = identifier.setContent(newContent);
        expect(modified.generate()).toBe(newContent.generate());
    });

    it('should generate content correctly', () => {
        const content = ArrayGenerator.create(['1', '2', '3']);
        const identifier = IdentifierGenerator.create('test', content);
        
        expect(identifier.generate()).toBe(content.generate());
    });

    it('should create and generate in one step', () => {
        const content = ArrayGenerator.create(['1', '2', '3']);
        const result = IdentifierGenerator.generate('test', content);
        
        expect(result).toBe(content.generate());
    });
});
