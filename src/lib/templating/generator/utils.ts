import { IdentifierGenerator } from "./struct/identifier.generate";

export type Depths = [-1, 0, 1, 2, 3, 4, 5];
export type GetAllContentToTemplateGeneratorUnion<
    T extends ReturnType<TemplateGenerator["getAllChildren"]>,
> = T extends TemplateGenerator
    ? T
    : T extends TemplateGenerator[]
      ? T[number]
      : never;
export type _RecursiveGet<
    T extends TemplateGenerator,
    Depth extends number = 5,
    ExistAlready extends string = "",
> = Depth extends 0
    ? never
    : T extends TemplateGenerator
      ? T extends IdentifierGenerator
          ? T extends IdentifierGenerator<infer Name, infer Content>
              ? Name extends ExistAlready
                  ? _RecursiveGet<
                        GetAllContentToTemplateGeneratorUnion<
                            ReturnType<T["getAllChildren"]>
                        >,
                        Depths[Depth],
                        ExistAlready
                    >
                  :
                        | { name: Name; content: Content }
                        | _RecursiveGet<
                              GetAllContentToTemplateGeneratorUnion<
                                  ReturnType<T["getAllChildren"]>
                              >,
                              Depths[Depth],
                              ExistAlready | Name
                          >
              : never
          : _RecursiveGet<
                GetAllContentToTemplateGeneratorUnion<
                    ReturnType<T["getAllChildren"]>
                >,
                Depths[Depth],
                ExistAlready
            >
      : never;
export type RecursiveGetHelper<Rec extends { name: string; content: unknown }> =
    {
        [Key in Rec["name"]]: Extract<
            Rec,
            { name: Key; content: unknown }
        >["content"];
    };
export type RecursiveGet<
    T extends TemplateGenerator,
    Rec extends _RecursiveGet<T> = _RecursiveGet<T>,
> = RecursiveGetHelper<Rec>;

export function getChildrenByIdentifier<
    This extends TemplateGenerator,
    Identifier extends keyof RecursiveGet<
        Extract<
            ReturnType<(typeof this)["getAllChildren"]>[number],
            TemplateGenerator
        >
    >,
>(this: This, identifier: Identifier) {
    return this.getAllChildren()
        .map((line) => {
            if (line instanceof TemplateGenerator) {
                return (
                    line.getChildrenByIdentifier as TemplateGenerator["getChildrenByIdentifier"]
                )(identifier);
            }
            return null;
        })
        .filter((line): line is Exclude<typeof line, null> => line !== null)
        .flat() as unknown as RecursiveGet<
        ReturnType<
            (typeof this)["getAllChildren"]
        >[number] extends TemplateGenerator
            ? ReturnType<(typeof this)["getAllChildren"]>[number]
            : never
    >[Identifier][];
}

export abstract class TemplateGenerator<Generate = unknown> {
    abstract clone(): this;

    abstract getChildrenByIdentifier(identifier: string): TemplateGenerator[];

    abstract getAllChildren(): TemplateGenerator[];

    abstract generate(...args: unknown[]): Generate;

    public readonly toString = () => this.generate();
}

export abstract class TemplateStringGenerator extends TemplateGenerator<string> {}

export abstract class TemplateFileGenerator extends TemplateGenerator<void> {
    abstract override generate(basePath: string): Promise<void>;

    abstract dryRun(basePath: string): Promise<void>;

    public override readonly toString = () => undefined as never;
}

export function wrapInParentheses(content: string) {
    return `(${content})`;
}

export function wrapInBrackets(content: string) {
    return `[${content}]`;
}

export function wrapInBraces(content: string) {
    return `{${content}}`;
}
