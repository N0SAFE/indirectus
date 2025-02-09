import { describe, expect, it } from "vitest";
import { FunctionGenerator, FunctionParamGenerator, FunctionParamsGenerator } from "./function.generator";
import { GenericsTypeGenerator } from "../type/generic.generator";
import { MultiLineGenerator } from "../struct/arrangement.generator";

describe("FunctionGenerator", () => {
    describe("FunctionParamGenerator", () => {
        it("should generate a basic parameter", () => {
            const param = new FunctionParamGenerator({name: "foo"});
            expect(param.generate()).toBe("foo");
        });

        it("should generate a typed parameter", () => {
            const param = new FunctionParamGenerator({
                name: "foo",
                type: "string"
            });
            expect(param.generate()).toBe("foo: string");
        });

        it("should generate an optional parameter", () => {
            const param = new FunctionParamGenerator({
                name: "foo",
                optional: true
            });
            expect(param.generate()).toBe("foo?");
        });

        it("should generate a parameter with default value", () => {
            const param = new FunctionParamGenerator({
                name: "foo",
                defaultValue: "'bar'"
            });
            expect(param.generate()).toBe("foo = 'bar'");
        });
    });

    describe("FunctionParamsGenerator", () => {
        it("should generate multiple parameters", () => {
            const params = new FunctionParamsGenerator([
                {name: "foo", type: "string"},
                {name: "bar", type: "number", optional: true}
            ]);
            expect(params.generate()).toBe("foo: string, bar?: number");
        });
    });

    describe("FunctionGenerator", () => {
        it("should generate a basic function", () => {
            const fn = new FunctionGenerator({
                name: "test",
                params: [{name: "foo", type: "string"}],
                returnType: "void",
                body: "console.log(foo);"
            });
            expect(fn.generate()).toBe("function test(foo: string):void  {console.log(foo);}");
        });

        it("should generate an async arrow function", () => {
            const fn = new FunctionGenerator({
                isAsync: true,
                isArrow: true,
                params: [{name: "foo"}],
                returnType: "Promise<void>",
                body: "await foo();"
            });
            expect(fn.generate()).toBe("async  (foo):Promise<void> => {await foo();}");
        });

        it("should generate a generic function", () => {
            const fn = new FunctionGenerator({
                name: "map",
                generics: [{name: "T"}, {name: "U"}],
                params: [
                    {name: "arr", type: "T[]"},
                    {name: "fn", type: "(item: T) => U"}
                ],
                returnType: "U[]",
                body: "return arr.map(fn);"
            });
            expect(fn.generate()).toBe("function map<T, U>(arr: T[], fn: (item: T) => U):U[]  {return arr.map(fn);}");
        });

        it("should generate a generator function", () => {
            const fn = new FunctionGenerator({
                name: "range",
                isGenerator: true,
                params: [{name: "n", type: "number"}],
                returnType: "Generator<number>",
                body: "for(let i = 0; i < n; i++) yield i;"
            });
            expect(fn.generate()).toBe("function* range(n: number):Generator<number>  {for(let i = 0; i < n; i++) yield i;}");
        });
    });
});