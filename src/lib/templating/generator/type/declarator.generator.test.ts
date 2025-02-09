import { describe, expect, it } from "vitest";
import {
    InterfaceDeclaratorGenerator,
    TypeDeclaratorGenerator,
    EnumDeclaratorGenerator,
    NamespaceDeclaratorGenerator,
    ModuleDeclaratorGenerator,
    TemplateTypescriptTypeDeclaratorGenerator,
} from "./declarator.generator";

describe("InterfaceDeclaratorGenerator", () => {
    it("should generate a basic interface", () => {
        const result = InterfaceDeclaratorGenerator.generate({
            name: "Test",
            content: {
                prop: "string",
                num: "number",
            },
        });
        expect(result).toBe("interface Test {prop: string,\nnum: number}");
    });

    it("should generate interface with extends", () => {
        const result = InterfaceDeclaratorGenerator.generate({
            name: "Child",
            content: { newProp: "boolean" },
            extend: "Parent",
        });
        expect(result).toBe(
            "interface Child extends Parent {newProp: boolean}",
        );
    });
});

describe("TypeDeclaratorGenerator", () => {
    it("should generate a basic type alias", () => {
        const result = TypeDeclaratorGenerator.generate({
            name: "StringOrNumber",
            content: "string | number",
        });
        expect(result).toBe("type StringOrNumber = string | number");
    });
});

describe("EnumDeclaratorGenerator", () => {
    it("should generate an enum", () => {
        const result = EnumDeclaratorGenerator.generate({
            name: "Direction",
            content: ["North", "South", "East", "West"],
        });
        expect(result).toBe("enum Direction {North,\nSouth,\nEast,\nWest}");
    });
});

describe("NamespaceDeclaratorGenerator", () => {
    it("should generate a namespace", () => {
        const result = NamespaceDeclaratorGenerator.generate({
            name: "Utils",
            content: [['type Test = string;']],
        });
        expect(result).toBe("namespace Utils {type Test = string;}");
    });
});

describe("ModuleDeclaratorGenerator", () => {
    it("should generate a module", () => {
        const result = ModuleDeclaratorGenerator.generate({
            name: '"my-module"',
            content: ["export type MyType = string;"],
        });
        expect(result).toBe(
            'module "my-module" {export type MyType = string;}',
        );
    });
});
