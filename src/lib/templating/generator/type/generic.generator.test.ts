import { describe, expect, it } from "vitest";
import { GenericTypeGenerator, GenericsTypeGenerator } from "./generic.generator";

describe("GenericTypeGenerator", () => {
    it("should generate a simple generic type", () => {
        const generic = new GenericTypeGenerator({ name: "T" });
        expect(generic.generate()).toBe("T");
    });

    it("should generate a generic type with extends", () => {
        const generic = new GenericTypeGenerator({ name: "T", extends: "string" });
        expect(generic.generate()).toBe("T extends string");
    });

    it("should generate a generic type with default value", () => {
        const generic = new GenericTypeGenerator({ name: "T", default: "string" });
        expect(generic.generate()).toBe("T = string");
    });

    it("should generate a const generic type", () => {
        const generic = new GenericTypeGenerator({ name: "T", asConst: true });
        expect(generic.generate()).toBe("const T");
    });

    it("should allow chaining setters", () => {
        const generic = new GenericTypeGenerator({ name: "T" })
            .setExtends("string")
            .setDefault("'hello'")
            .setAsConst(true);
        expect(generic.generate()).toBe("const T extends string = 'hello'");
    });
});

describe("GenericsTypeGenerator", () => {
    it("should generate empty string for no generics", () => {
        const generics = new GenericsTypeGenerator([]);
        expect(generics.generate()).toBe("");
    });

    it("should generate multiple generic types", () => {
        const generics = new GenericsTypeGenerator([
            { name: "T" },
            { name: "U", extends: "string" },
            { name: "V", default: "number" }
        ]);
        expect(generics.generate()).toBe("<T, U extends string, V = number>");
    });

    it("should work with mixed GenericTypeGenerator and TemplateGenericType", () => {
        const generics = new GenericsTypeGenerator([
            new GenericTypeGenerator({ name: "T" }),
            { name: "U", extends: "string" }
        ]);
        expect(generics.generate()).toBe("<T, U extends string>");
    });

    it("should allow adding generics dynamically", () => {
        const generics = new GenericsTypeGenerator([])
            .addGeneric({ name: "T" })
            .addGeneric({ name: "U", extends: "string" });
        expect(generics.generate()).toBe("<T, U extends string>");
    });
});