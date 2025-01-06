import { NunjucksRendererGenerator } from "@/lib/templating/generator/nunjucks/renderer.generator";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import {
    ClassGenerator,
    ClassMethodGenerator,
    ClassPropertyGenerator,
} from "@/lib/templating/generator/ts/class.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    ImportGenerator,
    NamedImportGenerator,
} from "@/lib/templating/generator/ts/import.generator";
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
