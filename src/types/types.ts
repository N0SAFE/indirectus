import type { Registry } from "./registry";
import type { Schema } from "./schema";

// credits goes to https://stackoverflow.com/a/50375286
export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;

// Converts union to overloaded function
export type UnionToOvlds<U> = UnionToIntersection<
    U extends any ? (f: U) => void : never
>;

export type PopUnion<U> =
    UnionToOvlds<U> extends (a: infer A) => void ? A : never;

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me)
export type UnionToArray<T, A extends unknown[] = []> =
    IsUnion<T> extends true
        ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
        : [T, ...A];

export type IntersectArray<A extends unknown[]> = A extends [
    infer F,
    ...infer R,
]
    ? F & IntersectArray<R>
    : {};

export type ArrayContains<
    T extends unknown[],
    U,
    Y = true,
    N = false,
> = U extends T[number] ? Y : N;

export type ArrayExtends<
    T extends unknown[],
    U,
    Output extends {
        [K in keyof T]: T[K] extends U ? T[K] : never;
    }[number] = {
        [K in keyof T]: T[K] extends U ? T[K] : never;
    }[number],
> = Output;

// sample = [
// '10.0.0'
// '10.1.0',
// '10.2.0',
// '11.0.0'
// ]

// example : GetHighestVersion<["10.0.0", "10.1.0", "10.2.0", "11.0.0"]> => "11.0.0"
// example : GetLowestVersion<["10.0.0", "10.1.0", "10.2.0", "11.0.0"]> => "10.0.0"
// example : GetClosestHigherVersion<["10.0.0", "10.1.0", "10.2.0", "11.0.0"], "10.1.0"> => "10.2.0"
// example : GetClosestLowerVersion<["10.0.0", "10.1.0", "10.2.0", "11.0.0"], "10.1.0"> => "10.0.0"

// First, let's create a helper type to convert string to number array
// Create a type that builds arrays of specified length
type BuildArray<
    L extends number,
    Arr extends unknown[] = [],
> = Arr["length"] extends L ? Arr : BuildArray<L, [...Arr, unknown]>;

// Convert string to number
type ToNumber<S extends string> = S extends `${infer N extends number}`
    ? N
    : never;

// Compare two numbers using array length
type IsEqual<A extends number, B extends number> =
    BuildArray<A> extends [...BuildArray<B>]
        ? BuildArray<B> extends [...BuildArray<A>]
            ? true
            : false
        : false;

type IsGreaterThan<A extends number, B extends number> =
    BuildArray<A> extends [...BuildArray<B>, ...unknown[]] ? true : false;

type IsLessThan<A extends number, B extends number> =
    BuildArray<B> extends [...BuildArray<A>, ...unknown[]] ? true : false;

// Main comparison type
type Compare<A extends string, B extends string> = {
    equal: IsEqual<ToNumber<A>, ToNumber<B>>;
    greater: IsGreaterThan<ToNumber<A>, ToNumber<B>>;
    less: IsLessThan<ToNumber<A>, ToNumber<B>>;
} extends infer R
    ? R extends {
          equal: true;
          greater: true;
          less: true;
      }
        ? {
              equal: true;
              greater: false;
              less: false;
          }
        : R
    : never;

export type Version = `${number}.${number}.${number}`;
export type CompareVersions<
    A extends Version,
    B extends Version,
> = A extends `${infer A1}.${infer A2}.${infer A3}`
    ? B extends `${infer B1}.${infer B2}.${infer B3}`
        ? Compare<A1, B1> extends { equal: true }
            ? Compare<A2, B2> extends { equal: true }
                ? Compare<A3, B3>
                : Compare<A2, B2>
            : Compare<A1, B1>
        : never
    : never;

// type A = CompareVersions<"10.0.0", "10.1.0">; // { equal: false, greater: false, less: true }
// type B = CompareVersions<"10.0.0", "10.0.0">; // { equal: true, greater: false, less: false }

export type GetHighestVersion<Versions extends Version[]> = Versions extends [
    infer F,
    ...infer R,
]
    ? F extends Version
        ? R extends Version[]
            ? CompareVersions<F, GetHighestVersion<R>> extends { greater: true }
                ? F
                : GetHighestVersion<R>
            : never
        : never
    : never;

export type GetLowestVersion<Versions extends Version[]> = Versions extends [
    infer F,
    ...infer R,
]
    ? F extends Version
        ? R extends Version[]
            ? CompareVersions<F, GetLowestVersion<R>> extends { less: true }
                ? F
                : GetLowestVersion<R>
            : never
        : never
    : never;

// type C = GetHighestVersion<["10.0.0", "10.1.0", "10.2.0", "11.0.0"]>; // "11.0.0"
// type D = GetLowestVersion<["10.0.0", "10.1.0", "10.2.0", "11.0.0"]>; // "10.0.0"

export type GetClosestHigherVersion<
    Versions extends Version[],
    V extends Version,
> = Versions extends [infer F, ...infer R]
    ? F extends Version
        ? R extends Version[]
            ? CompareVersions<F, V> extends { greater: true }
                ? F
                : GetClosestHigherVersion<R, V>
            : never
        : never
    : never;

export type GetClosestLowerVersion<
    Versions extends Version[],
    V extends Version,
> = Versions extends [infer F, ...infer R]
    ? F extends Version
        ? R extends Version[]
            ? CompareVersions<F, V> extends { less: true }
                ? F
                : GetClosestLowerVersion<R, V>
            : never
        : never
    : never;

// type E = GetClosestLowerVersion<
//   ["10.0.0", "10.1.0", "10.2.0", "11.0.0"],
//   "10.1.0"
// >; // "10.0.0"
// type F = GetClosestHigherVersion<
//   ["10.0.0", "10.1.0", "10.2.0", "11.0.0"],
//   "10.1.0"
// >; // "10.2.0"
