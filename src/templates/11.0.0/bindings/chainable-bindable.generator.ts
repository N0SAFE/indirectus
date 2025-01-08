import { NunjucksRendererGenerator } from "@/lib/templating/generator/nunjucks/renderer.generator";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import {
    ClassConstructorGenerator,
    ClassConstructorParamGenerator,
    ClassConstructorParamsGenerator,
    ClassGenerator,
    ClassMethodGenerator,
    ClassPropertyGenerator,
} from "@/lib/templating/generator/ts/class.generator";
import {
    ConditionGenerator,
    IfConditionGenerator,
} from "@/lib/templating/generator/ts/condition.generator";
import { VariableDeclaratorGenerator } from "@/lib/templating/generator/ts/declarator.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import {
    ImportGenerator,
    NamedImportGenerator,
} from "@/lib/templating/generator/ts/import.generator";
import {
    GenericsTypeGenerator,
    GenericTypeGenerator,
} from "@/lib/templating/generator/type/generic.generator";
import { Registry } from "@/types/registry";
import { TemplateContext, TemplateRenderer } from "@/types/template";

export default (
    registry: Registry,
    {
        ctx,
        renderer,
    }: {
        ctx: TemplateContext;
        renderer: TemplateRenderer;
    },
) =>
    IdentifierGenerator.create(
        "Bindings.Chainable",
        NunjucksRendererGenerator.create(
            FileGenerator.create([
                IdentifierGenerator.create(
                    "Bindings.Chainable.imports",
                    MultiLineGenerator.create([
                        ImportGenerator.create("../client", {
                            type: true,
                            named: [NamedImportGenerator.create("Schema")],
                        }),
                        ImportGenerator.create("@directus/sdk", {
                            type: true,
                            all: true,
                            as: "Directus",
                        }),
                        ImportGenerator.create("@directus/sdk", {
                            all: true,
                            as: "DirectusSDK",
                        }),
                    ]),
                ),
                IdentifierGenerator.create(
                    `Bindings.Chainable.exports`,
                    MultiLineGenerator.create([
                        IdentifierGenerator.create(
                            `Bindings.Chainable.exports.ChainableBinding`,
                            ExportGenerator.create(
                                ClassGenerator.create("ChainableBinding", {
                                    properties: [
                                        ClassPropertyGenerator.create({
                                            name: "chain",
                                            type: "Array<(lastRestCommand: Directus.RestCommand<unknown, Schema>) => Directus.RestCommand<unknown, Schema>>",
                                            protection: "private",
                                            defaultValue: "[]",
                                        }),
                                    ],
                                    content:
                                        "declare ['constructor']: typeof ChainableBinding;",
                                    constructor:
                                        ClassConstructorGenerator.create({
                                            params: ClassConstructorParamsGenerator.create(
                                                [
                                                    ClassConstructorParamGenerator.create(
                                                        {
                                                            name: "client",
                                                            type: "Directus.DirectusClient<Schema> & Directus.RestClient<Schema>",
                                                            protection:
                                                                "protected",
                                                        },
                                                    ),
                                                ],
                                            ),
                                        }),
                                    methods: [
                                        ClassMethodGenerator.create({
                                            isAsync: true,
                                            name: "request",
                                            generics:
                                                GenericsTypeGenerator.create([
                                                    GenericTypeGenerator.create(
                                                        {
                                                            name: "Output",
                                                        },
                                                    ),
                                                ]),
                                            params: FunctionParamsGenerator.create(
                                                [
                                                    FunctionParamGenerator.create(
                                                        {
                                                            name: "options",
                                                            type: "Directus.RestCommand<Output, Schema>",
                                                        },
                                                    ),
                                                ],
                                            ),

                                            body: MultiLineGenerator.create([
                                                VariableDeclaratorGenerator.create(
                                                    {
                                                        name: "recursiveConsumeChain",
                                                        value: FunctionGenerator.create(
                                                            {
                                                                isArrow: true,
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "chain",
                                                                                type: "typeof this.chain",
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "content",
                                                                                type: "Directus.RestCommand<Output, Schema>",
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                body: MultiLineGenerator.create(
                                                                    [
                                                                        ConditionGenerator.create(
                                                                            IfConditionGenerator.create(
                                                                                "chain.length === 0",
                                                                                "return content;",
                                                                            ),
                                                                        ),
                                                                        "const [head, ...tail] = chain;",
                                                                        "return recursiveConsumeChain(tail, head(content));",
                                                                    ],
                                                                ),
                                                            },
                                                        ),
                                                        keyword: "const",
                                                    },
                                                ),
                                                "return this.client.request(recursiveConsumeChain(this.chain, options)) as unknown as Promise<Output>;",
                                            ]),
                                        }),
                                        ClassMethodGenerator.create({
                                            name: "withOptions",
                                            params: FunctionParamsGenerator.create(
                                                [
                                                    FunctionParamGenerator.create(
                                                        {
                                                            name: "extraOptions",
                                                            type:
                                                                "Directus.RequestTransformer | Partial<RequestInit>",
                                                        },
                                                    ),
                                                ],
                                            ),
                                            body: MultiLineGenerator.create([
                                                VariableDeclaratorGenerator.create(
                                                    {
                                                        name: "newFunc",
                                                        value: FunctionGenerator.create(
                                                            {
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "last",
                                                                                type:
                                                                                    "Directus.RestCommand<unknown, Schema>",
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                body: MultiLineGenerator.create([
                                                                    "return DirectusSDK.withOptions(last, extraOptions);",
                                                                ]),
                                                            },
                                                        ),
                                                        keyword: "const",
                                                    },
                                                ),
                                                VariableDeclaratorGenerator.create(
                                                    {
                                                        name: "obj",
                                                        value: 'new this.constructor(this.client) as this;',
                                                        keyword: "const",
                                                    },
                                                ),
                                                "obj.chain = [...this.chain, newFunc];",
                                                "return obj;",
                                            ]),
                                        }),
                                        ClassMethodGenerator.create({
                                            name: "withToken",
                                            params: FunctionParamsGenerator.create(
                                                [
                                                    FunctionParamGenerator.create({
                                                        name: "token",
                                                        type: "string",
                                                    }),
                                                ],
                                            ),
                                            body: MultiLineGenerator.create([
                                                VariableDeclaratorGenerator.create({
                                                    name: "newFunc",
                                                    value: FunctionGenerator.create({
                                                        params: FunctionParamsGenerator.create([
                                                            FunctionParamGenerator.create({
                                                                name: "last",
                                                                type:
                                                                    "Directus.RestCommand<unknown, Schema>",
                                                            }),
                                                        ]),
                                                        body: MultiLineGenerator.create([
                                                            "return DirectusSDK.withToken(token, last);",
                                                        ]),
                                                    }),
                                                    keyword: "const",
                                                }),
                                                VariableDeclaratorGenerator.create({
                                                    name: "obj",
                                                    value: 'new this.constructor(this.client) as this;',
                                                    keyword: "const",
                                                }),
                                                "obj.chain = [...this.chain, newFunc];",
                                                "return obj;",
                                            ]),
                                        }),
                                        ClassMethodGenerator.create({
                                            name: "withSearch",
                                            body: MultiLineGenerator.create([
                                                VariableDeclaratorGenerator.create({
                                                    name: "newFunc",
                                                    value: FunctionGenerator.create({
                                                        params: FunctionParamsGenerator.create([
                                                            FunctionParamGenerator.create({
                                                                name: "last",
                                                                type:
                                                                    "Directus.RestCommand<unknown, Schema>",
                                                            }),
                                                        ]),
                                                        body: MultiLineGenerator.create([
                                                            "return DirectusSDK.withSearch(last);",
                                                        ]),
                                                    }),
                                                    keyword: "const",
                                                }),
                                                VariableDeclaratorGenerator.create({
                                                    name: "obj",
                                                    value: 'new this.constructor(this.client) as this;',
                                                    keyword: "const",
                                                }),
                                                "obj.chain = [...this.chain, newFunc];",
                                                "return obj;",
                                            ]),
                                        }),
                                        ClassMethodGenerator.create({
                                            name: "withCustom",
                                            params: FunctionParamsGenerator.create([
                                                FunctionParamGenerator.create({
                                                    name: "custom",
                                                    type:
                                                        "(last: Directus.RestCommand<unknown, Schema>) => Directus.RestCommand<unknown, Schema>",
                                                }),
                                            ]),
                                            body: MultiLineGenerator.create([
                                                VariableDeclaratorGenerator.create({
                                                    name: "obj",
                                                    value: 'new this.constructor(this.client) as this;',
                                                    keyword: "const",
                                                }),
                                                "obj.chain = [...this.chain, custom];",
                                                "return obj;",
                                            ]),
                                        }),
                                    ],
                                }),
                                { default: true },
                            ),
                        ),
                    ]),
                ),
            ]),
            renderer,
            ctx,
        ),
    );

