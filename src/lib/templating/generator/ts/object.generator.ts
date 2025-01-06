import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
    wrapInBraces,
} from "../utils";

export class ObjectGenerator<
    Content extends Record<string, unknown> = {},
    AsConst extends boolean = false,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private content: Content;
    private asConst: AsConst;

    constructor(content: Content, options?: { asConst?: AsConst }) {
        super();
        this.content = content;
        this.asConst = options?.asConst ?? (false as AsConst);
    }

    setContent<NewContent extends Record<string, unknown>>(
        content: NewContent,
    ) {
        const This = this as unknown as ObjectGenerator<NewContent, AsConst>;
        This.content = content;
        return This;
    }

    setAsConst<NewAsConst extends boolean>(asConst: NewAsConst) {
        const This = this as unknown as ObjectGenerator<Content, NewAsConst>;
        This.asConst = asConst;
        return This;
    }

    generate() {
        return `${wrapInBraces(
            Object.entries(this.content)
                .map(([key, value]) => `"${key}": ${value}`)
                .join(", "),
        )}${this.asConst ? " as const" : ""}`;
    }

    clone() {
        return new ObjectGenerator(
            { ...this.content },
            { asConst: this.asConst },
        ) as this;
    }

    override getAllChildren() {
        return Object.values(this.content).filter(
            (value) => value instanceof TemplateGenerator,
        ) as Array<
            {
                [Key in keyof Content]: Content[Key] extends TemplateGenerator
                    ? Content[Key]
                    : never;
            }[keyof Content]
        >;
    }

    static create<
        Content extends Record<string, unknown> = {},
        AsConst extends boolean = false,
    >(content: Content, options?: { asConst?: AsConst }) {
        return new ObjectGenerator(content, options);
    }

    static generate<
        Content extends Record<string, unknown> = {},
        AsConst extends boolean = false,
    >(content: Content, options?: { asConst?: AsConst }) {
        return ObjectGenerator.create(content, options).generate();
    }
}
