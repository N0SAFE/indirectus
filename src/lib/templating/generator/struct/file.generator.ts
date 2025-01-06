import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class FileGenerator<
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    constructor(private content: Content[]) {
        super();
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent[],
    ) {
        const This = this as unknown as FileGenerator<NewContent>;
        This.content = content;
        return This;
    }

    addContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as FileGenerator<NewContent>;
        This.content.push(content);
        return This;
    }

    generate() {
        return [...this.content, ""].join("\n");
    }

    clone() {
        return new FileGenerator([...this.content]) as this;
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
    >(content: Content[]) {
        return new FileGenerator(content);
    }

    static generate<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
    >(content: Content[]) {
        return FileGenerator.create(content).generate();
    }
}
