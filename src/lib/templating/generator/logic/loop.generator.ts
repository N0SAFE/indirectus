import {
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class LoopGenerator<
    Variable extends unknown[] = unknown[],
    Callback extends (variable: Variable[number]) => unknown = (
        variable: Variable[number],
    ) => unknown,
> extends TemplateGenerator {
    constructor(
        private variable: Variable,
        private callback: Callback,
    ) {
        super();
    }

    setContent<
        NewVariable extends unknown[],
        NewCallback extends (variable: NewVariable[number]) => unknown,
    >(variable: NewVariable, callback: NewCallback) {
        return new LoopGenerator(variable, callback);
    }

    setCallback<NewCallback extends (variable: Variable[number]) => unknown>(
        callback: NewCallback,
    ) {
        const This = this as unknown as LoopGenerator<Variable, NewCallback>;
        This.callback = callback;
        return This;
    }

    getVariable() {
        return this.variable;
    }

    getContent() {
        return this.variable.map((variable) => this.callback(variable));
    }

    generate() {
        const contents = this.getContent();
        return contents.map((content) => {
            if (Array.isArray(content)) {
                return content.join("");
            }
            return `${content}`;
        });
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
}

export type Loopable<T extends unknown> = T | LoopGenerator<any[], (variable: any) => T>;

// const loop = LoopGenerator.create([1, 2, 3] as const, (content) => {
//     return IdentifierGenerator.create(
//         `content${content}`,
//         MultiLineGenerator.create([`${content}`]),
//     );
// });
// const t = loop.getChildrenByIdentifier("content2");
