import { VariableDeclaratorGenerator } from "./declarator.generator";
import { TemplateTypescriptTypeDeclaratorGenerator } from "../type/declarator.generator";
import { TemplateStringGenerator } from "../utils";
import { describe, it, expect } from "vitest";

describe("VariableDeclaratorGenerator", () => {
    describe("constructor", () => {
        it("should create with default keyword", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value"
            });
            expect(generator.generate()).toBe("let test = value;");
        });

        it("should create with specified keyword", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value",
                keyword: "const"
            });
            expect(generator.generate()).toBe("const test = value;");
        });

        it("should create with type", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value",
                type: "string"
            });
            expect(generator.generate()).toBe("let test: string = value;");
        });
    });

    describe("setters", () => {
        it("should set name", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value"
            });
            generator.setName("newTest");
            expect(generator.generate()).toBe("let newTest = value;");
        });

        it("should set keyword", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value"
            });
            generator.setKeyword("const");
            expect(generator.generate()).toBe("const test = value;");
        });

        it("should set value", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value"
            });
            generator.setValue("newValue");
            expect(generator.generate()).toBe("let test = newValue;");
        });

        it("should set type", () => {
            const generator = new VariableDeclaratorGenerator({
                name: "test",
                value: "value"
            });
            generator.setType("string");
            expect(generator.generate()).toBe("let test: string = value;");
        });
    });

    describe("clone", () => {
        it("should clone generator", () => {
            const original = new VariableDeclaratorGenerator({
                name: "test",
                value: "value",
                keyword: "const",
                type: "string"
            });
            const clone = original.clone();
            expect(clone.generate()).toBe(original.generate());
        });
    });

    describe("static methods", () => {
        it("should create using static create method", () => {
            const generator = VariableDeclaratorGenerator.create({
                name: "test",
                value: "value"
            });
            expect(generator.generate()).toBe("let test = value;");
        });

        it("should generate using static generate method", () => {
            const result = VariableDeclaratorGenerator.generate({
                name: "test",
                value: "value",
                keyword: "const",
                type: "string"
            });
            expect(result).toBe("const test: string = value;");
        });
    });
});