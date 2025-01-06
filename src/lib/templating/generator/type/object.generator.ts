import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
    wrapInBraces,
} from "../utils";
import { TemplateTypescriptTypeDeclaratorGenerator } from "./declarator.generator";

export class ObjectTypeGenerator<
    Content extends Record<string, string | TemplateTypescriptTypeDeclaratorGenerator> = {},
    AsConst extends boolean = false,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private content: Content;

    constructor(content: Content) {
        super();
        this.content = content;
    }

    setContent<NewContent extends Record<string, string | TemplateTypescriptTypeDeclaratorGenerator>>(
        content: NewContent,
    ) {
        const This = this as unknown as ObjectTypeGenerator<NewContent, AsConst>;
        This.content = content;
        return This;
    }

    generate() {
        return `${wrapInBraces(
            Object.entries(this.content)
                .map(([key, value]) => `"${key}": ${value}`)
                .join(", "),
        )}`;
    }

    clone() {
        return new ObjectTypeGenerator(
            { ...this.content },
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
        Content extends Record<string, string | TemplateTypescriptTypeDeclaratorGenerator> = {},
    >(content: Content) {
        return new ObjectTypeGenerator(content);
    }

    static generate<
        Content extends Record<string, string | TemplateTypescriptTypeDeclaratorGenerator> = {},
    >(content: Content) {
        return ObjectTypeGenerator.create(content).generate();
    }
}
