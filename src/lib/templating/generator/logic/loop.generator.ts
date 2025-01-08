import {
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class LoopGenerator<
    Variable = any,
    Output = unknown,
    Callback extends (
        this: LoopGenerator<Variable, Output, Callback>,
        variable: Variable,
        index: number,
        array: Variable[],
    ) => Output = (variable: Variable) => Output,
> extends TemplateGenerator {
    constructor(
        private variable: Variable[],
        private callback: Callback,
    ) {
        super();
    }

    setContent<
        NewVariable extends unknown[],
        NewOutput,
        NewCallback extends (variable: NewVariable[number]) => NewOutput,
    >(variable: NewVariable, callback: NewCallback) {
        return new LoopGenerator(variable, callback);
    }

    setCallback<
        NewOutput,
        NewCallback extends (variable: Variable) => NewOutput,
    >(callback: NewCallback) {
        const This = this as unknown as LoopGenerator<
            Variable,
            NewOutput,
            NewCallback
        >;
        This.callback = callback;
        return This;
    }

    getVariable() {
        return this.variable;
    }

    getContent() {
        return this.variable.map(this.callback.bind(this));
    }

    generate() {
        return this.getContent();
    }

    clone() {
        return new LoopGenerator({ ...this.variable }, this.callback) as this;
    }

    override getChildrenByIdentifier<
        Identifier extends keyof RecursiveGet<
            Extract<
                ReturnType<this["getAllChildren"]>[number],
                TemplateGenerator
            >
        >,
    >(identifier: Identifier) {
        return this.getAllChildren()
            .map((line) => {
                if (line instanceof TemplateGenerator) {
                    return line.getChildrenByIdentifier(identifier);
                }
                return null;
            })
            .filter((line): line is Exclude<typeof line, null> => line !== null)
            .flat() as unknown as RecursiveGet<
            ReturnType<this["getAllChildren"]>[number]
        >[Identifier][];
    }

    override getAllChildren(): ReturnType<Callback> extends unknown[]
        ? ReturnType<Callback>[number] extends TemplateGenerator
            ? ReturnType<Callback>[number][]
            : never[]
        : ReturnType<Callback> extends TemplateGenerator
          ? ReturnType<Callback>[]
          : never[] {
        const contents = this.getContent();
        return contents.filter((content) => {
            if (Array.isArray(content)) {
                return content.filter(
                    (line): line is TemplateStringGenerator =>
                        line instanceof TemplateStringGenerator,
                ) as ReturnType<Callback> extends unknown[]
                    ? ReturnType<Callback>[number] extends TemplateGenerator
                        ? ReturnType<Callback>[number][]
                        : never[]
                    : ReturnType<Callback> extends TemplateGenerator
                      ? ReturnType<Callback>[]
                      : never[];
            }
            if (content instanceof TemplateStringGenerator) {
                return [content] as ReturnType<Callback> extends unknown[]
                    ? ReturnType<Callback>[number] extends TemplateGenerator
                        ? ReturnType<Callback>[number][]
                        : never[]
                    : ReturnType<Callback> extends TemplateGenerator
                      ? ReturnType<Callback>[]
                      : never[];
            }
            return [] as ReturnType<Callback> extends unknown[]
                ? ReturnType<Callback>[number] extends TemplateGenerator
                    ? ReturnType<Callback>[number][]
                    : never[]
                : ReturnType<Callback> extends TemplateGenerator
                  ? ReturnType<Callback>[]
                  : never[];
        }) as ReturnType<Callback> extends unknown[]
            ? ReturnType<Callback>[number] extends TemplateGenerator
                ? ReturnType<Callback>[number][]
                : never[]
            : ReturnType<Callback> extends TemplateGenerator
              ? ReturnType<Callback>[]
              : never[];
    }

    static create<
        Variable extends unknown[],
        Callback extends (variable: Variable[number]) => unknown,
    >(variable: Variable, callback: Callback) {
        return new LoopGenerator(variable, callback);
    }

    static generate<
        Variable extends unknown[],
        Callback extends (variable: Variable[number]) => unknown,
    >(variable: Variable, callback: Callback) {
        return LoopGenerator.create(variable, callback).generate();
    }

    static toLoopable<
        Variable extends unknown[],
        Callback extends (variable: Variable[number]) => unknown,
    >(
        variable: Variable,
        callback: Callback,
    ): LoopGenerator<Variable, Callback>;
    static toLoopable<Z extends unknown[], G extends Z | LoopGenerator<Z>>(
        array: G,
    ): G extends Z ? LoopGenerator<G> : G;
    static toLoopable(...args: unknown[]) {
        const [firstArg, ...rest] = args;
        if (rest.length === 1) {
            if (firstArg instanceof Array) {
                return LoopGenerator.create(firstArg, rest[0] as any);
            }
            if (firstArg instanceof LoopGenerator) {
                return firstArg;
            }
        }
        if (firstArg instanceof Array) {
            return LoopGenerator.create(firstArg, (variable) => variable);
        }
        return undefined as never;
    }
}

export type Loopable<T extends unknown, Output = unknown> = T[] | LoopGenerator<T[], Output>;

// const loop = LoopGenerator.create([1, 2, 3] as const, (content) => {
//     return IdentifierGenerator.create(
//         `content${content}`,
//         MultiLineGenerator.create([`${content}`]),
//     );
// });
// const t = loop.getChildrenByIdentifier("content2");

const e = new LoopGenerator([1, 2, 3] as const, (content) => {
    return content;
});
e.generate();

type e = Loopable<number>;
const z = {} as Loopable<number, string>;
const zz = LoopGenerator.toLoopable(z);
const a = zz.getContent();
