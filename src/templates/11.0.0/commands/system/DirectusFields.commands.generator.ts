import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import {
    defaultAggregateFunction,
    defaultImports,
    defaultReadsVariable,
    defaultReadVariable,
} from "./generics";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import { GenericsTypeGenerator } from "@/lib/templating/generator/type/generic.generator";
import { singular } from "pluralize";
import { PARAMS, GENERICS } from "@/templates/utils";

const collectionName = "DirectusFields";

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
                            CommentGenerator.create([
                                `Read many ${collectionName} items.`,
                            ]),
                            FunctionGenerator.create({
                                name: `read${collectionName}Items`,
                                params: FunctionParamsGenerator.create([]),
                                generics: GenericsTypeGenerator.create([]),
                                body: `let toReturn = DirectusSDK.readFields<Schema>();`,
                                returnType: `ReturnType<typeof DirectusSDK.readFields<Schema>>`,
                                return: "toReturn",
                            }),
                        ]),
                    ),
                    defaultReadsVariable(collectionName),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Read a single ${collectionName} item.`,
                            ]),
                            FunctionGenerator.create({
                                name: `read${collectionName}Item`,
                                params: FunctionParamsGenerator.create([
                                    FunctionParamGenerator.create({
                                        name: "collection",
                                        type: "keyof Schema",
                                    }),
                                    FunctionParamGenerator.create({
                                        name: "field",
                                        type: 'Directus.DirectusField<Schema>["field"]',
                                    }),
                                ]),
                                generics: GenericsTypeGenerator.create([]),
                                body: `let toReturn = DirectusSDK.readField<Schema>(collection, field);`,
                                returnType: `ReturnType<typeof DirectusSDK.readField<Schema>>`,
                                return: "toReturn",
                            }),
                        ]),
                    ),
                    defaultReadVariable(collectionName),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.createItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Create a single ${collectionName} item.`,
                            ]),
                            FunctionGenerator.create({
                                name: `create${collectionName}Item`,
                                params: FunctionParamsGenerator.create([
                                    FunctionParamGenerator.create({
                                        name: "collection",
                                        type: "keyof Schema",
                                    }),
                                    PARAMS.item(collectionName),
                                    PARAMS.query(),
                                ]),
                                generics: GenericsTypeGenerator.create([
                                    GENERICS.Query(collectionName),
                                ]),
                                body: `let toReturn = DirectusSDK.createField<Schema, Query>(collection, item, query);`,
                                returnType: `ReturnType<typeof DirectusSDK.createField<Schema, Query>>`,
                                return: "toReturn",
                            }),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.updateItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Update a single ${collectionName} item.`,
                            ]),
                            FunctionGenerator.create({
                                name: `update${collectionName}Item`,
                                params: FunctionParamsGenerator.create([
                                    FunctionParamGenerator.create({
                                        name: "key",
                                        type: `Collections.${singular(collectionName)} extends { collection: number | string } ? Collections.${singular(collectionName)}['collection'] : string | number`,
                                    }),
                                    FunctionParamGenerator.create({
                                        name: "field",
                                        type: 'Directus.DirectusField<Schema>["field"]',
                                    }),
                                    PARAMS.patch(collectionName),
                                    PARAMS.query(),
                                ]),
                                generics: GenericsTypeGenerator.create([
                                    GENERICS.Query(collectionName),
                                ]),
                                body: `let toReturn = DirectusSDK.updateField<Schema, Query>(key, field, patch, query);`,
                                returnType: `ReturnType<typeof DirectusSDK.updateField<Schema, Query>>`,
                                return: "toReturn",
                            }),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.deleteItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Delete a single ${collectionName} item.`,
                            ]),
                            FunctionGenerator.create({
                                name: `delete${collectionName}Item`,
                                params: FunctionParamsGenerator.create([
                                    FunctionParamGenerator.create({
                                        name: "collection",
                                        type: "Directus.DirectusField<Schema>['collection']",
                                    }),
                                    FunctionParamGenerator.create({
                                        name: "field",
                                        type: 'Directus.DirectusField<Schema>["field"]',
                                    }),
                                ]),
                                generics: GenericsTypeGenerator.create([]),
                                body: `let toReturn = DirectusSDK.deleteField<Schema>(collection, field);`,
                                returnType: `ReturnType<typeof DirectusSDK.deleteField<Schema>>`,
                                return: "toReturn",
                            }),
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
//  * Create a single directus fields item.
//  */
// export function createDirectusFieldItem<
//   const Query extends DirectusSDK.Query<Schema, Directus.DirectusField<Schema>>,
// >(
//   collection: keyof Schema,
//   item: Partial<Collections.DirectusField>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.createField<Schema, Query>> {
//   return DirectusSDK.createField<Schema, Query>(collection, item, query);
// }

// /**
//  * Read munknown directus fields items.
//  */
// export function readDirectusFieldItems(): ReturnType<
//   typeof DirectusSDK.readFields<Schema>
// > {
//   return DirectusSDK.readFields<Schema>();
// }

// /**
//  * Read munknown directus fields items.
//  */
// export const listDirectusField = readDirectusFieldItems;

// /**
//  * Gets a single known directus fields item by id.
//  */
// export function readDirectusFieldItem(
//   collection: keyof Schema,
//   field: Directus.DirectusField<Schema>["field"],
// ): ReturnType<typeof DirectusSDK.readField<Schema>> {
//   return DirectusSDK.readField<Schema>(collection, field);
// }

// /**
//  * Gets a single known directus fields item by id.
//  */
// export const readDirectusField = readDirectusFieldItem;

// /**
//  * Gets a single known directus fields item by id.
//  */
// export function updateDirectusFieldItem<
//   const Query extends Directus.Query<Schema, Directus.DirectusField<Schema>>,
// >(
//   key: Collections.DirectusField extends { collection: number | string }
//     ? Collections.DirectusField["collection"]
//     : string | number,
//   field: Directus.DirectusField<Schema>["field"],
//   patch: Partial<Collections.DirectusField>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateField<Schema, Query>> {
//   return DirectusSDK.updateField<Schema, Query>(key, field, patch, query);
// }

// /**
//  * Deletes a single known directus fields item by id.
//  */
// export function deleteDirectusFieldItem(
//   collection: Directus.DirectusField<Schema>["collection"],
//   field: Directus.DirectusField<Schema>["field"],
// ): ReturnType<typeof DirectusSDK.deleteField<Schema>> {
//   return DirectusSDK.deleteField<Schema>(collection, field);
// }

// /**
//  * Aggregates directus fields items.
//  */
// export function aggregateDirectusFieldItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_fields">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_fields", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_fields", Options>(
//     "directus_fields",
//     option,
//   );
// }
