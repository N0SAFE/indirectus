import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import {
    defaultAggregateFunction,
    defaultImports,
    defaultReadsVariable,
} from "./generics";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import { GenericsTypeGenerator } from "@/lib/templating/generator/type/generic.generator";
import { singular } from "pluralize";
import { pascalToSpace, capitalize } from "@/templates/utils";

const collectionName = "DirectusExtensions";

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
                                    name: `read${capitalize(collectionName)}Items`,
                                    params: FunctionParamsGenerator.create([]),
                                    generics: GenericsTypeGenerator.create([]),
                                    body: `let toReturn = DirectusSDK.readExtensions<Schema>();`,
                                    returnType: `ReturnType<typeof DirectusSDK.readExtensions<Schema>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    defaultReadsVariable(collectionName),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.updateItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Update a single known ${pascalToSpace(collectionName)} item by id.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `update${capitalize(collectionName)}Item`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "bundle",
                                            type: "string | null",
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "name",
                                            type: "string",
                                        }),
                                        FunctionParamGenerator.create({
                                            name: "data",
                                            type: `Directus.NestedPartial<Directus.${singular(collectionName)}<Schema>>`,
                                        }),
                                    ]),
                                    generics: GenericsTypeGenerator.create([]),
                                    body: `let toReturn = DirectusSDK.updateExtension<Schema>(bundle, name, data);`,
                                    returnType: `ReturnType<typeof DirectusSDK.updateExtension<Schema>>`,
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

// import type { Schema } from "../client";

// /**
//  * Read munknown directus extensions items.
//  */
// export function readDirectusExtensionItems(): ReturnType<
//   typeof DirectusSDK.readExtensions<Schema>
// > {
//   return DirectusSDK.readExtensions<Schema>();
// }

// /**
//  * Read munknown directus extensions items.
//  */
// export const listDirectusExtension = readDirectusExtensionItems;

// /**
//  * Gets a single known directus extensions item by id.
//  */
// export function updateDirectusExtensionItem(
//   bundle: string | null,
//   name: string,
//   data: Directus.NestedPartial<Directus.DirectusExtension<Schema>>,
// ): ReturnType<typeof DirectusSDK.updateExtension<Schema>> {
//   return DirectusSDK.updateExtension<Schema>(bundle, name, data);
// }

// /**
//  * Aggregates directus extensions items.
//  */
// export function aggregateDirectusExtensionItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_extensions">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_extensions", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_extensions", Options>(
//     "directus_extensions",
//     option,
//   );
// }
