import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
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

export const PARAMS = {
    query: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "query",
            type: "Query",
            optional: true,
        }),
    key: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "key",
            type: `Collections.${collectionName} extends {id: number | string} ? Collections.${collectionName}['id'] : string | number`,
        }),
    keys: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "keys",
            type: `Collections.${collectionName} extends {id: number | string} ? Collections.${collectionName}['id'][] : string[] | number[]`,
        }),
    item: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "item",
            type: `Partial<Collections.${collectionName}>`,
        }),
    items: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "items",
            type: `Partial<Collections.${collectionName}>[]`,
        }),
    patch: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "patch",
            type: `Partial<Collections.${collectionName}>`,
        }),
    option: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "option",
            type: "Options",
        }),
};

export const GENERICS = {
    Query: <CollectionName extends string>(collectionName: CollectionName) =>
        GenericTypeGenerator.create({
            name: "Query",
            extends: `Directus.Query<Schema, Collections.${collectionName}>`,
        }),
    QueryArray: <CollectionName extends string>(
        collectionName: CollectionName,
    ) =>
        GenericTypeGenerator.create({
            name: "Query",
            extends: `Directus.Query<Schema, Collections.${collectionName}>[]`,
        }),
    AggregateOptions: <CollectionName extends string>(
        collectionName: CollectionName,
    ) =>
        GenericTypeGenerator.create({
            name: "Options",
            extends: `Directus.AggregationOptions<Schema, "${pascalToSnake(collectionName)}">`,
        }),
};

export const capitalize = <S extends string>(s: S): Capitalize<S> =>
    (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<S>;

// First, let's create utility types to help with the transformation
type Split<S extends string> = S extends `${infer First}${infer Rest}`
    ? [First, ...Split<Rest>]
    : [];

type IsUpper<T extends string> =
    T extends Uppercase<T> ? (Lowercase<T> extends T ? false : true) : false;

type JoinWithUnderscore<
    T extends string[],
    Result extends string = "",
> = T extends [infer First extends string, ...infer Rest extends string[]]
    ? IsUpper<First> extends true
        ? Result extends ""
            ? JoinWithUnderscore<Rest, Lowercase<First>>
            : JoinWithUnderscore<Rest, `${Result}_${Lowercase<First>}`>
        : JoinWithUnderscore<Rest, `${Result}${First}`>
    : Result;

// Main type to transform PascalCase to snake_case
export type PascalToSnake<T extends string> = JoinWithUnderscore<Split<T>>;

// Function to convert PascalCase to snake_case
export function pascalToSnake<T extends string>(str: T): PascalToSnake<T> {
    return (
        str
            // Handle consecutive uppercase letters (like in 'API')
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
            // Add underscore before capital letters
            .replace(/([a-z\d])([A-Z])/g, "$1_$2")
            .toLowerCase() as PascalToSnake<T>
    );
}

type JoinWithSpace<T extends string[], Result extends string = ""> = T extends [
    infer First extends string,
    ...infer Rest extends string[],
]
    ? IsUpper<First> extends true
        ? Result extends ""
            ? JoinWithSpace<Rest, First>
            : JoinWithSpace<Rest, `${Result} ${First}`>
        : JoinWithSpace<Rest, `${Result}${First}`>
    : Result;

type PascalToSpace<T extends string> = Lowercase<JoinWithSpace<Split<T>>>;

export function pascalToSpace<T extends string>(str: T): PascalToSpace<T> {
    return (
        str
            // Handle consecutive uppercase letters (like in 'API')
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
            // Add space before capital letters
            .replace(/([a-z\d])([A-Z])/g, "$1 $2")
            .toLowerCase() as PascalToSpace<T>
    );
}

type SnakeToPascal<T extends string> = T extends `${infer First}_${infer Rest}`
    ? `${Capitalize<First>}${SnakeToPascal<Rest>}`
    : Capitalize<T>;

export function snakeToPascal<T extends string>(str: T): SnakeToPascal<T> {
    return str
        .split("_")
        .map((part) => capitalize(part))
        .join("") as SnakeToPascal<T>;
}

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
                        PARAMS.query(collectionName),
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
                VariableDeclaratorGenerator.create(
                    `list${capitalize(collectionName)}`,
                    `read${capitalize(collectionName)}Items`,
                ),
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
                        PARAMS.query(collectionName),
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
                VariableDeclaratorGenerator.create(
                    `read${capitalize(collectionName)}`,
                    `read${capitalize(collectionName)}Item`,
                ),
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
                        PARAMS.query(collectionName),
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
                        PARAMS.query(collectionName),
                    ]),
                    generics: GenericsTypeGenerator.create([
                        GENERICS.QueryArray(collectionName),
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
                        PARAMS.query(collectionName),
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
                        PARAMS.query(collectionName),
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
                        PARAMS.option(collectionName),
                    ]),
                    body: `let toReturn = DirectusSDK.aggregate<Schema, "${pascalToSnake(collectionName)}", Options>("${pascalToSnake(collectionName)}", option);`,
                    returnType: `ReturnType<typeof DirectusSDK.aggregate<Schema, "${pascalToSnake(collectionName)}", Options>>`,
                    return: "toReturn",
                }),
            ),
        ]),
    );
}
