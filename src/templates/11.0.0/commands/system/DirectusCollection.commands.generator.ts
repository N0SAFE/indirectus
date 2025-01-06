import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import {
    capitalize,
    defaultAggregateFunction,
    defaultImports,
    GENERICS,
    PARAMS,
    pascalToSnake,
    pascalToSpace,
} from "./generics";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { Collection, Registry } from "@/types/registry";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import { GenericsTypeGenerator } from "@/lib/templating/generator/type/generic.generator";
import { VariableDeclaratorGenerator } from "@/lib/templating/generator/ts/declarator.generator";

const collectionName = "DirectusCollection";

export default () =>
    IdentifierGenerator.create(
        `Commands<${collectionName}>.System`,
        FileGenerator.create([
            defaultImports(collectionName),
            IdentifierGenerator.create(
                `Commands<${collectionName}>.System.exports`,
                MultiLineGenerator.create([
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readItems`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Read many ${pascalToSpace(collectionName)} items.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${collectionName}Items`,
                                    params: FunctionParamsGenerator.create([]),
                                    generics: GenericsTypeGenerator.create([]),
                                    body: `let toReturn = DirectusSDK.readCollections<Schema>();`,
                                    returnType: `ReturnType<typeof DirectusSDK.readCollections<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.reads`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Read many ${pascalToSpace(collectionName)} items.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                VariableDeclaratorGenerator.create(
                                    `list${capitalize(collectionName)}`,
                                    `read${capitalize(collectionName)}Items`,
                                ),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Gets a single known ${pascalToSpace(collectionName)} item by id.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${capitalize(collectionName)}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "key",
                                            type: `Collections.${collectionName} extends { collection: number | string } ? Collections.${collectionName}["collection"] : string | number`,
                                        }),
                                    ]),
                                    generics: GenericsTypeGenerator.create([]),
                                    body: `let toReturn = DirectusSDK.readCollection<Schema>(key);`,
                                    returnType: `ReturnType<typeof DirectusSDK.readCollection<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.read`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Gets a single known ${pascalToSpace(collectionName)} item by id.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                VariableDeclaratorGenerator.create(
                                    `read${capitalize(collectionName)}`,
                                    `read${capitalize(collectionName)}Item`,
                                ),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.updateItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Updates a single known ${pascalToSpace(
                                        collectionName,
                                    )} item by id.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `update${capitalize(collectionName)}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "collection",
                                            type: `keyof Schema`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "patch",
                                            type: `Partial<Collections.${collectionName}>`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "query",
                                            type: `Query`,
                                            optional: true,
                                        }),
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GENERICS.Query(collectionName),
                                    ]),
                                    body: `let toReturn = DirectusSDK.updateCollection<Schema, Query>(collection, patch, query);`,
                                    returnType: `ReturnType<typeof DirectusSDK.updateCollection<Schema, Query>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.updateBatchItems`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Updates batch many ${pascalToSpace(collectionName)} items.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `updateBatch${capitalize(collectionName)}Items`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "items",
                                            type: `Directus.NestedPartial<Collections.${collectionName}>[]`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "query",
                                            type: `Query`,
                                            optional: true,
                                        }),
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GENERICS.Query(collectionName),
                                    ]),
                                    body: `let toReturn = DirectusSDK.updateCollectionsBatch<Schema, Query>(items, query);`,
                                    returnType: `ReturnType<typeof DirectusSDK.updateCollectionsBatch<Schema, Query>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.deleteItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Deletes a single known ${pascalToSpace(collectionName)} item by id.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `delete${capitalize(collectionName)}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "key",
                                            type: `Collections.${collectionName} extends { collection: number | string } ? Collections.${collectionName}["collection"] : string | number`,
                                        }),
                                    ]),
                                    generics: GenericsTypeGenerator.create([]),
                                    body: `let toReturn = DirectusSDK.deleteCollection<Schema>(key);`,
                                    returnType: `ReturnType<typeof DirectusSDK.deleteCollection<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    defaultAggregateFunction(collectionName),
                ]),
            ),
        ]),
    );

// import type * as Directus from "@directus/sdk";

// import * as DirectusSDK from "@directus/sdk";

// import type { Collections, Schema } from "../client";

// /**
//  * Create a single directus collections item.
//  */
// export function createDirectusCollectionItem<
//   const Query extends DirectusSDK.Query<Schema, Collections.DirectusCollection>, // Is this a mistake? Why []?
// >(
//   item: Partial<Collections.DirectusCollection>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.createCollection<Schema, Query>> {
//   return DirectusSDK.createCollection<Schema, Query>(item, query);
// }

// /**
//  * Read munknown directus collections items.
//  */
// export function readDirectusCollectionItems(): ReturnType<
//   typeof DirectusSDK.readCollections<Schema>
// > {
//   return DirectusSDK.readCollections<Schema>();
// }

// /**
//  * Read munknown directus collections items.
//  */
// export const listDirectusCollection = readDirectusCollectionItems;

// /**
//  * Gets a single known directus collections item by id.
//  */
// export function readDirectusCollectionItem(
//   key: Collections.DirectusCollection extends { collection: number | string }
//     ? Collections.DirectusCollection["collection"]
//     : string | number,
// ): ReturnType<typeof DirectusSDK.readCollection<Schema>> {
//   return DirectusSDK.readCollection<Schema>(key);
// }

// /**
//  * Gets a single known directus collections item by id.
//  */
// export const readDirectusCollection = readDirectusCollectionItem;

// /**
//  * Gets a single known directus collections item by id.
//  */
// export function updateDirectusCollectionItem<
//   const Query extends Directus.Query<
//     Schema,
//     Directus.DirectusCollection<Schema>
//   >,
// >(
//   collection: keyof Schema,
//   patch: Partial<Collections.DirectusCollection>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateCollection<Schema, Query>> {
//   return DirectusSDK.updateCollection<Schema, Query>(collection, patch, query);
// }

// /**
//  * updates munknown directus collections items.
//  */
// export function updateBatchDirectusCollectionItems<
//   const Query extends Directus.Query<
//     Schema,
//     Directus.DirectusCollection<Schema>
//   >,
// >(
//   items: Directus.NestedPartial<Collections.DirectusCollection>[],
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateCollectionsBatch<Schema, Query>> {
//   return DirectusSDK.updateCollectionsBatch<Schema, Query>(items, query);
// }

// /**
//  * Deletes a single known directus collections item by id.
//  */
// export function deleteDirectusCollectionItem(
//   key: Collections.DirectusCollection extends { collection: number | string }
//     ? Collections.DirectusCollection["collection"]
//     : string | number,
// ): ReturnType<typeof DirectusSDK.deleteCollection<Schema>> {
//   return DirectusSDK.deleteCollection<Schema>(key);
// }

// /**
//  * Aggregates directus collections items.
//  */
// export function aggregateDirectusCollectionItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_collections">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_collections", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_collections", Options>(
//     "directus_collections",
//     option,
//   );
// }
