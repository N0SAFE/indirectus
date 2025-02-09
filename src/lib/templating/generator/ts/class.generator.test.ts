import {
    ClassMethodGenerator,
    ClassConstructorParamGenerator,
    ClassPropertyGenerator,
    ClassGenerator,
    ClassConstructorGenerator,
} from "./class.generator";
import { describe, expect, it } from "vitest";

describe("ClassMethodGenerator", () => {
    it("should generate a basic method", () => {
        const method = ClassMethodGenerator.create({
            name: "test",
        });

        expect(method.generate()).toBe("test() {\n}");
    });

    it("should generate method with params", () => {
        const method = ClassMethodGenerator.create({
            name: "test",
            params: [{ name: "param1", type: "string" }],
        });

        expect(method.generate()).toBe("test(param1: string) {\n}");
    });

    it("should generate async method", () => {
        const method = ClassMethodGenerator.create({
            name: "test",
            isAsync: true,
        });

        expect(method.generate()).toBe("async test() {\n}");
    });
});

describe("ClassConstructorParamGenerator", () => {
    it("should generate constructor param with protection", () => {
        const param = ClassConstructorParamGenerator.create({
            name: "test",
            type: "string",
            protection: "private",
        });

        expect(param.generate()).toBe("private test: string");
    });
});

describe("ClassPropertyGenerator", () => {
    it("should generate class property", () => {
        const prop = ClassPropertyGenerator.create({
            name: "test",
            type: "string",
            protection: "private",
        });

        expect(prop.generate()).toBe("private test: string");
    });

    it("should generate optional property", () => {
        const prop = ClassPropertyGenerator.create({
            name: "test",
            type: "string",
            optional: true,
        });

        expect(prop.generate()).toBe("public test?: string");
    });
});

describe("ClassGenerator", () => {
    it("should generate empty class", () => {
        const cls = ClassGenerator.create("Test");
        expect(cls.generate()).toContain("class Test");
    });

    it("should generate class with properties", () => {
        const cls = ClassGenerator.create("Test", {
            properties: [
                {
                    name: "prop1",
                    type: "string",
                },
            ],
        });

        expect(cls.generate()).toContain("public prop1: string");
    });

    it("should generate class with methods", () => {
        const cls = ClassGenerator.create("Test", {
            methods: [
                {
                    name: "method1",
                    returnType: "void",
                },
            ],
        });

        expect(cls.generate()).toContain("method1(): void");
    });

    it("should generate class with generics", () => {
        const cls = ClassGenerator.create("Test", {
            generics: [
                {
                    name: "T",
                    extends: "string",
                },
            ],
        });

        expect(cls.generate()).toContain("class Test<T extends string>");
    });

    it("should generate class with extends", () => {
        const cls = ClassGenerator.create("Test", {
            extended: "BaseClass",
        });

        expect(cls.generate()).toContain("extends BaseClass");
    });

    it("should generate class with implements", () => {
        const cls = ClassGenerator.create("Test", {
            implemented: ["Interface1"],
        });

        expect(cls.generate()).toContain("implements Interface1");
    });

    it("should generate class with constructor", () => {
        const cls = ClassGenerator.create("Test", {
            construct: ClassConstructorGenerator.create({
                params: [
                    {
                        name: "param1",
                        type: "string",
                    }
                ],
                body: "this.param1 = param1;"
                
            })
        });

        const generated = cls.generate();
        // remove all double whitespaces or more and all newlines
        const gen = generated.replace(/\s{2,}/g, ' ').replace(/\n/g, '');
        expect(gen).toContain( `class Test { constructor(param1: string) {this.param1 = param1;undefined} }`);
        expect(generated).toContain("this.param1 = param1;");
    });

    it("should generate class with complex method", () => {
        const cls = ClassGenerator.create("Test", {
            methods: [
                {
                    name: "complexMethod",
                    isAsync: true,
                    returnType: "Promise<string>",
                    params: [
                        { name: "input", type: "number" }
                    ],
                    body: "return Promise.resolve(input.toString());"
                }
            ]
        });

        expect(cls.generate()).toContain("async complexMethod(input: number): Promise<string>");
    });

    it("should clone class correctly", () => {
        const original = ClassGenerator.create("Test", {
            properties: [{ name: "prop1", type: "string" }]
        });
        
        const cloned = original.clone();
        cloned.setName("TestClone");
        
        expect(original.getName()).toBe("Test");
        expect(cloned.getName()).toBe("TestClone");
    });

    it("should handle content property", () => {
        const cls = ClassGenerator.create("Test", {
            content: "// Custom content"
        });

        expect(cls.generate()).toContain("// Custom content");
    });

    it("should allow chaining of property additions", () => {
        const cls = ClassGenerator.create("Test")
            .addProperty({ name: "prop1", type: "string" })
            .addProperty({ name: "prop2", type: "number" })
            .addMethod({ name: "method1" });

        const generated = cls.generate();
        expect(generated).toContain("public prop1: string");
        expect(generated).toContain("public prop2: number");
        expect(generated).toContain("method1()");
    });

    it("should generate class with all protection levels", () => {
        const cls = ClassGenerator.create("Test", {
            properties: [
                { name: "public1", protection: "public", type: "string" },
                { name: "private1", protection: "private", type: "number" },
                { name: "protected1", protection: "protected", type: "boolean" }
            ]
        });

        const generated = cls.generate();
        expect(generated).toContain("public public1: string");
        expect(generated).toContain("private private1: number");
        expect(generated).toContain("protected protected1: boolean");
    });
});
