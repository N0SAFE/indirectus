import { TemplateTypescriptTypeDeclaratorGenerator } from "../type/declarator.generator";
import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class VariableDeclaratorGenerator<
    Name extends string = string,
    Value extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
    Keyword extends "let" | "const" | "var" = "let",
    Type extends string | TemplateTypescriptTypeDeclaratorGenerator =
        | string
        | TemplateTypescriptTypeDeclaratorGenerator,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private value: Value;
    private keyword: Keyword;
    private type?: Type;

    constructor(options: {
        name: Name;
        value: Value;
        keyword?: Keyword;
        type?: Type;
    }) {
        super();
        this.name = options.name;
        this.keyword = options.keyword ?? ("let" as Keyword);
        this.value = options.value;
        this.type = options.type;
    }

    setName<NewName extends string>(name: NewName) {
        const This = this as unknown as VariableDeclaratorGenerator<
            NewName,
            Value,
            Keyword
        >;
        This.name = name;
        return This;
    }

    setKeyword<NewKeyword extends "let" | "const" | "var">(
        keyword: NewKeyword,
    ) {
        const This = this as unknown as VariableDeclaratorGenerator<
            Name,
            Value,
            NewKeyword
        >;
        This.keyword = keyword;
        return This;
    }

    setValue<NewValue extends string | TemplateStringGenerator>(
        value: NewValue,
    ) {
        const This = this as unknown as VariableDeclaratorGenerator<
            Name,
            NewValue,
            Keyword
        >;
        This.value = value;
        return This;
    }

    setType<NewType extends string | TemplateTypescriptTypeDeclaratorGenerator>(
        type: NewType,
    ) {
        const This = this as unknown as VariableDeclaratorGenerator<
            Name,
            Value,
            Keyword,
            NewType
        >;
        This.type = type;
        return This;
    }

    generate() {
        return `${this.keyword} ${this.name}${this.type ? `: ${this.type} ` : ""} = ${this.value instanceof TemplateStringGenerator ? this.value.generate() : this.value};`;
    }

    clone() {
        return new VariableDeclaratorGenerator({
            name: this.name,
            value: this.value,
            keyword: this.keyword,
            type: this.type,
        }) as this;
    }

    override getAllChildren(): Value extends TemplateGenerator ? Value[] : [] {
        return (
            this.value instanceof TemplateGenerator ? [this.value] : []
        ) as Value extends TemplateGenerator ? Value[] : [];
    }

    static create<
        Name extends string = string,
        Value extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        Keyword extends "let" | "const" | "var" = "let",
        Type extends string | TemplateTypescriptTypeDeclaratorGenerator =
            | string
            | TemplateTypescriptTypeDeclaratorGenerator,
    >(options: { name: Name; value: Value; keyword?: Keyword; type?: Type }) {
        return new VariableDeclaratorGenerator(options);
    }

    static generate<
        Name extends string = string,
        Value extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        Keyword extends "let" | "const" | "var" = "let",
        Type extends string | TemplateTypescriptTypeDeclaratorGenerator =
            | string
            | TemplateTypescriptTypeDeclaratorGenerator,
    >(options: { name: Name; value: Value; keyword?: Keyword; type?: Type }) {
        return VariableDeclaratorGenerator.create(options).generate();
    }
}
