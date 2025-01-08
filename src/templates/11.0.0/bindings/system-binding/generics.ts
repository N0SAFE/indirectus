import { LoopGenerator } from "@/lib/templating/generator/logic/loop.generator";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { ClassMethodGenerator } from "@/lib/templating/generator/ts/class.generator";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamsGenerator,
    FunctionParamGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import {
    ImportGenerator,
    NamedImportGenerator,
} from "@/lib/templating/generator/ts/import.generator";
import { GenericsTypeGenerator, GenericTypeGenerator } from "@/lib/templating/generator/type/generic.generator";
import { capitalize, GENERICS, PARAMS, pascalToSnake } from "@/templates/utils";

// import type * as Directus from "@directus/sdk";

// import type * as DirectusSDK from "@directus/sdk";

// import type { ApplyQueryFields } from "../../types/ApplyQueryFields";

// import type { Collections, Schema } from "../../client";
// import {
//   aggregateDirectusDashboardItems,
//   createDirectusDashboardItem,
//   createDirectusDashboardItems,
//   deleteDirectusDashboardItem,
//   deleteDirectusDashboardItems,
//   readDirectusDashboardItem,
//   readDirectusDashboardItems,
//   updateDirectusDashboardItem,
//   updateDirectusDashboardItems,
// } from "../../commands/DirectusDashboard.commands";
// import ChainableBinding from "../chainable-bindable";

/**
//    * Read munknown items from the collection.
//    */
//   async query<
//     const Query extends Directus.Query<Schema, Collections.DirectusActivity>,
//     Output = ApplyQueryFields<
//       Schema,
//       Collections.DirectusActivity,
//       Query["fields"]
//     >[],
//   >(query?: Query): Promise<Output> {
//     return this.request(
//       readDirectusActivityItems(query),
//     ) as unknown as Promise<Output>;
//   }

export function defaultImports<
    CollectionName extends string,
    ImportName extends `${string}${CollectionName}${string}`[],
>(collectionName: CollectionName, importName?: ImportName) {
    return IdentifierGenerator.create(
        `Bindings<${collectionName}>.System.imports`,
        MultiLineGenerator.create([
            ImportGenerator.create("@directus/sdk", {
                type: true,
                all: true,
                as: "Directus",
            }),
            ImportGenerator.create("../../types/ApplyQueryFields", {
                type: true,
                named: [NamedImportGenerator.create("ApplyQueryFields")],
            }),
            ImportGenerator.create("../../client", {
                type: true,
                named: [
                    NamedImportGenerator.create("Collections"),
                    NamedImportGenerator.create("Schema"),
                ],
            }),
            ImportGenerator.create(
                `../../commands/${collectionName}.commands`,
                {
                    named: importName?.map((name) =>
                        NamedImportGenerator.create(name),
                    ),
                },
            ),
            ImportGenerator.create("../chainable-bindable", {
                default: "ChainableBinding",
            }),
        ]),
    );
}

