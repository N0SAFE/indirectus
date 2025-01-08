import { TemplateGenerator, TemplateStringGenerator } from "../utils";
import { MultiLineGenerator } from "./arrangement.generator";
import { IdentifierGenerator } from "./identifier.generate";

export abstract class StructSuperGenerator<
    Child extends TemplateGenerator = TemplateGenerator,
    Generate = unknown,
> extends TemplateGenerator<Generate> {
    constructor(private onlyChild: Child) {
        super();
    }

    getClosestNonStructChild(): GetClosestNonStructChildRecursive<this> {
        if (this.onlyChild instanceof StructSuperGenerator) {
            return this.onlyChild.getClosestNonStructChild() as unknown as GetClosestNonStructChildRecursive<this>;
        }
        return this
            .onlyChild as unknown as GetClosestNonStructChildRecursive<this>;
    }
}

type Exact<T, U, Y = T, N = never> = T extends U ? Y : N;

type StructableWithChild<Child extends TemplateGenerator, ToCheck extends TemplateGenerator = TemplateGenerator> = ToCheck | Exact<GetClosestNonStructChildRecursive<Child>, ToCheck, Child>;

export type GetClosestNonStructChildRecursive<T extends TemplateGenerator> =
    T extends StructSuperGenerator<infer Child>
        ? Child extends StructSuperGenerator
            ? GetClosestNonStructChildRecursive<Child>
            : Child
        : never;

class T<
    Child extends TemplateGenerator = TemplateGenerator,
    Generate = unknown,
> extends StructSuperGenerator<Child, Generate> {
    constructor(child: Child) {
        super(child);
    }
}

const te = new T(new T(new MultiLineGenerator([])))

type e = GetClosestNonStructChildRecursive<typeof te>;

function t<T extends TemplateGenerator>(t: StructableWithChild<T, MultiLineGenerator>) {
    return t
}


t({} as MultiLineGenerator)
t({} as T<MultiLineGenerator>)
t({} as T<T<MultiLineGenerator>>)

type z = StructableWithChild<T<T<MultiLineGenerator>>, IdentifierGenerator>