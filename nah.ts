export type IsStructableWithChild<T extends StructSuperGenerator, Child> = GetClosestNonStructChildRecursive<T> extends Child ? T : never;

export type ComposeStructableWithChild<
    Child,
    ToCheck = GetClosestNonStructChildRecursive<Child>,
> = Child extends StructSuperGenerator ? IsStructableWithChild<Child, ToCheck> : Child extends ToCheck ? Child : never;

export type GetClosestNonStructChildRecursive<T> =
    T extends StructSuperGenerator<infer Child>
        ? Child extends StructSuperGenerator
            ? GetClosestNonStructChildRecursive<Child>
            : Child
        : T;

// Types utilitaires
type InferElementType<T> = T extends readonly (infer U)[]
    ? U extends StructSuperGenerator<any, any, any>
        ? InferElementType<ReturnType<U['getCallback']>>
        : U
    : T extends StructSuperGenerator<any, any, any>
      ? InferElementType<ReturnType<T['getCallback']>>
      : T;

type ResolveType<T, R extends (...args: any) => any> = ReturnType<R>;


// LoopGenerator reste largement identique
export class LoopGenerator<
    T extends
        | readonly (StructSuperGenerator<any, any, any> | unknown)[]
        | StructSuperGenerator<any, any, any>,
    R extends (variable: InferElementType<T>) => unknown = (
        variable: InferElementType<T>
    ) => unknown
> extends StructSuperGenerator<unknown, T, R> {
    constructor(source: T, callback: R) {
        super(source, callback);
    }

    protected createInstance<NewT, NewR extends (...args: any) => any>(
        source: NewT,
        callback: NewR
    ): LoopGenerator<NewT, NewR> {
        return new LoopGenerator(source, callback);
    }
}


// Exemple d'utilisation
class CustomStruct extends StructSuperGenerator<unknown, number> {
    constructor(value: number) {
        super(value);
    }

    createInstance<T, R extends (...args: any) => any>(
        source: T,
        callback: R
    ): StructSuperGenerator<unknown, T, R> {
        return new CustomStruct(source as number);
    }
}

// Tests
const simpleLoop = new LoopGenerator([1, 2, 3], n => n * 2);

const nestedLoop = new LoopGenerator([
    new LoopGenerator([1, 2], n => n * 2),
    new LoopGenerator([3, 4], n => n * 3)
], n => n);

const mixedLoop = new LoopGenerator([
    new CustomStruct(1),
    new LoopGenerator([2, 3], n => n * 2),
    new CustomStruct(4)
], n => n * 2);

// Vérification des types
type SimpleType = InferElementType<typeof simpleLoop>;        // number
type NestedType = InferElementType<typeof nestedLoop>;       // number
type MixedType = InferElementType<typeof mixedLoop>;         // number

// Résolution
const resolvedSimple = simpleLoop.resolve();                 // [2, 4, 6]
const resolvedNested = nestedLoop.resolve();                 // [2, 4, 9, 12]
const resolvedMixed = mixedLoop.resolve();                   // [2, 4, 6, 8]

// Chaînage
const chainedLoop = mixedLoop
    .chain(n => n.toString())
    .chain(s => parseInt(s));
