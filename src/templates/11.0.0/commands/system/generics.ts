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
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { ImportGenerator } from "@/lib/templating/generator/ts/import.generator";
import { VariableDeclaratorGenerator } from "@/lib/templating/generator/ts/declarator.generator";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { pascalToSpace, capitalize, PARAMS, GENERICS, pascalToSnake } from "@/templates/utils";

// /**
//  * Read munknown directus activity items.
//  */
// export function readDirectusActivityItems<
//   const Query extends Directus.Query<
//     Schema,
//     DirectusSDK.DirectusActivity<Schema>
//   >,
// >(query?: Query): ReturnType<typeof DirectusSDK.readActivities<Schema, Query>> {
//   return DirectusSDK.readActivities<Schema, Query>(query);
// }

// /**
//  * Read munknown directus activity items.
//  */
// export const listDirectusActivity = readDirectusActivityItems;

// /**
//  * Gets a single known directus activity item by id.
//  */
// export function readDirectusActivityItem<
//   const Query extends Directus.Query<
//     Schema,
//     DirectusSDK.DirectusActivity<Schema>
//   >,
// >(
//   key: Collections.DirectusActivity extends { id: number | string }
//     ? Collections.DirectusActivity["id"]
//     : string | number,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.readActivity<Schema, Query>> {
//   return DirectusSDK.readActivity<Schema, Query>(key, query);
// }

// /**
//  * Gets a single known directus activity item by id.
//  */
// export const readDirectusActivity = readDirectusActivityItem;

// /**
//  * Aggregates directus activity items.
//  */
// export function aggregateDirectusActivityItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_activity">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_activity", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_activity", Options>(
//     "directus_activity",
//     option,
//   );
// }

export function defaultImports<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.imports`,
        MultiLineGenerator.create([
            ImportGenerator.create("@directus/sdk", {
                all: true,
                type: true,
                as: "Directus",
            }),
            ImportGenerator.create("@directus/sdk", {
                all: true,
                as: "DirectusSDK",
            }),
            ImportGenerator.create("../client", {
                all: false,
                type: true,
                named: [
                    {
                        name: "Collections",
                    },
                    {
                        name: "Schema",
                    },
                ],
            }),
        ]),
    );
}

export function defaultReadsFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.readItems`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [`Read many ${pascalToSpace(collectionName)} items.`],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `read${capitalize(collectionName)}Items`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema, Query>(query);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema, Query>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

export function defaultReadsVariable<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.reads`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [`Read many ${pascalToSpace(collectionName)} items.`],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                VariableDeclaratorGenerator.create({
                    name: `list${capitalize(collectionName)}`,
                    value: `read${capitalize(collectionName)}Items`,
                    keyword: "const",
                }),
            ),
        ]),
    );
}

export function defaultReadFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
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
                        PARAMS.key(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema, Query>(key, query);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema, Query>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

export function defaultReadVariable<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
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
                VariableDeclaratorGenerator.create({
                    name: `read${capitalize(collectionName)}`,
                    value: `read${capitalize(collectionName)}Item`,
                    keyword: "const",
                }),
            ),
        ]),
    );
}

export function defaultCreateFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.createItem`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [`Create a single ${pascalToSpace(collectionName)} item.`],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `create${capitalize(collectionName)}Item`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.item(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema, Query>(item, query);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema, Query>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

export function defaultCreatesFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.createItems`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [`Create many ${pascalToSpace(collectionName)} items.`],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `create${capitalize(collectionName)}Items`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.items(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema, Query>(items, query);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema, Query>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

// /**
//  * Create many directus flows items.
//  */
// export function createDirectusFlowItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusFlow>,
// >(
//   items: Partial<Collections.DirectusFlow>[],
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.createFlows<Schema, Query>> {
//   return DirectusSDK.createFlows<Schema, Query>(items, query);
// }

// /**
//  * Create a single directus flows item.
//  */
// export function createDirectusFlowItem<
//   const Query extends DirectusSDK.Query<Schema, Directus.DirectusFlow<Schema>>,
// >(
//   item: Partial<Collections.DirectusFlow>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.createFlow<Schema, Query>> {
//   return DirectusSDK.createFlow<Schema, Query>(item, query);
// }

export function defaultUpdateFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.updateItem`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [
                    `Update a single known ${pascalToSpace(collectionName)} item by id.`,
                ],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `update${capitalize(collectionName)}Item`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.key(collectionName),
                        PARAMS.patch(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema, Query>(key, patch, query);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema, Query>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

export function defaultUpdatesFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.updateItems`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [
                    `Update many known ${pascalToSpace(collectionName)} items by id.`,
                ],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `update${capitalize(collectionName)}Items`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.keys(collectionName),
                        PARAMS.patch(collectionName),
                        PARAMS.query(),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.Query(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema, Query>(keys, patch, query);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema, Query>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

export function defaultDeleteFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.deleteItem`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [
                    `Delete a single known ${pascalToSpace(collectionName)} item by id.`,
                ],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `delete${capitalize(collectionName)}Item`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.key(collectionName),
                    ]),
                    generics: GenericsTypeGenerator.create([]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema>(key);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

export function defaultDeletesFunction<
    CollectionName extends string,
    DirectusMethodName extends string,
>(collectionName: CollectionName, directusMethodName: DirectusMethodName) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.deleteItems`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [
                    `Delete many known ${pascalToSpace(collectionName)} items by id.`,
                ],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `delete${capitalize(collectionName)}Items`,
                    params: FunctionParamsGenerator.create([
                        PARAMS.keys(collectionName),
                    ]),
                    generics: GenericsTypeGenerator.create([]),
                    body: `let toReturn = DirectusSDK.${directusMethodName}<Schema>(keys);`,
                    returnType: `ReturnType<typeof DirectusSDK.${directusMethodName}<Schema>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}

// /**
//  * Deletes many directus flows items.
//  */
// export function deleteDirectusFlowItems(
//   keys: Collections.DirectusFlow extends { id: number | string }
//     ? Collections.DirectusFlow["id"][]
//     : string[] | number[],
// ): ReturnType<typeof DirectusSDK.deleteFlows<Schema>> {
//   return DirectusSDK.deleteFlows<Schema>(keys);
// }

// /**
//  * Deletes a single known directus flows item by id.
//  */
// export function deleteDirectusFlowItem(
//   key: Collections.DirectusFlow extends { id: number | string }
//     ? Collections.DirectusFlow["id"]
//     : string | number,
// ): ReturnType<typeof DirectusSDK.deleteFlow<Schema>> {
//   return DirectusSDK.deleteFlow<Schema>(key);
// }

export function defaultAggregateFunction<CollectionName extends string>(
    collectionName: CollectionName,
) {
    return IdentifierGenerator.create(
        `Commands<${collectionName}>.System.exports.aggregateItems`,
        MultiLineGenerator.create([
            CommentGenerator.create(
                [`Aggregates ${pascalToSpace(collectionName)} items.`],
                {
                    forceMultiline: true,
                },
            ),
            ExportGenerator.create(
                FunctionGenerator.create({
                    name: `aggregate${collectionName}Items`,
                    generics: GenericsTypeGenerator.create([
                        GENERICS.AggregateOptions(collectionName),
                    ]),
                    params: FunctionParamsGenerator.create([
                        PARAMS.option(),
                    ]),
                    body: `let toReturn = DirectusSDK.aggregate<Schema, "${pascalToSnake(collectionName)}", Options>("${pascalToSnake(collectionName)}", option);`,
                    returnType: `ReturnType<typeof DirectusSDK.aggregate<Schema, "${pascalToSnake(collectionName)}", Options>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}
