import { FunctionParamGenerator } from "@/lib/templating/generator/ts/function.generator";
import { GenericTypeGenerator } from "@/lib/templating/generator/type/generic.generator";
import { singular } from "pluralize";

export const PARAMS = {
    query: <CollectionName extends string>() =>
        FunctionParamGenerator.create({
            name: "query",
            type: "Query",
            optional: true,
        }),
    key: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "key",
            type: `Collections.${singular(collectionName)} extends {id: number | string} ? Collections.${singular(collectionName)}['id'] : string | number`,
        }),
    keys: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "keys",
            type: `Collections.${singular(collectionName)} extends {id: number | string} ? Collections.${singular(collectionName)}['id'][] : string[] | number[]`,
        }),
    item: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "item",
            type: `Partial<Collections.${singular(collectionName)}>`,
        }),
    items: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "items",
            type: `Partial<Collections.${singular(collectionName)}>[]`,
        }),
    patch: <CollectionName extends string>(collectionName: CollectionName) =>
        FunctionParamGenerator.create({
            name: "patch",
            type: `Partial<Collections.${singular(collectionName)}>`,
        }),
    option: <CollectionName extends string>() =>
        FunctionParamGenerator.create({
            name: "option",
            type: "Options",
        }),
};

export const GENERICS = {
    Query: <CollectionName extends string>(collectionName: CollectionName) =>
        GenericTypeGenerator.create({
            name: "Query",
            extends: `Directus.Query<Schema, Collections.${singular(collectionName)}>`,
        }),
    QueryArray: <CollectionName extends string>(
        collectionName: CollectionName,
    ) =>
        GenericTypeGenerator.create({
            name: "Query",
            extends: `Directus.Query<Schema, Collections.${singular(collectionName)}>[]`,
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
export type Split<S extends string> = S extends `${infer First}${infer Rest}`
    ? [First, ...Split<Rest>]
    : [];

export type IsUpper<T extends string> =
    T extends Uppercase<T> ? (Lowercase<T> extends T ? false : true) : false;

export type JoinWithUnderscore<
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

export type JoinWithSpace<T extends string[], Result extends string = ""> = T extends [
    infer First extends string,
    ...infer Rest extends string[],
]
    ? IsUpper<First> extends true
        ? Result extends ""
            ? JoinWithSpace<Rest, First>
            : JoinWithSpace<Rest, `${Result} ${First}`>
        : JoinWithSpace<Rest, `${Result}${First}`>
    : Result;

export type PascalToSpace<T extends string> = Lowercase<JoinWithSpace<Split<T>>>;

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

export type SnakeToPascal<T extends string> = T extends `${infer First}_${infer Rest}`
    ? `${Capitalize<First>}${SnakeToPascal<Rest>}`
    : Capitalize<T>;

export function snakeToPascal<T extends string>(str: T): SnakeToPascal<T> {
    return str
        .split("_")
        .map((part) => capitalize(part))
        .join("") as SnakeToPascal<T>;
}