// import type { Schema } from "../client";
// import type * as Directus from "@directus/sdk";
// import * as DirectusSDK from "@directus/sdk";

// export default class ChainableBinding {
//   private chain: ((
//     lastRestCommand: Directus.RestCommand<unknown, Schema>,
//   ) => Directus.RestCommand<unknown, Schema>)[] = [];

//   declare ['constructor']: typeof ChainableBinding;

//   constructor(
//     protected client: Directus.DirectusClient<Schema> &
//       Directus.RestClient<Schema>,
//   ) {}

//   async request<Output>(options: Directus.RestCommand<Output, Schema>) {
//     const recursiveConsumeChain = (
//       chain: typeof this.chain,
//       content: Directus.RestCommand<Output, Schema>,
//     ) => {
//       if (chain.length === 0) {
//         return content;
//       }
//       const [head, ...tail] = chain;
//       return recursiveConsumeChain(tail, head(content));
//     };
//     return this.client.request(
//       recursiveConsumeChain(this.chain, options),
//     ) as unknown as Promise<Output>;
//   }

//   withOptions(
//     extraOptions: Directus.RequestTransformer | Partial<RequestInit>,
//   ) {
//     const newFunc = (last: Directus.RestCommand<unknown, Schema>) => {
//       return DirectusSDK.withOptions(last, extraOptions);
//     };
//     const obj = new this.constructor(this.client) as this;
//     obj.chain = [...this.chain, newFunc];
//     return obj;
//   }

//   withToken(token: string) {
//     const newFunc = (last: Directus.RestCommand<unknown, Schema>) => {
//       return DirectusSDK.withToken(token, last);
//     };
//     const obj = new this.constructor(this.client) as this;
//     obj.chain = [...this.chain, newFunc];
//     return obj;
//   }

//   withSearch() {
//     const newFunc = (last: Directus.RestCommand<unknown, Schema>) => {
//       return DirectusSDK.withSearch(last);
//     };
//     const obj = new this.constructor(this.client) as this;
//     obj.chain = [...this.chain, newFunc];
//     return obj;
//   }

//   withCustom(
//     custom: (
//       last: Directus.RestCommand<unknown, Schema>,
//     ) => Directus.RestCommand<unknown, Schema>,
//   ) {
//     const obj = new this.constructor(this.client) as this;
//     obj.chain = [...this.chain, custom];
//     return obj;
//   }
// }
