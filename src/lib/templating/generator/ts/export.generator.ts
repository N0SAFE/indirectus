import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class ExportGenerator<
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
    Default extends boolean = false,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private content: Content;
    private default: Default;

    constructor(content: Content, options?: { default?: Default }) {
        super();
        this.content = content;
        this.default = options?.default ?? (false as Default);
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as ExportGenerator<NewContent, Default>;
        This.content = content;
        return This;
    }

    setDefault<NewDefault extends boolean>(defaultValue: NewDefault) {
        const This = this as unknown as ExportGenerator<Content, NewDefault>;
        This.default = defaultValue;
        return This;
    }

    generate() {
        return `export ${this.default ? "default " : ""}${this.content}`;
    }

    clone() {
        return new ExportGenerator(
            typeof this.content === "string"
                ? this.content
                : this.content.clone(),
            { default: this.default },
        ) as this;
    }

    override getAllChildren(): Content extends TemplateGenerator
        ? Content[]
        : [] {
        return (
            this.content instanceof TemplateGenerator ? [this.content] : []
        ) as Content extends TemplateGenerator ? Content[] : [];
    }

    static create<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        Default extends boolean = false,
    >(content: Content, options?: { default?: Default }) {
        return new ExportGenerator(content, options);
    }

    static generate<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        Default extends boolean = false,
    >(content: Content, options?: { default?: Default }) {
        return ExportGenerator.create(content, options).generate();
    }
}

export type Exportable<T extends string | TemplateStringGenerator> =
    | T
    | ExportGenerator<T>;
