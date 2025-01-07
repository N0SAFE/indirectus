import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { Registry, Collection } from "@/types/registry";
import {
    defaultImports,
    defaultAggregateFunction,
    pascalToSpace,
    PARAMS,
    GENERICS,
} from "./generics";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import { VariableDeclaratorGenerator } from "@/lib/templating/generator/ts/declarator.generator";
import { singular } from "pluralize";
import { GenericsTypeGenerator } from "@/lib/templating/generator/type/generic.generator";

const collectionName = "DirectusRelations";

export default () =>
    IdentifierGenerator.create(
        `Commands<${collectionName}>.System`,
        FileGenerator.create([
            defaultImports(collectionName),
            IdentifierGenerator.create(
                `Commands<${collectionName}>.System.exports`,
                MultiLineGenerator.create([
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Gets a single known ${pascalToSpace(collectionName)} item by id.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${collectionName}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "key",
                                            type: `Collections.${singular(collectionName)} extends { collection: number | string } ? Collections.${singular(collectionName)}["collection"] : string | number`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "field",
                                            type: `Directus.DirectusRelation<Schema>["field"]`,
                                        }),
                                    ]),
                                    returnType: `Directus.RestCommand<Directus.ReadRelationOutput<Schema, Directus.DirectusRelation<Schema>>, Schema>`,
                                    body: `let toReturn = DirectusSDK.readRelation(key, field);`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.read`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Gets a single known ${pascalToSpace(collectionName)} item by id.`,
                            ]),
                            ExportGenerator.create(
                                VariableDeclaratorGenerator.create(
                                    {name: `read${collectionName}`,
                                    value: `read${collectionName}Item`, keyword: 'const'}
                                ),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readItems`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Read many ${pascalToSpace(collectionName)} items.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${collectionName}Items`,
                                    params: FunctionParamsGenerator.create([]),
                                    returnType: `ReturnType<typeof DirectusSDK.readRelations<Schema>>`,
                                    body: `let toReturn = DirectusSDK.readRelations<Schema>();`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.reads`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Read many ${pascalToSpace(collectionName)} items.`,
                            ]),
                            ExportGenerator.create(
                                VariableDeclaratorGenerator.create(
                                    {name: `list${collectionName}`,
                                    value: `read${collectionName}Items`, keyword: 'const'}
                                ),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.createItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Create a single ${pascalToSpace(collectionName)} item.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `create${collectionName}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "item",
                                            type: `Partial<Collections.${singular(collectionName)}>`,
                                        }),
                                    ]),
                                    returnType: `ReturnType<typeof DirectusSDK.createRelation<Schema>>`,
                                    body: `let toReturn = DirectusSDK.createRelation<Schema>(item);`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.updateItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Update a single known ${pascalToSpace(collectionName)} item by id.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `update${collectionName}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "collection",
                                            type: `Directus.DirectusRelation<Schema>["collection"]`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "field",
                                            type: `Directus.DirectusRelation<Schema>["field"]`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "patch",
                                            type: `Partial<Collections.${singular(collectionName)}>`,
                                        }),
                                        PARAMS.query(collectionName),
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GENERICS.Query(collectionName)
                                    ]),
                                    returnType: `ReturnType<typeof DirectusSDK.updateRelation<Schema, Query>>`,
                                    body: `let toReturn = DirectusSDK.updateRelation<Schema, Query>(collection, field, patch, query);`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.deleteItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Deletes a single known ${pascalToSpace(collectionName)} item by id.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `delete${collectionName}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "collection",
                                            type: `Directus.DirectusRelation<Schema>["collection"]`,
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "field",
                                            type: `Directus.DirectusRelation<Schema>["field"]`,
                                        }),
                                    ]),
                                    returnType: `ReturnType<typeof DirectusSDK.deleteRelation<Schema>>`,
                                    body: `let toReturn = DirectusSDK.deleteRelation<Schema>(collection, field);`,
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
//  * Create a single directus relations item.
//  */
// export function createDirectusRelationItem(
//   item: Partial<Collections.DirectusRelation>,
// ): ReturnType<typeof DirectusSDK.createRelation<Schema>> {
//   return DirectusSDK.createRelation<Schema>(item);
// }

// /**
//  * Read many directus relations items.
//  */
// export function readDirectusRelationItems(): ReturnType<
//   typeof DirectusSDK.readRelations<Schema>
// > {
//   return DirectusSDK.readRelations<Schema>();
// }

// /**
//  * Read many directus relations items.
//  */
// export const listDirectusRelation = readDirectusRelationItems;

// /**
//  * Gets a single known directus relations item by id.
//  */
// export function readDirectusRelationItem(
//   key: Collections.DirectusRelation extends { collection: number | string }
//     ? Collections.DirectusRelation["collection"]
//     : string | number,
//   field: Directus.DirectusRelation<Schema>["field"],
// ): Directus.RestCommand<
//   Directus.ReadRelationOutput<Schema, Directus.DirectusRelation<Schema>>,
//   Schema
// > {
//   return DirectusSDK.readRelation(key, field);
// }

// /**
//  * Gets a single known directus relations item by id.
//  */
// export const readDirectusRelation = readDirectusRelationItem;

// /**
//  * Gets a single known directus relations item by id.
//  */
// export function updateDirectusRelationItem<
//   const Query extends Directus.Query<Schema, Directus.DirectusRelation<Schema>>,
// >(
//   collection: Directus.DirectusRelation<Schema>["collection"],
//   field: Directus.DirectusRelation<Schema>["field"],
//   patch: Partial<Collections.DirectusRelation>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateRelation<Schema, Query>> {
//   return DirectusSDK.updateRelation<Schema, Query>(
//     collection,
//     field,
//     patch,
//     query,
//   );
// }

// /**
//  * Deletes a single known directus relations item by id.
//  */
// export function deleteDirectusRelationItem(
//   collection: Directus.DirectusRelation<Schema>["collection"],
//   field: Directus.DirectusRelation<Schema>["field"],
// ): ReturnType<typeof DirectusSDK.deleteRelation<Schema>> {
//   return DirectusSDK.deleteRelation<Schema>(collection, field);
// }

// /**
//  * Aggregates directus relations items.
//  */
// export function aggregateDirectusRelationItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_relations">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_relations", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_relations", Options>(
//     "directus_relations",
//     option,
//   );
// }
