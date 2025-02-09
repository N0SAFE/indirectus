import { describe, expect, it } from "vitest";
import { ImportGenerator, NamedImportGenerator } from "./import.generator";

describe("ImportGenerator", () => {
    it("should generate default import", () => {
        const importGen = ImportGenerator.create("myModule", {
            default: "MyDefault"
        });
        expect(importGen.generate()).toBe('import MyDefault from "myModule"');
    });

    it("should generate named imports", () => {
        const importGen = ImportGenerator.create("myModule", {
            named: [
                { name: "namedExport" },
                { name: "anotherExport", as: "aliased" }
            ]
        });
        expect(importGen.generate()).toBe('import {namedExport, anotherExport as aliased} from "myModule"');
    });

    it("should generate type imports", () => {
        const importGen = ImportGenerator.create("myTypes", {
            type: true,
            named: [{ name: "MyType" }]
        });
        expect(importGen.generate()).toBe('import type {MyType} from "myTypes"');
    });

    it("should generate namespace imports", () => {
        const importGen = ImportGenerator.create("myNamespace", {
            all: true,
            as: "ns"
        });
        expect(importGen.generate()).toBe('import * as ns from "myNamespace"');
    });

    it("should clone imports correctly", () => {
        const original = ImportGenerator.create("myModule", {
            default: "Default",
            named: [{ name: "named" }]
        });
        const cloned = original.clone();
        expect(cloned.generate()).toBe(original.generate());
    });
});

describe("NamedImportGenerator", () => {
    it("should generate named import", () => {
        const namedImport = NamedImportGenerator.create("exportName");
        expect(namedImport.generate()).toBe("exportName");
    });

    it("should generate aliased import", () => {
        const namedImport = NamedImportGenerator.create("exportName", {
            as: "aliasName"
        });
        expect(namedImport.generate()).toBe("exportName as aliasName");
    });

    it("should allow changing name", () => {
        const namedImport = NamedImportGenerator.create("original")
            .setName("changed");
        expect(namedImport.generate()).toBe("changed");
    });

    it("should allow changing alias", () => {
        const namedImport = NamedImportGenerator.create("exportName")
            .setAs("newAlias");
        expect(namedImport.generate()).toBe("exportName as newAlias");
    });
});