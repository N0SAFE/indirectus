import { LoopGenerator } from "../../../../../other";
import { TemplateGenerator, TemplateStringGenerator } from "../utils";
import { MultiLineGenerator } from "./arrangement.generator";
import { IdentifierGenerator } from "./identifier.generate";

export abstract class StructSuperGenerator<
    Generate = unknown,
    Child extends TemplateGenerator<Generate> | LoopGenerator<unknown[], Generate[]> = TemplateGenerator<Generate> | LoopGenerator<unknown[], Generate[]>
> extends TemplateGenerator<Generate> {
    constructor(protected onlyChild: Child) {
        super();
    }

    generate(): Generate {
        return this.generate();
    }

    // getClosestNonStructChild(): GetClosestNonStructChildRecursive<Child> {
    //     if (this.onlyChild instanceof StructSuperGenerator) {
    //         return this.onlyChild.getClosestNonStructChild() as unknown as GetClosestNonStructChildRecursive<Child>;
    //     }
    //     return this
    //         .onlyChild as unknown as GetClosestNonStructChildRecursive<Child>;
    // }

    // abstract normalize(): StructSuperGenerator<Child>;
}

type Exact<T, U, Y = T, N = never> = T extends U ? Y : N;

export type GetDirectChild<T> =
    T extends StructSuperGenerator<infer Child> ? Child : T;

export type GetFirstStructWithNonStructChild<T> =
    GetDirectChild<T> extends StructSuperGenerator
        ? GetFirstStructWithNonStructChild<GetDirectChild<T>>
        : T;

export type GetClosestNonStructChildRecursive<T> = GetDirectChild<
    GetFirstStructWithNonStructChild<T>
>;

export type IsStructableWithDirectChild<T extends StructSuperGenerator, Child> =
    T extends StructSuperGenerator<Child> ? T : never;

export type IsStructableWithChild<T extends StructSuperGenerator, Child> =
    GetClosestNonStructChildRecursive<T> extends Child ? T : never;

export type ComposeStructableWithChild<
    Child,
    ToCheck = GetClosestNonStructChildRecursive<Child>,
> = Child extends StructSuperGenerator
    ? IsStructableWithChild<Child, ToCheck>
    : Child extends ToCheck
      ? Child
      : never;

class T<Child, Generate = unknown> extends StructSuperGenerator<
    Child,
    Generate
> {
    constructor(child: Child) {
        super(child);
        return;
    }
}

const te = new T(new T(new T({ test: "ui", other: "test" })));

type aa = GetFirstStructWithNonStructChild<typeof te>;
type a = GetClosestNonStructChildRecursive<typeof te>;

function t<T extends IdentifierGenerator>(t: ComposeStructableWithChild<T>) {
    return t;
}

t({} as IdentifierGenerator);
t({} as T<IdentifierGenerator>);
t({} as T<T<MultiLineGenerator>>);

type x = tPrime<T<IdentifierGenerator>>;

type w = IsStructableWithChild<typeof te, { test: string; other: string }>;

type z = ComposeStructableWithChild<T<T<{ test: "ui" }>>>;
