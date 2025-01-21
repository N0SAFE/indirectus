import {
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

type CreateCallbackType<Variable, Output = Variable> = (
    variable: Variable,
    index: number,
    array: Variable[],
) => Output;
export class LoopGenerator<
    Variable = unknown,
    Callback extends CreateCallbackType<
        Variable,
        unknown
    > = CreateCallbackType<Variable>,
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

    setCallback<NewCallback extends (variable: Variable) => unknown>(
        callback: NewCallback,
    ) {
        const This = this as unknown as LoopGenerator<Variable, NewCallback>;
        This.callback = callback;
        return This;
    }

    getVariable() {
        return this.variable;
    }

    loop<
        CallbackLooper extends
            | ((variable: ReturnType<Callback>) => unknown)
            | undefined,
    >(
        callback?: CallbackLooper,
    ): CallbackLooper extends undefined
        ? ReturnType<Callback>[]
        : CallbackLooper extends (variable: ReturnType<Callback>) => unknown
          ? ReturnType<CallbackLooper>[]
          : never {
        const data = this.variable.map(
            this.callback.bind(this),
        ) as ReturnType<Callback>[];
        if (callback) {
            return data.map(callback) as CallbackLooper extends undefined
                ? ReturnType<Callback>[]
                : CallbackLooper extends (
                        variable: ReturnType<Callback>,
                    ) => unknown
                  ? ReturnType<CallbackLooper>[]
                  : never;
        }
        return data as CallbackLooper extends undefined
            ? ReturnType<Callback>[]
            : CallbackLooper extends (variable: ReturnType<Callback>) => unknown
              ? ReturnType<CallbackLooper>[]
              : never;
    }

    generate() {
        return this.loop();
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
        const contents = this.loop();
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
        Variable,
        Callback extends (
            variable: Variable,
            index: number,
            array: Variable[],
        ) => unknown,
    >(variable: Variable[], callback: Callback) {
        return new LoopGenerator<Variable, Callback>(variable, callback);
    }

    static generate<
        Variable,
        Callback extends (
            variable: Variable,
            index: number,
            array: Variable[],
        ) => unknown,
    >(variable: Variable[], callback: Callback) {
        return LoopGenerator.create(variable, callback).generate();
    }

    static toLoop<
        Variable extends unknown[],
        Callback extends (variable: Variable[number]) => unknown,
    >(
        variable: Variable,
        callback: Callback,
    ): LoopGenerator<Variable, Callback>;
    static toLoop<Z extends unknown[]>(array: Z): LoopGenerator<Z[number]>;
    static toLoop<Z extends Loopable<any>>(
        lopable: Z,
    ): Z extends unknown[]
        ? LoopGenerator<unknown, CreateCallbackType<unknown, Z[number]>>
        : Z;
    static toLoop(...args: unknown[]) {
        const [firstArg, ...rest] = args;
        if (rest.length === 1) {
            if (firstArg instanceof Array) {
                if (rest[0] instanceof Function) {
                    return LoopGenerator.create(firstArg, rest[0] as any);
                }
            }
        }
        if (firstArg instanceof Array) {
            return LoopGenerator.create(firstArg, (variable) => variable);
        }
        if (firstArg instanceof LoopGenerator) {
            return firstArg;
        }
        return undefined as never;
    }
}

export type Loopable<T> =
    | T[]
    | LoopGenerator<unknown, CreateCallbackType<unknown, T>>;

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
const z = {} as Loopable<number>;
const gen = LoopGenerator.create(["1", "2", "3"], (content) => {
    return Number(content);
});
console.log(gen)
const v = gen.loop();
const zz = LoopGenerator.toLoop(z);
function t(v: number) {
    return `${v}`;
}
const zzz = zz.loop((v) => `${v}`);
