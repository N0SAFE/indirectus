import { Loopable } from "../logic/loop.generator";
import { Exportable, ExportGenerator } from "../ts/export.generator";
import {
    getChildrenByIdentifier,
    TemplateGenerator,
    TemplateStringGenerator,
    wrapInBraces,
    wrapInBrackets,
} from "../utils";
import { GenericsTypeGenerator } from "./generic.generator";
import { TemplateTypescriptTypeGenerator } from "./super.generator";

export abstract class TemplateTypescriptTypeDeclaratorGenerator extends TemplateStringGenerator {}

export class InterfaceDeclaratorGenerator<
    Name extends string = string,
    Content extends Record<
        string,
        string | TemplateTypescriptTypeGenerator
    > = Record<string, string | TemplateTypescriptTypeGenerator>,
    Extend extends string = string,
    Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
> extends TemplateTypescriptTypeDeclaratorGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private content: Content;
    private extend?: Extend;
    private generics?: Generics;

    constructor(options: {
        name: Name;
        content: Content;
        extend?: Extend;
        generics?: Generics;
    }) {
        super();
        this.name = options.name;
        this.content = options.content;
        this.extend = options.extend;
        this.generics = options.generics;
    }

    override getAllChildren() {
        return (
            this.content instanceof TemplateGenerator ? [this.content] : []
        ) as Content extends TemplateGenerator ? Content[] : [];
    }

    override clone() {
        return new InterfaceDeclaratorGenerator({
            name: this.name,
            content:
                this.content instanceof TemplateGenerator
                    ? this.content.clone()
                    : this.content,
            extend: this.extend,
            generics: this.generics,
        }) as this;
    }

    override generate() {
        return `interface ${this.name}${this.generics ? this.generics : ''}${this.extend ? ` extends ${this.extend}` : ""} ${wrapInBraces(
            `${Object.entries(this.content)
                .map(([key, value]) => `${key}: ${value}`)
                .join(",\n")}`,
        )}`;
    }

    static create<
        Name extends string,
        Content extends Record<
            string,
            string | TemplateTypescriptTypeGenerator
        >,
        Extend extends string,
        Generics extends GenericsTypeGenerator,
    >(options: {
        name: Name;
        content: Content;
        extend?: Extend;
        generics?: Generics;
    }) {
        return new InterfaceDeclaratorGenerator(options);
    }

    static generate<
        Name extends string,
        Content extends Record<
            string,
            string | TemplateTypescriptTypeGenerator
        >,
        Extend extends string,
        Generics extends GenericsTypeGenerator,
    >(options: {
        name: Name;
        content: Content;
        extend?: Extend;
        generics?: Generics;
    }) {
        return InterfaceDeclaratorGenerator.create(options).generate();
    }
}

export class TypeDeclaratorGenerator<
    Name extends string = string,
    Content extends string | TemplateTypescriptTypeGenerator =
        | string
        | TemplateTypescriptTypeGenerator,
    Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
> extends TemplateTypescriptTypeDeclaratorGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private content: Content;
    private generics?: Generics;

    constructor(options: {
        name: Name;
        content: Content;
        generics?: Generics;
    }) {
        super();
        this.name = options.name;
        this.content = options.content;
        this.generics = options.generics;
    }

    override getAllChildren() {
        return [
            ...((this.generics
                ? [this.generics]
                : []) as Generics extends TemplateGenerator
                ? Generics[]
                : never[]),
            ...((this.content instanceof TemplateGenerator
                ? [this.content]
                : []) as Content extends TemplateGenerator
                ? Content[]
                : never[]),
        ];
    }

    override clone() {
        return new TypeDeclaratorGenerator({
            name: this.name,
            content:
                this.content instanceof TemplateGenerator
                    ? this.content.clone()
                    : this.content,
            generics: this.generics,
        }) as this;
    }

    override generate() {
        return `type ${this.name}${this.generics ? this.generics : ''} = ${this.content}`;
    }

    static create<
        Name extends string,
        Content extends string | TemplateTypescriptTypeGenerator,
        Generics extends GenericsTypeGenerator,
    >(options: { name: Name; content: Content; generics?: Generics }) {
        return new TypeDeclaratorGenerator(options);
    }

    static generate<
        Name extends string,
        Content extends string | TemplateTypescriptTypeGenerator,
        Generics extends GenericsTypeGenerator,
    >(options: { name: Name; content: Content; generics?: Generics }) {
        return TypeDeclaratorGenerator.create(options).generate();
    }
}

