import { Registry } from "@/types/registry";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { NunjucksRendererGenerator } from "@/lib/templating/generator/nunjucks/renderer.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import {
    ImportGenerator,
    NamedImportGenerator,
} from "@/lib/templating/generator/ts/import.generator";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import { InterfaceDeclaratorGenerator } from "@/lib/templating/generator/type/declarator.generator";
import {
    GenericsTypeGenerator,
    GenericTypeGenerator,
} from "@/lib/templating/generator/type/generic.generator";
import { FunctionTypeGenerator } from "@/lib/templating/generator/type/function.generator";

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
        `Commands.Item.Types`,
        NunjucksRendererGenerator.create(
            FileGenerator.create([
                IdentifierGenerator.create(
                    `Commands.Item.Types.imports`,
                    MultiLineGenerator.create([
                        ImportGenerator.create("@directus/sdk", {
                            type: true,
                            all: true,
                            as: "Directus",
                        }),
                        ImportGenerator.create("@directus/sdk", {
                            type: true,
                            all: true,
                            as: "DirectusSDK",
                        }),
                        ImportGenerator.create("../../types/ApplyQueryFields", {
                            type: true,
                            named: [
                                NamedImportGenerator.create("ApplyQueryFields"),
                            ],
                        }),
                        ImportGenerator.create("../../client", {
                            type: true,
                            named: [NamedImportGenerator.create("Schema")],
                        }),
                    ]),
                ),
                IdentifierGenerator.create(
                    `Bindings.Item.Types.TypedCollectionSingletonWrapper`,
                    ExportGenerator.create(
                        InterfaceDeclaratorGenerator.create({
                            name: "TypedCollectionSingletonWrapper",
                            generics: GenericsTypeGenerator.create([
                                GenericTypeGenerator.create({
                                    name: "Collection",
                                    extends: "object",
                                }),
                            ]),
                            content: {
                                read: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                update: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "patch",
                                            type: "Partial<Collection>",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                            },
                        }),
                    ),
                ),
                IdentifierGenerator.create(
                    `Bindings.Item.Types.TypedCollectionItemsWrapper`,
                    ExportGenerator.create(
                        InterfaceDeclaratorGenerator.create({
                            name: "TypedCollectionItemsWrapper",
                            generics: GenericsTypeGenerator.create([
                                GenericTypeGenerator.create({
                                    name: "Collection",
                                    extends: "object",
                                }),
                                GenericTypeGenerator.create({
                                    name: "CollectionName",
                                    extends: "Directus.AllCollections<Schema>",
                                }),
                            ]),
                            content: {
                                create: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection[]>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>[]",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "items",
                                            type: "Partial<Collection>[]",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                query: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>[]",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                find: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output | undefined>",
                                }),
                                update: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection[]>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>[]",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "keys",
                                            type: "string[] | number[]",
                                        },
                                        {
                                            name: "patch",
                                            type: "Partial<Collection>",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                // ! to add
                                // update<
                                //     const Query extends DirectusSDK.Query<Schema, Collection[]>,
                                //     const OutputQuery extends DirectusSDK.Query<Schema, Collection[]>,
                                //     Output = ApplyQueryFields<Schema, Collection, OutputQuery['fields']>[],
                                // >(
                                //     query: Query,
                                //     patch: Partial<Collection>,
                                //     outputQuery?: OutputQuery
                                // ): Promise<Output>
                                updateBatch: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "Directus.Query<Schema, Collection[]>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>[]",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "items",
                                            type: "Partial<Directus.UnpackList<Collection>>[]",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                remove: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([]),
                                    params: [
                                        {
                                            name: "keys",
                                            type: "string[] | number[]",
                                        },
                                    ],
                                    return: "Promise<void>",
                                }),
                                // ! to add
                                // remove<Output = void>(
                                //     query: DirectusSDK.Query<Schema, Collection[]>
                                // ): Promise<Output>
                                aggregate: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Options",
                                            extends:
                                                "Directus.AggregationOptions<Schema, CollectionName>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "Directus.AggregationOutput<Schema, CollectionName, Options>[number]",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "options",
                                            type: "Options",
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                            },
                        }),
                    ),
                ),
                IdentifierGenerator.create(
                    `Bindings.Item.Types.TypedCollectionItemWrapper`,
                    ExportGenerator.create(
                        InterfaceDeclaratorGenerator.create({
                            name: "TypedCollectionItemWrapper",
                            generics: GenericsTypeGenerator.create([
                                GenericTypeGenerator.create({
                                    name: "Collection",
                                    extends: "object",
                                }),
                            ]),
                            content: {
                                create: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection[]>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection[], Query['fields']>",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "item",
                                            type: "Partial<Collection>",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                get: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection, Query['fields']>",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "key",
                                            type: "string | number",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                update: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends:
                                                "DirectusSDK.Query<Schema, Collection[]>",
                                        }),
                                        GenericTypeGenerator.create({
                                            name: "Output",
                                            extends:
                                                "ApplyQueryFields<Schema, Collection[], Query['fields']>",
                                        }),
                                    ]),
                                    params: [
                                        {
                                            name: "key",
                                            type: "string | number",
                                        },
                                        {
                                            name: "patch",
                                            type: "Partial<Collection>",
                                        },
                                        {
                                            name: "query",
                                            type: "Query",
                                            optional: true,
                                        },
                                    ],
                                    return: "Promise<Output>",
                                }),
                                remove: FunctionTypeGenerator.create({
                                    generics: GenericsTypeGenerator.create([]),
                                    params: [
                                        {
                                            name: "key",
                                            type: "string | number",
                                        },
                                    ],
                                    return: "Promise<void>",
                                }),
                            },
                        }),
                    ),
                ),
            ]),
            renderer,
            ctx,
        ),
    );

