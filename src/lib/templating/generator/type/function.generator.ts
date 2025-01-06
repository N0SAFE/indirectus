import {
    RecursiveGet,
    TemplateGenerator,
    getChildrenByIdentifier,
    wrapInParentheses,
} from "../utils";
import {
    GenericsTypeGenerator,
    TemplateGenericType,
    GenericTypeGenerator,
} from "./generic.generator";
import { TemplateTypescriptTypeGenerator } from "./super.generator";

export type TemplateFunctionTypeParam<
    Name extends string = string,
    Type extends string = string,
    Optional extends boolean = boolean,
> = {
    name: Name;
    type?: Type;
    optional?: Optional;
};

export class FunctionTypeParamGenerator<
    Name extends string = string,
    Type extends string = string,
    Optional extends boolean = boolean,
> extends TemplateTypescriptTypeGenerator {
    private name = "" as Name;
    private type = "" as Type;
    private optional = false as Optional;

    constructor(param: TemplateFunctionTypeParam<Name, Type, Optional>) {
        super();
        this.name = param.name;
        this.type = param.type ?? ("" as Type);
        this.optional = param.optional ?? (false as Optional);
    }

    setName<NewNamen extends string>(name: NewNamen) {
        const This = this as unknown as FunctionTypeParamGenerator<
            NewNamen,
            Type,
            Optional
        >;
        This.name = name;
        return This;
    }

    setType<NewType extends string>(type: NewType) {
        const This = this as unknown as FunctionTypeParamGenerator<
            Name,
            NewType,
            Optional
        >;
        This.type = type;
        return This;
    }

    setOptional<NewOptional extends boolean>(optional: NewOptional) {
        const This = this as unknown as FunctionTypeParamGenerator<
            Name,
            Type,
            NewOptional
        >;
        This.optional = optional;
        return This;
    }

    generate() {
        return `${this.name}${this.optional ? "?" : ""}${this.type ? `: ${this.type}` : ""}`;
    }

    clone() {
        return new FunctionTypeParamGenerator({
            name: this.name,
            type: this.type,
            optional: this.optional,
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
        Type extends string = string,
        Optional extends boolean = boolean,
    >(param: TemplateFunctionTypeParam<Name, Type, Optional>) {
        return new FunctionTypeParamGenerator(param);
    }

    static generate<
        Name extends string = string,
        Type extends string = string,
        Optional extends boolean = boolean,
    >(param: TemplateFunctionTypeParam<Name, Type, Optional>) {
        return FunctionTypeParamGenerator.create(param).generate();
    }
}

export class FunctionTypeParamsGenerator<
    Param extends FunctionTypeParamGenerator = FunctionTypeParamGenerator,
> extends TemplateTypescriptTypeGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private params: Param[] = [];

    constructor(params: (TemplateFunctionTypeParam | Param)[]) {
        super();
        this.params = params.map((param) =>
            param instanceof FunctionTypeParamGenerator
                ? param
                : FunctionTypeParamGenerator.create(param),
        ) as Param[];
    }

    setParams<
        NewParam extends
            FunctionTypeParamGenerator = FunctionTypeParamGenerator,
    >(params: NewParam[]) {
        const This = this as unknown as FunctionTypeParamsGenerator<NewParam>;
        This.params = params;
        return This;
    }

    addParam<
        NewParam extends
            FunctionTypeParamGenerator = FunctionTypeParamGenerator,
    >(param: FunctionTypeParamGenerator) {
        const This = this as unknown as FunctionTypeParamsGenerator<NewParam>;
        This.params.push(param as NewParam);
        return This;
    }

    generate() {
        return this.params.map((param) => param.generate()).join(", ");
    }

    clone() {
        return new FunctionTypeParamsGenerator([...this.params]) as this;
    }

    override getAllChildren() {
        return this.params;
    }

    static create<
        Param extends FunctionTypeParamGenerator = FunctionTypeParamGenerator,
    >(params: (Param | TemplateFunctionTypeParam)[]) {
        return new FunctionTypeParamsGenerator(params);
    }

    static generate<
        Param extends FunctionTypeParamGenerator = FunctionTypeParamGenerator,
    >(params: (Param | TemplateFunctionTypeParam)[]) {
        return FunctionTypeParamsGenerator.create(params).generate();
    }
}

export class FunctionTypeGenerator<
    Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
    Params extends FunctionTypeParamsGenerator = FunctionTypeParamsGenerator,
    Return extends string = string,
> extends TemplateTypescriptTypeGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private generics: Generics = new GenericsTypeGenerator(
        [],
    ) as unknown as Generics;
    private params: Params;
    private return: Return;

    constructor(options: {
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionTypeParam[];
        return?: Return;
    }) {
        super();
        this.generics =
            options.generics instanceof GenericsTypeGenerator
                ? options.generics
                : (new GenericsTypeGenerator(
                      options.generics ?? [],
                  ) as Generics);
        this.params =
            options.params instanceof FunctionTypeParamsGenerator
                ? options.params
                : (new FunctionTypeParamsGenerator(
                      options.params ?? [],
                  ) as Params);
        this.return = options.return ?? ("" as Return);
    }

    setGenerics<
        NewGenerics extends GenericsTypeGenerator = GenericsTypeGenerator,
    >(generics: NewGenerics) {
        const This = this as unknown as FunctionTypeGenerator<
            NewGenerics,
            Params,
            Return
        >;
        This.generics = generics;
        return This;
    }

    setParams<
        NewParams extends
            FunctionTypeParamsGenerator = FunctionTypeParamsGenerator,
    >(params: NewParams) {
        const This = this as unknown as FunctionTypeGenerator<
            Generics,
            NewParams,
            Return
        >;
        This.params = params;
        return This;
    }

    addParam(param: FunctionTypeParamGenerator) {
        this.params.addParam(param);
        return this;
    }

    addGeneric(generic: GenericTypeGenerator | TemplateGenericType) {
        this.generics.addGeneric(generic);
        return this;
    }

    generate() {
        return `${this.generics.generate()}${wrapInParentheses(this.params.generate())} => ${this.return}`;
    }

    clone() {
        return new FunctionTypeGenerator({
            generics: this.generics.clone(),
            params: this.params.clone(),
            return: this.return,
        }) as this;
    }

    override getAllChildren() {
        return [this.generics, this.params];
    }

    static create<
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Params extends
            FunctionTypeParamsGenerator = FunctionTypeParamsGenerator,
        Return extends string = string,
    >(options: {
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionTypeParam[];
        return?: Return;
    }) {
        return new FunctionTypeGenerator(options);
    }

    static generate<
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Params extends
            FunctionTypeParamsGenerator = FunctionTypeParamsGenerator,
        Return extends string = string,
    >(options: {
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionTypeParam[];
        return?: Return;
    }) {
        return FunctionTypeGenerator.create({
            generics: options.generics,
            params: options.params,
            return: options.return,
        }).generate();
    }
}
