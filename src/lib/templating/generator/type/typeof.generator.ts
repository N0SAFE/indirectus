import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";
import { TemplateTypescriptTypeGenerator } from "./super.generator";

export class TypeofGenerator<
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
> extends TemplateTypescriptTypeGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private content: Content;

    constructor(content: Content) {
        super();
        this.content = content;
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as TypeofGenerator<NewContent>;
        This.content = content;
        return This;
    }

    generate() {
        return `typeof ${this.content}`;
    }

    clone() {
        return new TypeofGenerator(this.content) as this;
    }

    override getAllChildren() {
        return (
            this.content instanceof TemplateStringGenerator
                ? [this.content]
                : []
        ) as Content extends TemplateStringGenerator ? [Content] : never[];
    }
}
