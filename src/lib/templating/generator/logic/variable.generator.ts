import {
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class VariableDeclaratorGenerator<
    Variable extends Record<string, unknown> = Record<string, unknown>,
    Callback extends (
        variable: Variable,
    ) =>
        | string
        | TemplateStringGenerator
        | string[]
        | TemplateStringGenerator[] = (
        variable: Variable,
    ) =>
        | string
        | TemplateStringGenerator
        | string[]
        | TemplateStringGenerator[],
> extends TemplateStringGenerator {
    constructor(
        private variable: Variable,
        private callback: Callback,
    ) {
        super();
    }

    setContent<
        NewVariable extends Record<string, unknown>,
        NewContent extends
            | string
            | TemplateStringGenerator
            | string[]
            | TemplateStringGenerator[],
        NewCallback extends (variable: NewVariable) => NewContent,
    >(variable: NewVariable, callback: NewCallback) {
        return new VariableDeclaratorGenerator(variable, callback);
    }

    setCallback<
        NewCallback extends (
            variable: Variable,
        ) =>
            | string
            | TemplateStringGenerator
            | string[]
            | TemplateStringGenerator[],
    >(callback: NewCallback) {
        const This = this as unknown as VariableDeclaratorGenerator<
            Variable,
            NewCallback
        >;
        This.callback = callback;
        return This;
    }

    getVariable() {
        return this.variable;
    }

    getContent() {
        return this.callback(this.variable);
    }

    generate() {
        const content = this.getContent();
        if (Array.isArray(content)) {
            return content.join("");
        }
        return `${content}`;
    }

    clone() {
        return new VariableDeclaratorGenerator(
            { ...this.variable },
            this.callback,
        ) as this;
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
        const content = this.getContent();
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
    }

    static create<
        Variable extends Record<string, unknown>,
        Callback extends (
            variable: Variable,
        ) =>
            | string
            | TemplateStringGenerator
            | string[]
            | TemplateStringGenerator[],
    >(variable: Variable, callback: Callback) {
        return new VariableDeclaratorGenerator(variable, callback);
    }

    static generate<
        Variable extends Record<string, unknown>,
        Callback extends (
            variable: Variable,
        ) =>
            | string
            | TemplateStringGenerator
            | string[]
            | TemplateStringGenerator[],
    >(variable: Variable, callback: Callback) {
        return VariableDeclaratorGenerator.create(variable, callback).generate();
    }
}
