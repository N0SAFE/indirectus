import { ObjectGenerator } from "./object.generator";
import { TemplateGenerator, TemplateStringGenerator } from "../utils";
import { describe, it, expect } from "vitest";

describe("ObjectGenerator", () => {
    describe("constructor", () => {
        it("should create instance with default values", () => {
            const generator = new ObjectGenerator({});
            expect(generator).toBeInstanceOf(ObjectGenerator);
            expect(generator.generate()).toBe("{}");
        });

        it("should create instance with asConst option", () => {
            const generator = new ObjectGenerator({}, { asConst: true });
            expect(generator.generate()).toBe("{} as const");
        });
    });

    describe("setContent", () => {
        it("should update content and return instance", () => {
            const generator = new ObjectGenerator({});
            const result = generator.setContent({ foo: "bar" });
            expect(result).toBe(generator);
            expect(result.generate()).toBe('{"foo": bar}');
        });
    });

    describe("setAsConst", () => {
        it("should update asConst flag and return instance", () => {
            const generator = new ObjectGenerator({});
            const result = generator.setAsConst(true);
            expect(result).toBe(generator);
            expect(result.generate()).toBe("{} as const");
        });
    });

    describe("generate", () => {
        it("should generate object literal string", () => {
            const generator = new ObjectGenerator({ 
                string: '"test"',
                number: 42,
                boolean: true 
            });
            expect(generator.generate()).toBe('{"string": "test", "number": 42, "boolean": true}');
        });
    });

    describe("clone", () => {
        it("should create new instance with same content", () => {
            const original = new ObjectGenerator({ test: "value" }, { asConst: true });
            const clone = original.clone();
            
            expect(clone).not.toBe(original);
            expect(clone.generate()).toBe(original.generate());
        });
    });

    describe("getAllChildren", () => {
        it("should return array of TemplateGenerator children", () => {
            const child = new TemplateStringGenerator();
            const generator = new ObjectGenerator({
                normal: "value",
                template: child
            });
            
            const children = generator.getAllChildren();
            expect(children).toHaveLength(1);
            expect(children[0]).toBe(child);
        });
    });

    describe("static create", () => {
        it("should return new ObjectGenerator instance", () => {
            const generator = ObjectGenerator.create({ test: "value" });
            expect(generator).toBeInstanceOf(ObjectGenerator);
        });
    });

    describe("static generate", () => {
        it("should return generated string directly", () => {
            const result = ObjectGenerator.generate({ test: "value" });
            expect(result).toBe('{"test": value}');
        });
    });
});