// import type * as Directus from "@directus/sdk";

// import type * as DirectusSDK from "@directus/sdk";

// import type { ApplyQueryFields } from "../../types/ApplyQueryFields";

// import type { Schema } from "../../client";

// export interface TypedCollectionSingletonWrapper<Collection extends object> {
//     /**
//      * Reads the singleton.
//      */
//     read: <
//         const Query extends DirectusSDK.Query<Schema, Collection>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
//     >(
//         query?: Query,
//     ) => Promise<Output>;

//     /**
//      * Updates the singleton.
//      */
//     update<
//         const Query extends DirectusSDK.Query<Schema, Collection>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
//     >(
//         patch: Partial<Collection>,
//         query?: Query,
//     ): Promise<Output>;
// }

// export interface TypedCollectionItemsWrapper<
//     Collection extends object,
//     CollectionName extends Directus.AllCollections<Schema>,
// > {
//     /**
//      * Creates many items in the collection.
//      */
//     create<
//         const Query extends DirectusSDK.Query<Schema, Collection[]>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
//     >(
//         items: Partial<Collection>[],
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * Read many items from the collection.
//      */
//     query<
//         const Query extends DirectusSDK.Query<Schema, Collection>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
//     >(
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * Read the first item from the collection matching the query.
//      */
//     find<
//         const Query extends DirectusSDK.Query<Schema, Collection>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
//     >(
//         query?: Query,
//     ): Promise<Output | undefined>;

//     /**
//      * Update many items in the collection.
//      */
//     update<
//         const Query extends DirectusSDK.Query<Schema, Collection[]>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
//     >(
//         keys: string[] | number[],
//         patch: Partial<Collection>,
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * update many items with batch
//      */
//     updateBatch<
//         const Query extends Directus.Query<Schema, Collection[]>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
//     >(
//         items: Partial<Directus.UnpackList<Collection>>[],
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * Remove many items in the collection.
//      */
//     remove<Output = void>(keys: string[] | number[]): Promise<Output>;

//     /**
//      * Aggregates items in the collection.
//      */
//     aggregate<
//         Options extends Directus.AggregationOptions<Schema, CollectionName>,
//         Output = Directus.AggregationOutput<
//             Schema,
//             CollectionName,
//             Options
//         >[number],
//     >(
//         options: Options,
//     ): Promise<Output>;
// }

// export interface TypedCollectionItemWrapper<Collection extends object> {
//     /**
//      * Create a single item in the collection.
//      */
//     create<
//         const Query extends DirectusSDK.Query<Schema, Collection[]>,
//         Output = ApplyQueryFields<Schema, Collection[], Query["fields"]>,
//     >(
//         item: Partial<Collection>,
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * Read a single item from the collection.
//      */
//     get<
//         const Query extends DirectusSDK.Query<Schema, Collection>,
//         Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
//     >(
//         key: string | number,
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * Update a single item from the collection.
//      */
//     update<
//         const Query extends DirectusSDK.Query<Schema, Collection[]>,
//         Output = ApplyQueryFields<Schema, Collection[], Query["fields"]>,
//     >(
//         key: string | number,
//         patch: Partial<Collection>,
//         query?: Query,
//     ): Promise<Output>;

//     /**
//      * Remove many items in the collection.
//      */
//     remove<Output = void>(key: string | number): Promise<Output>;
// }
