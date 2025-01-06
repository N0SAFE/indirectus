import { getChildrenByIdentifier, RecursiveGet, TemplateGenerator } from "../utils";

export class NunjucksBlockGenerator<
    Name extends string = string,
    Content extends TemplateGenerator | string = TemplateGenerator | string,
> extends TemplateGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private name: Name;
    private content: Content;
    constructor(name: Name, content: Content) {
        super();
        this.name = name;
        this.content = content;
    }

    setName<NewName extends string>(name: NewName) {
        const This = this as unknown as NunjucksBlockGenerator<
            NewName,
            Content
        >;
        This.name = name;
        return This;
    }

    setContent<NewContent extends TemplateGenerator | string>(
        content: NewContent,
    ) {
        const This = this as unknown as NunjucksBlockGenerator<
            Name,
            NewContent
        >;
        This.content = content;
        return This;
    }

    generate() {
        return `{% block ${this.name} %}${this.content}{% endblock %}`;
    }

    clone() {
        return new NunjucksBlockGenerator(
            this.name,
            this.content instanceof TemplateGenerator
                ? this.content.clone()
                : this.content,
        ) as unknown as this;
    }

    override getAllChildren() {
        return (
            this.content instanceof TemplateGenerator ? [this.content] : []
        ) as Content extends TemplateGenerator ? [Content] : never[];
    }

    static create<
        Name extends string,
        Content extends TemplateGenerator | string,
    >(name: Name, content: Content) {
        return new NunjucksBlockGenerator(name, content);
    }

    static generator<
        Name extends string,
        Content extends TemplateGenerator | string,
    >(name: Name, content: Content) {
        return NunjucksBlockGenerator.create(name, content);
    }
}
