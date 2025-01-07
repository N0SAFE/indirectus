import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { Collection, Registry } from "@/types/registry";
import {
    capitalize,
    defaultAggregateFunction,
    defaultCreateFunction,
    defaultCreatesFunction,
    defaultDeleteFunction,
    defaultDeletesFunction,
    defaultImports,
    defaultReadFunction,
    defaultReadsFunction,
    defaultReadsVariable,
    defaultReadVariable,
    defaultUpdateFunction,
    defaultUpdatesFunction,
    GENERICS,
    PARAMS,
    pascalToSpace,
} from "./generics";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import { GenericsTypeGenerator, GenericTypeGenerator } from "@/lib/templating/generator/type/generic.generator";

const collectionName = "DirectusFiles";

export default () =>
    IdentifierGenerator.create(
        `Commands<${collectionName}>.System`,
        FileGenerator.create([
            defaultImports(collectionName),
            IdentifierGenerator.create(
                `Commands<${collectionName}>.System.exports`,
                MultiLineGenerator.create([
                    defaultReadsFunction(collectionName, "readFiles"),
                    defaultReadsVariable(collectionName),
                    defaultReadFunction(collectionName, "readFile"),
                    defaultReadVariable(collectionName),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readAssetArrayBuffer`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Gets a single known ${pascalToSpace(collectionName)} item by id as array buffer.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${capitalize(collectionName)}ArrayBuffer`,
                                    params: FunctionParamsGenerator.create([
                                        PARAMS.key(collectionName),
                                        FunctionParamGenerator.create({
                                            name: "assetQuery",
                                            type: "Directus.AssetsQuery",
                                        })
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "AssetsQuery",
                                            extends: "Directus.AssetsQuery",
                                        })
                                    ]),
                                    body: `let toReturn = DirectusSDK.readAssetArrayBuffer<Schema>(key, assetQuery);`,
                                    returnType: `ReturnType<typeof DirectusSDK.readAssetArrayBuffer<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readAssetBlob`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Gets a single known ${pascalToSpace(collectionName)} item by id as blob.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${capitalize(collectionName)}Blob`,
                                    params: FunctionParamsGenerator.create([
                                        PARAMS.key(collectionName),
                                        FunctionParamGenerator.create({
                                            name: "assetQuery",
                                            type: "Directus.AssetsQuery",
                                        })
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "AssetsQuery",
                                            extends: "Directus.AssetsQuery",
                                        })
                                    ]),
                                    body: `let toReturn = DirectusSDK.readAssetBlob<Schema>(key, assetQuery);`,
                                    returnType: `ReturnType<typeof DirectusSDK.readAssetBlob<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.readAssetRaw`,
                        MultiLineGenerator.create([
                            CommentGenerator.create(
                                [
                                    `Gets a single known ${pascalToSpace(collectionName)} item by id as readable stream.`,
                                ],
                                {
                                    forceMultiline: true,
                                },
                            ),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${capitalize(collectionName)}Stream`,
                                    params: FunctionParamsGenerator.create([
                                        PARAMS.key(collectionName),
                                        FunctionParamGenerator.create({
                                            name: "assetQuery",
                                            type: "Directus.AssetsQuery",
                                        })
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "AssetsQuery",
                                            extends: "Directus.AssetsQuery",
                                        })
                                    ]),
                                    body: `let toReturn = DirectusSDK.readAssetRaw<Schema>(key, assetQuery);`,
                                    returnType: `ReturnType<typeof DirectusSDK.readAssetRaw<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    defaultUpdateFunction(collectionName, "updateFile"),
                    defaultUpdatesFunction(collectionName, "updateFiles"),
                    defaultDeleteFunction(collectionName, "deleteFile"),
                    defaultDeletesFunction(collectionName, "deleteFiles"),
                    defaultAggregateFunction(collectionName),
                ]),
            ),
        ]),
    );

// import type * as Directus from "@directus/sdk";

// import * as DirectusSDK from "@directus/sdk";

// import type { Collections, Schema } from "../client";

// /**
//  * Read munknown directus files items.
//  */
// export function readDirectusFileItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusFile>,
// >(query?: Query): ReturnType<typeof DirectusSDK.readFiles<Schema, Query>> {
//   return DirectusSDK.readFiles<Schema, Query>(query);
// }

// /**
//  * Read munknown directus files items.
//  */
// export const listDirectusFile = readDirectusFileItems;

// /**
//  * Gets a single known directus files item by id.
//  */
// export function readDirectusFileItem<
//   const Query extends Directus.Query<Schema, Collections.DirectusFile>,
// >(
//   key: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"]
//     : string | number,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.readFile<Schema, Query>> {
//   return DirectusSDK.readFile<Schema, Query>(key, query);
// }

// /**
//  * Gets a single known directus files item by id.
//  */
// export const readDirectusFile = readDirectusFileItem;

// /**
//  * read file as array buffer
//  */
// export function readDirectusFileArrayBuffer(
//   key: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"]
//     : string | number,
//   query?: Directus.AssetsQuery,
// ): ReturnType<typeof DirectusSDK.readAssetArrayBuffer<Schema>> {
//   return DirectusSDK.readAssetArrayBuffer<Schema>(key, query);
// }

// /**
//  * read file as blob
//  */
// export function readDirectusFileBlob(
//   key: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"]
//     : string | number,
//   query?: Directus.AssetsQuery,
// ): ReturnType<typeof DirectusSDK.readAssetBlob<Schema>> {
//   return DirectusSDK.readAssetBlob<Schema>(key, query);
// }

// /**
//  * read file as readable stream
//  */
// export function readDirectusFileStream(
//   key: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"]
//     : string | number,
//   query?: Directus.AssetsQuery,
// ): ReturnType<typeof DirectusSDK.readAssetRaw<Schema>> {
//   return DirectusSDK.readAssetRaw<Schema>(key, query);
// }

// /**
//  * Read munknown directus files items.
//  */
// export function updateDirectusFileItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusFile>,
// >(
//   keys: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"][]
//     : string[] | number[],
//   patch: Partial<Collections.DirectusFile>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateFiles<Schema, Query>> {
//   return DirectusSDK.updateFiles<Schema, Query>(keys, patch, query);
// }

// export function updateBatchDirectusFileItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusFile>,
// >(
//   items: Directus.NestedPartial<Collections.DirectusFile>[],
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateFilesBatch<Schema, Query>> {
//   return DirectusSDK.updateFilesBatch<Schema, Query>(items, query);
// }

// /**
//  * Gets a single known directus files item by id.
//  */
// export function updateDirectusFileItem<
//   const Query extends Directus.Query<Schema, Collections.DirectusFile>,
// >(
//   key: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"]
//     : string | number,
//   patch: Partial<Collections.DirectusFile>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateFile<Schema, Query>> {
//   return DirectusSDK.updateFile<Schema, Query>(key, patch, query);
// }

// /**
//  * Deletes munknown directus files items.
//  */
// export function deleteDirectusFileItems(
//   keys: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"][]
//     : string[] | number[],
// ): ReturnType<typeof DirectusSDK.deleteFiles<Schema>> {
//   return DirectusSDK.deleteFiles<Schema>(keys);
// }

// /**
//  * Deletes a single known directus files item by id.
//  */
// export function deleteDirectusFileItem(
//   key: Collections.DirectusFile extends { id: number | string }
//     ? Collections.DirectusFile["id"]
//     : string | number,
// ): ReturnType<typeof DirectusSDK.deleteFile<Schema>> {
//   return DirectusSDK.deleteFile<Schema>(key);
// }

// /**
//  * Aggregates directus files items.
//  */
// export function aggregateDirectusFileItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_files">,
// >(
//   option: Options,
// ): ReturnType<typeof DirectusSDK.aggregate<Schema, "directus_files", Options>> {
//   return DirectusSDK.aggregate<Schema, "directus_files", Options>(
//     "directus_files",
//     option,
//   );
// }
