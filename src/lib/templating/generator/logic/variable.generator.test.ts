import { TemplateGenerator, TemplateStringGenerator } from "../utils";
import { VariableDeclaratorGenerator } from "./variable.generator";
import { describe, it, expect } from "vitest";

describe("VariableDeclaratorGenerator", () => {
    it("should generate string content", () => {
        const variable = { name: "test" };
        const generator = VariableDeclaratorGenerator.create(variable, (v) => `Hello ${v.name}`);
        expect(generator.generate()).toBe("Hello test");
    });

    it("should generate array content", () => {
        const variable = { items: ["a", "b", "c"] };
        const generator = VariableDeclaratorGenerator.create(variable, (v) => v.items);
        expect(generator.generate()).toBe("abc");
    });

    it("should handle TemplateStringGenerator content", () => {
        const innerGenerator = new class extends TemplateStringGenerator {
            clone(): this {
                throw new Error("Method not implemented.");
            }
            getChildrenByIdentifier(identifier: string): TemplateGenerator[] {
                throw new Error("Method not implemented.");
            }
            getAllChildren(): TemplateGenerator[] {
                throw new Error("Method not implemented.");
            }
            generate(): string {
                return "test";
            }
        };
        const variable = { content: innerGenerator };
        const generator = VariableDeclaratorGenerator.create(variable, (v) => v.content);
        expect(generator.getAllChildren()).toEqual([innerGenerator]);
    });

    it("should set new content", () => {
        const generator = VariableDeclaratorGenerator.create({ old: "test" }, (v) => v.old);
        const newGenerator = generator.setContent({ new: "updated" }, (v) => v.new);
        expect(newGenerator.generate()).toBe("updated");
    });

    it("should set new callback", () => {
        const variable = { value: "test" };
        const generator = VariableDeclaratorGenerator.create(variable, (v) => v.value);
        const updated = generator.setCallback((v) => `Modified ${v.value}`);
        expect(updated.generate()).toBe("Modified test");
    });

    it("should clone correctly", () => {
        const variable = { count: 1 };
        const generator = VariableDeclaratorGenerator.create(variable, (v) => `Count: ${v.count}`);
        const clone = generator.clone();
        expect(clone.generate()).toBe("Count: 1");
        clone.getVariable().count = 2;
        expect(generator.generate()).toBe("Count: 1");
    });

    it("should get variable", () => {
        const variable = { test: "value" };
        const generator = VariableDeclaratorGenerator.create(variable, (v) => v.test);
        expect(generator.getVariable()).toEqual(variable);
    });

    it("should generate using static method", () => {
        const variable = { message: "Hello" };
        const result = VariableDeclaratorGenerator.generate(variable, (v) => v.message);
        expect(result).toBe("Hello");
    });
});