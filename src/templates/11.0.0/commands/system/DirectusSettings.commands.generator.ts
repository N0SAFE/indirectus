import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { Registry, Collection } from "@/types/registry";
import {
    defaultImports,
    defaultReadsFunction,
    defaultReadsVariable,
    defaultReadFunction,
    defaultReadVariable,
    defaultCreateFunction,
    defaultCreatesFunction,
    defaultUpdateFunction,
    defaultUpdatesFunction,
    defaultDeleteFunction,
    defaultDeletesFunction,
    defaultAggregateFunction,
    pascalToSpace,
} from "./generics";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    FunctionGenerator,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import {
    GenericTypeGenerator,
    GenericsTypeGenerator,
} from "@/lib/templating/generator/type/generic.generator";
import { VariableDeclaratorGenerator } from "@/lib/templating/generator/ts/declarator.generator";

const collectionName = "DirectusSettings";

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
                                `Read the ${pascalToSpace(collectionName)} singleton.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `read${collectionName}`,
                                    params: FunctionParamsGenerator.create([
                                        FunctionParamGenerator.create({
                                            name: "query",
                                            type: `Query`,
                                            optional: true,
                                        }),
                                    ]),
                                    generics: GenericsTypeGenerator.create([
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends: `Directus.Query<Schema, Collections.${collectionName}>`,
                                        }),
                                    ]),
                                    body: `let toReturn = DirectusSDK.readSettings<Schema, Query>(query);`,
                                    returnType: `ReturnType<typeof DirectusSDK.readSettings<Schema, Query>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.read`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Read the ${pascalToSpace(collectionName)} singleton.`,
                            ]),
                            VariableDeclaratorGenerator.create({
                                name: `get${collectionName}`,
                                value: `read${collectionName}`,
                                keyword: "const",
                            }),
                        ]),
                    ),
                    IdentifierGenerator.create(
                        `Commands<${collectionName}>.System.exports.updateItem`,
                        MultiLineGenerator.create([
                            CommentGenerator.create([
                                `Update the ${pascalToSpace(collectionName)} singleton.`,
                            ]),
                            ExportGenerator.create(
                                FunctionGenerator.create({
                                    name: `update${collectionName}`,
                                    params: FunctionParamsGenerator.create([
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
                                        GenericTypeGenerator.create({
                                            name: "Query",
                                            extends: `Directus.Query<Schema, Collections.${collectionName}>`,
                                        }),
                                    ]),
                                    body: `let toReturn = DirectusSDK.updateSettings<Schema, Query>(patch, query);`,
                                    returnType: `ReturnType<typeof DirectusSDK.updateSettings<Schema, Query>>`,
                                    return: "toReturn",
                                }),
                            ),
                        ]),
                    ),
                ]),
            ),
        ]),
    );

// import type * as Directus from "@directus/sdk";

// import * as DirectusSDK from "@directus/sdk";

// import type { Collections, Schema } from "../client";

// /**
//  * Reads the directus settings singleton.
//  */
// export function readDirectusSettings<
//   const Query extends Directus.Query<Schema, Collections.DirectusSettings>,
// >(query?: Query): ReturnType<typeof DirectusSDK.readSettings<Schema, Query>> {
//   return DirectusSDK.readSettings<Schema, Query>(query);
// }

// /**
//  * Reads the directus settings singleton.
//  */
// export const getDirectusSettings = readDirectusSettings;

// /**
//  * Updates the directus settings singleton.
//  */
// export function updateDirectusSettings<
//   const Query extends Directus.Query<Schema, Collections.DirectusSettings>,
// >(
//   patch: Partial<Collections.DirectusSettings>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateSettings<Schema, Query>> {
//   return DirectusSDK.updateSettings<Schema, Query>(patch, query);
// }