export function defaultItemsQuery<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Items.query`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Read many items from the collection.`,
            ]),
            ClassMethodGenerator.create({
                isAsync: true,
                name: 'query',
                params: FunctionParamsGenerator.create([
                    PARAMS.query(),
                ]),
                generics: GenericsTypeGenerator.create([
                    GENERICS.Query(collectionName),
                    GenericTypeGenerator.create({
                        name: 'Output',
                        extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>[]`,
                    })
                ]),
                returnType: `Promise<Output>`,
                body: `let toReturn = this.request(read${capitalize(collectionName)}Items(query)) as unknown as Promise<Output>;`,
                return: 'toReturn',
            })
        ]),
    );
}

/**
//    * Read the first item from the collection matching the query.
//    */
//   async find<
//     const Query extends Directus.Query<Schema, Collections.DirectusActivity>,
//     Output = ApplyQueryFields<
//       Schema,
//       Collections.DirectusActivity,
//       Query["fields"]
//     >,
//   >(query?: Query): Promise<Output | undefined> {
//     return this.request(
//       readDirectusActivityItems({
//         ...query,
//         limit: 1,
//       }),
//     ).then((items) => items?.[0]) as unknown as Promise<Output | undefined>;
//   }

export function defaultItemsFind<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Items.find`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Read the first item from the collection matching the query.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'find',
                    params: FunctionParamsGenerator.create([
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>`,
                        })
                    ]),
                    returnType: `Promise<Output | undefined>`,
                    body: `let toReturn = this.request(read${capitalize(collectionName)}Items({...query,limit: 1,})).then((items) => items?.[0]) as unknown as Promise<Output | undefined>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
//    * Creates munknown items in the collection.
//    */
// async create<
// const Query extends DirectusSDK.Query<Schema, Collections.DirectusUser>,
// Output = ApplyQueryFields<
//   Schema,
//   Collections.DirectusUser,
//   Query["fields"]
// >[],
// >(
// items: Partial<Collections.DirectusUser>[],
// query?: Query,
// ): Promise<Output> {
// return this.request(
//   createDirectusUserItems(items, query),
// ) as unknown as Promise<Output>;
// }

export function defaultItemsCreate<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Items.create`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Create many items in the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'create',
                    params: FunctionParamsGenerator.create([
                        PARAMS.items(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>[]`,
                        })
                    ]),
                    returnType: `Promise<Output>`,
                    body: `let toReturn = this.request(create${capitalize(collectionName)}Items(items, query)) as unknown as Promise<Output>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
//    * Update munknown items in the collection.
//    */
// async update<
// const Query extends Directus.Query<Schema, Directus.DirectusUser<Schema>>,
// Output = ApplyQueryFields<
//   Schema,
//   Collections.DirectusUser,
//   Query["fields"]
// >[],
// >(
// keys: Collections.DirectusUser extends { id: number | string }
//   ? Collections.DirectusUser["id"][]
//   : string[] | number[],
// patch: Partial<Collections.DirectusUser>,
// query?: Query,
// ): Promise<Output> {
// return this.request(
//   updateDirectusUserItems(keys, patch, query),
// ) as unknown as Promise<Output>;
// }

export function defaultItemsUpdate<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Items.update`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Update many items in the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'update',
                    params: FunctionParamsGenerator.create([
                        PARAMS.keys(collectionName),
                        PARAMS.patch(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>[]`,
                        })
                    ]),
                    returnType: `Promise<Output>`,
                    body: `let toReturn = this.request(update${capitalize(collectionName)}Items(keys, patch, query)) as unknown as Promise<Output>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
// * Remove munknown items in the collection.
// */
// async remove<Output = void>(
// keys: Collections.DirectusUser extends { id: number | string }
//   ? Collections.DirectusUser["id"][]
//   : string[] | number[],
// ): Promise<Output> {
// return this.request(
//   deleteDirectusUserItems(keys),
// ) as unknown as Promise<Output>;
// }

export function defaultItemsRemove<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Items.remove`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Remove many items in the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'remove',
                    params: FunctionParamsGenerator.create([
                        PARAMS.keys(collectionName),
                    ]),
                    returnType: `Promise<void>`,
                    body: `let toReturn = this.request(delete${capitalize(collectionName)}Items(keys)) as unknown as Promise<void>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
// * Aggregates the items in the collection.
// */
// async aggregate<
// Options extends Directus.AggregationOptions<Schema, "directus_users">,
// Output = Directus.AggregationOutput<
//   Schema,
//   "directus_users",
//   Options
// >[number],
// >(options: Options): Promise<Output> {
// return this.request(aggregateDirectusUserItems<Options>(options)).then(
//   (a) => a?.[0],
// ) as unknown as Promise<Output>;
// }

export function defaultItemsAggregate<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Items.aggregate`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Aggregates the items in the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'aggregate',
                    params: FunctionParamsGenerator.create([
                        FunctionParamGenerator.create({
                            name: 'options',
                            type: `Options`,
                        }),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GenericTypeGenerator.create({
                            name: 'Options',
                            extends: `Directus.AggregationOptions<Schema, "${pascalToSnake(collectionName)}">`,
                        }),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `Directus.AggregationOutput<Schema, "${pascalToSnake(collectionName)}", Options>[number]`,
                        })
                    ]),
                    returnType: `Promise<Output>`,
                    body: `let toReturn = this.request(aggregate${capitalize(collectionName)}Items(options)).then((a) => a?.[0]) as unknown as Promise<Output>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
// * Read a single item from the collection.
// */
// async get<
// const Query extends Directus.Query<Schema, Collections.DirectusUser>,
// Output = ApplyQueryFields<
//   Schema,
//   Collections.DirectusUser,
//   Query["fields"]
// >,
// >(
// key: Collections.DirectusUser extends { id: number | string }
//   ? Collections.DirectusUser["id"]
//   : string | number,
// query?: Query,
// ): Promise<Output> {
// return this.request(
//   readDirectusUserItem(key, query),
// ) as unknown as Promise<Output>;
// }

export function defaultItemGet<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Item.get`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Read a single item from the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'get',
                    params: FunctionParamsGenerator.create([
                        PARAMS.key(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>`,
                        })
                    ]),
                    returnType: `Promise<Output>`,
                    body: `let toReturn = this.request(read${capitalize(collectionName)}Item(key, query)) as unknown as Promise<Output>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
//    * Create a single item in the collection.
//    */
// async create<
// const Query extends Directus.Query<Schema, Collections.DirectusUser>,
// Output = ApplyQueryFields<
//   Schema,
//   Collections.DirectusUser,
//   Query["fields"]
// >,
// >(item: Partial<Collections.DirectusUser>, query?: Query): Promise<Output> {
// return this.request(
//   createDirectusUserItem(item, query),
// ) as unknown as Promise<Output>;
// }

export function defaultItemCreate<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Item.create`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Create a single item in the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'create',
                    params: FunctionParamsGenerator.create([
                        PARAMS.item(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>`,
                        })
                    ]),
                    returnType: `Promise<Output>`,
                    body: `let toReturn = this.request(create${capitalize(collectionName)}Item(item, query)) as unknown as Promise<Output>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
// * Update a single item from the collection.
// */
// async update<
// const Query extends Directus.Query<Schema, Collections.DirectusUser>,
// Output = ApplyQueryFields<
//   Schema,
//   Collections.DirectusUser,
//   Query["fields"]
// >,
// >(
// key: Collections.DirectusUser extends { id: number | string }
//   ? Collections.DirectusUser["id"]
//   : string | number,
// patch: Partial<Collections.DirectusUser>,
// query?: Query,
// ): Promise<Output> {
// return this.request(
//   updateDirectusUserItem(key, patch, query),
// ) as unknown as Promise<Output>;
// }

export function defaultItemUpdate<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Item.update`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Update a single item from the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'update',
                    params: FunctionParamsGenerator.create([
                        PARAMS.key(collectionName),
                        PARAMS.patch(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                        GenericTypeGenerator.create({
                            name: 'Output',
                            extends: `ApplyQueryFields<Schema, Collections.${collectionName}, Query["fields"]>`,
                        })
                    ]),
                    returnType: `Promise<Output>`,
                    body: `let toReturn = this.request(update${capitalize(collectionName)}Item(key, patch, query)) as unknown as Promise<Output>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}

// /**
// * Remove munknown items in the collection.
// */
// async remove<Output = void>(
// key: Collections.DirectusUser extends { id: number | string }
//   ? Collections.DirectusUser["id"]
//   : string | number,
// ): Promise<Output> {
// return this.request(
//   deleteDirectusUserItem(key),
// ) as unknown as Promise<Output>;
// }

export function defaultItemRemove<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.Item.remove`,
        MultiLineGenerator.create([
            CommentGenerator.create([
                `Remove a single item in the collection.`,
            ]),
            ExportGenerator.create(
                FunctionGenerator.create({
                    isAsync: true,
                    name: 'remove',
                    params: FunctionParamsGenerator.create([
                        PARAMS.key(collectionName),
                    ]),
                    returnType: `Promise<void>`,
                    body: `let toReturn = this.request(delete${capitalize(collectionName)}Item(key)) as unknown as Promise<void>;`,
                    return: 'toReturn',
                }),
            ),
        ]),
    );
}