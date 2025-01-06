import {
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export type TemplateGenericType<
    Name extends string = string,
    Extends extends string | undefined = string | undefined,
    Default extends string | undefined = string | undefined,
    AsConst extends boolean = boolean,
> = {
    name: Name;
    extends?: Extends;
    default?: Default;
    asConst?: AsConst;
};

export class GenericTypeGenerator<
    Name extends string = string,
    Extends extends string | undefined = string | undefined,
    Default extends string | undefined = string | undefined,
    AsConst extends boolean = boolean,
> extends TemplateStringGenerator {
    private name: Name;
    private ext?: Extends;
    private def?: Default;
    private asConst: AsConst;

    constructor(generic: TemplateGenericType<Name, Extends, Default, AsConst>) {
        super();
        this.name = generic.name;
        this.ext = generic.extends;
        this.def = generic.default;
        this.asConst = generic.asConst ?? (false as AsConst);
    }

    setName<NewName extends string = string>(name: NewName) {
        const This = this as unknown as GenericTypeGenerator<
            NewName,
            Extends,
            Default
        >;
        This.name = name;
        return This;
    }

    setExtends<NewExtends extends string | undefined = string | undefined>(
        ext: NewExtends,
    ) {
        const This = this as unknown as GenericTypeGenerator<
            Name,
            NewExtends,
            Default
        >;
        This.ext = ext;
        return This;
    }

    setDefault<NewDefault extends string | undefined = string | undefined>(
        def: NewDefault,
    ) {
        const This = this as unknown as GenericTypeGenerator<
            Name,
            Extends,
            NewDefault
        >;
        This.def = def;
        return This;
    }

    setAsConst<NewAsConst extends boolean = boolean>(asConst: NewAsConst) {
        const This = this as unknown as GenericTypeGenerator<
            Name,
            Extends,
            Default,
            NewAsConst
        >;
        This.asConst = asConst;
        return This;
    }

    generate() {
        return `${this.asConst ? "const " : ""}${this.name}${this.ext ? ` extends ${this.ext}` : ""}${this.def ? ` = ${this.def}` : ""}`;
    }

    clone() {
        return new GenericTypeGenerator({
            name: this.name,
            extends: this.ext,
            default: this.def,
        }) as this;
    }

    override getChildrenByIdentifier<
        Identifier extends keyof RecursiveGet<
            Extract<
                ReturnType<this["getAllChildren"]>[number],
                TemplateGenerator
            >
        >,
    >(identifier: Identifier) {
        return this.getAllChildren() as unknown as RecursiveGet<
            ReturnType<this["getAllChildren"]>[number] extends TemplateGenerator
                ? ReturnType<this["getAllChildren"]>[number]
                : never
        >[Identifier][];
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<
        Name extends string = string,
        Extends extends string | undefined = string | undefined,
        Default extends string | undefined = string | undefined,
        AsConst extends boolean = boolean,
    >(generic: TemplateGenericType<Name, Extends, Default, AsConst>) {
        return new GenericTypeGenerator(generic);
    }

    static generate<
        Name extends string = string,
        Extends extends string | undefined = string | undefined,
        Default extends string | undefined = string | undefined,
        AsConst extends boolean = boolean,
    >(generic: TemplateGenericType<Name, Extends, Default, AsConst>) {
        return GenericTypeGenerator.create(generic).generate();
    }
}

export class GenericsTypeGenerator<
    Genenerics extends GenericTypeGenerator = GenericTypeGenerator,
> extends TemplateStringGenerator {
    private generics: Genenerics[] = [];

    constructor(generics: (Genenerics | TemplateGenericType)[]) {
        super();

        this.generics = generics.map((generic) =>
            generic instanceof GenericTypeGenerator
                ? generic
                : GenericTypeGenerator.create(generic),
        ) as Genenerics[];
    }

    setGenerics<
        NewGenerics extends GenericTypeGenerator = GenericTypeGenerator,
    >(generics: (Genenerics | TemplateGenericType)[]) {
        const This = this as unknown as GenericsTypeGenerator<NewGenerics>;
        This.generics = generics.map((generic) =>
            generic instanceof GenericTypeGenerator
                ? generic
                : GenericTypeGenerator.create(generic),
        ) as NewGenerics[];
        return This;
    }

    addGeneric<NewGeneric extends GenericTypeGenerator = GenericTypeGenerator>(
        generic: Genenerics | TemplateGenericType,
    ) {
        const This = this as unknown as GenericsTypeGenerator<
            Genenerics | NewGeneric
        >;
        This.generics.push(
            generic instanceof GenericTypeGenerator
                ? generic
                : (GenericTypeGenerator.create(generic) as
                      | Genenerics
                      | NewGeneric),
        );
        return This;
    }

    generate() {
        if (this.generics.length === 0) {
            return "";
        }
        return `<${this.generics.map((g) => g.generate()).join(", ")}>`;
    }

    clone() {
        return new GenericsTypeGenerator([...this.generics]) as this;
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
            ReturnType<this["getAllChildren"]>[number] extends TemplateGenerator
                ? ReturnType<this["getAllChildren"]>[number]
                : never
        >[Identifier][];
    }

    override getAllChildren() {
        return this.generics;
    }

    static create<
        Genenerics extends GenericTypeGenerator = GenericTypeGenerator,
    >(generics: (Genenerics | TemplateGenericType)[]) {
        return new GenericsTypeGenerator(generics);
    }

    static generate<
        Genenerics extends GenericTypeGenerator = GenericTypeGenerator,
    >(generics: (Genenerics | TemplateGenericType)[]) {
        return GenericsTypeGenerator.create(generics).generate();
    }
}
