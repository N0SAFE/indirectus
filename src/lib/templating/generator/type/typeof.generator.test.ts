import { describe, expect, it } from "vitest";
import { TypeofGenerator } from "./typeof.generator";
import { TemplateGenerator, TemplateStringGenerator } from "../utils";

describe("TypeofGenerator", () => {
    it("should generate typeof with string content", () => {
        const generator = new TypeofGenerator("string");
        expect(generator.generate()).toBe("typeof string");
    });

    it("should generate typeof with TemplateStringGenerator content", () => {
        class ConcreteTemplateStringGenerator extends TemplateStringGenerator {
            clone(): this {
                throw new Error("Method not implemented.");
            }
            getChildrenByIdentifier(identifier: string): TemplateGenerator[] {
                throw new Error("Method not implemented.");
            }
            getAllChildren(): TemplateGenerator[] {
                throw new Error("Method not implemented.");
            }
            generate(...args: unknown[]): string {
                return "test";
            }
        }
        const innerGenerator = new ConcreteTemplateStringGenerator();
        const generator = new TypeofGenerator(innerGenerator);
        expect(generator.generate()).toBe("typeof test");
    });

    it("should clone correctly", () => {
        const generator = new TypeofGenerator("original");
        const clone = generator.clone();
        expect(clone.generate()).toBe(generator.generate());
        expect(clone).not.toBe(generator);
    });

    it("should set new content", () => {
        const generator = new TypeofGenerator("original");
        const updated = generator.setContent("new");
        expect(updated.generate()).toBe("typeof new");
    });

    it("should return children correctly", () => {
        const stringGenerator = new TypeofGenerator("string");
        expect(stringGenerator.getAllChildren()).toEqual([]);

        const templateGenerator = new TemplateStringGenerator("test");
        const generatorWithTemplate = new TypeofGenerator(templateGenerator);
        expect(generatorWithTemplate.getAllChildren()).toEqual([
            templateGenerator,
        ]);
    });
});