export class EnumDeclaratorGenerator<
    Name extends string = string,
    Content extends string[] = string[],
> extends TemplateTypescriptTypeDeclaratorGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private content: Content;

    constructor(options: { name: Name; content: Content }) {
        super();
        this.name = options.name;
        this.content = options.content;
    }

    override getAllChildren() {
        return [] as never[];
    }

    override clone() {
        return new EnumDeclaratorGenerator({
            name: this.name,
            content: [...this.content],
        }) as this;
    }

    override generate() {
        return `enum ${this.name} ${wrapInBraces(this.content.join(",\n"))}`;
    }

    static create<Name extends string, Content extends string[]>(options: {
        name: Name;
        content: Content;
    }) {
        return new EnumDeclaratorGenerator(options);
    }

    static generate<Name extends string, Content extends string[]>(options: {
        name: Name;
        content: Content;
    }) {
        return EnumDeclaratorGenerator.create(options).generate();
    }
}

export class NamespaceDeclaratorGenerator<
    Name extends string = string,
    Content extends Loopable<
        string | Exportable<TemplateTypescriptTypeDeclaratorGenerator>
    > = Loopable<
        string | Exportable<TemplateTypescriptTypeDeclaratorGenerator>
    >,
> extends TemplateTypescriptTypeDeclaratorGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private content: Content[];

    constructor(options: { name: Name; content: Content[] }) {
        super();
        this.name = options.name;
        this.content = options.content;
    }

    override getAllChildren() {
        return this.content.filter(
            (line): line is Extract<typeof line, TemplateGenerator> =>
                line instanceof TemplateGenerator,
        );
    }

    override clone() {
        return new NamespaceDeclaratorGenerator({
            name: this.name,
            content: this.content.map((line) =>
                line instanceof TemplateGenerator ? line.clone() : line,
            ),
        }) as this;
    }

    override generate() {
        return `namespace ${this.name} ${wrapInBraces(
            this.content
                .map((line) =>
                    line instanceof TemplateGenerator ? line.generate() : line,
                )
                .join("\n"),
        )}`;
    }

    static create<
        Name extends string,
        Content extends Loopable<
            string | Exportable<TemplateTypescriptTypeDeclaratorGenerator>
        >,
    >(options: { name: Name; content: Content[] }) {
        return new NamespaceDeclaratorGenerator(options);
    }

    static generate<
        Name extends string,
        Content extends Loopable<
            string | Exportable<TemplateTypescriptTypeDeclaratorGenerator>
        >,
    >(options: { name: Name; content: Content[] }) {
        return NamespaceDeclaratorGenerator.create(options).generate();
    }
}

export class ModuleDeclaratorGenerator<
    Name extends string = string,
    Content extends
        | string
        | TemplateTypescriptTypeDeclaratorGenerator
        | ExportGenerator<TemplateTypescriptTypeDeclaratorGenerator> =
        | string
        | TemplateTypescriptTypeDeclaratorGenerator
        | ExportGenerator<TemplateTypescriptTypeDeclaratorGenerator>,
> extends TemplateTypescriptTypeDeclaratorGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private content: Content[];

    constructor(options: { name: Name; content: Content[] }) {
        super();
        this.name = options.name;
        this.content = options.content;
    }

    override getAllChildren() {
        return this.content.filter(
            (line): line is Extract<typeof line, TemplateGenerator> =>
                line instanceof TemplateGenerator,
        );
    }

    override clone() {
        return new ModuleDeclaratorGenerator({
            name: this.name,
            content: this.content.map((line) =>
                line instanceof TemplateGenerator ? line.clone() : line,
            ),
        }) as this;
    }

    override generate() {
        return `module ${this.name} ${wrapInBraces(
            this.content
                .map((line) =>
                    line instanceof TemplateGenerator ? line.generate() : line,
                )
                .join("\n"),
        )}`;
    }

    static create<
        Name extends string,
        Content extends
            | string
            | TemplateTypescriptTypeDeclaratorGenerator
            | ExportGenerator<TemplateTypescriptTypeDeclaratorGenerator>,
    >(options: { name: Name; content: Content[] }) {
        return new ModuleDeclaratorGenerator(options);
    }

    static generate<
        Name extends string,
        Content extends
            | string
            | TemplateTypescriptTypeDeclaratorGenerator
            | ExportGenerator<TemplateTypescriptTypeDeclaratorGenerator>,
    >(options: { name: Name; content: Content[] }) {
        return ModuleDeclaratorGenerator.create(options).generate();
    }
}
