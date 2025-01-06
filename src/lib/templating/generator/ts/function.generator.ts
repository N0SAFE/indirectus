import { MultiLineGenerator } from "../struct/arrangement.generator";
import {
    GenericTypeGenerator,
    GenericsTypeGenerator,
    TemplateGenericType,
} from "../type/generic.generator";
import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
    wrapInBraces,
    wrapInParentheses,
} from "../utils";

type RT<T extends (...args: any) => any> = ReturnType<T>;

export type TemplateFunctionParam<
    Name extends string = string,
    Type extends string = string,
    Optional extends boolean = boolean,
    DefaultValue extends string = string,
> = {
    name: Name;
    type?: Type;
    optional?: Optional;
    defaultValue?: DefaultValue;
};

export class FunctionParamGenerator<
    Name extends string = string,
    Type extends string = string,
    Optional extends boolean = boolean,
    DefaultValue extends string = string,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name = "" as Name;
    private type = "" as Type;
    private optional = false as Optional;
    private defaultValue = "" as DefaultValue;

    constructor(
        param: TemplateFunctionParam<Name, Type, Optional, DefaultValue>,
    ) {
        super();
        this.name = param.name;
        this.type = param.type ?? ("" as Type);
        this.optional = param.optional ?? (false as Optional);
        this.defaultValue = param.defaultValue ?? ("" as DefaultValue);
    }

    setName<NewNamen extends string>(name: NewNamen) {
        const This = this as unknown as FunctionParamGenerator<
            NewNamen,
            Type,
            Optional,
            DefaultValue
        >;
        This.name = name;
        return This;
    }

    setType<NewType extends string>(type: NewType) {
        const This = this as unknown as FunctionParamGenerator<
            Name,
            NewType,
            Optional,
            DefaultValue
        >;
        This.type = type;
        return This;
    }

    setOptional<NewOptional extends boolean>(optional: NewOptional) {
        const This = this as unknown as FunctionParamGenerator<
            Name,
            Type,
            NewOptional,
            DefaultValue
        >;
        This.optional = optional;
        return This;
    }

    setDefaultValue<NewDefault extends string>(defaultValue: NewDefault) {
        const This = this as unknown as FunctionParamGenerator<
            Name,
            Type,
            Optional,
            NewDefault
        >;
        This.defaultValue = defaultValue;
        return This;
    }

    generate() {
        return `${this.name}${this.optional ? "?" : ""}${this.type ? `: ${this.type}` : ""}${this.defaultValue ? ` = ${this.defaultValue}` : ""}`;
    }

    clone() {
        return new FunctionParamGenerator({
            name: this.name,
            type: this.type,
            optional: this.optional,
            defaultValue: this.defaultValue,
        }) as this;
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<
        Name extends string = string,
        Type extends string = string,
        Optional extends boolean = boolean,
        DefaultValue extends string = string,
    >(param: TemplateFunctionParam<Name, Type, Optional, DefaultValue>) {
        return new FunctionParamGenerator(param);
    }

    static generate<
        Name extends string = string,
        Type extends string = string,
        Optional extends boolean = boolean,
        DefaultValue extends string = string,
    >(param: TemplateFunctionParam<Name, Type, Optional, DefaultValue>) {
        return FunctionParamGenerator.create(param).generate();
    }
}

export class FunctionParamsGenerator<
    Param extends FunctionParamGenerator = FunctionParamGenerator,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private params: Param[] = [];

    constructor(params: (TemplateFunctionParam | Param)[]) {
        super();
        this.params = params.map((param) =>
            param instanceof FunctionParamGenerator
                ? param
                : FunctionParamGenerator.create(param),
        ) as Param[];
    }

    setParams<NewParam extends FunctionParamGenerator = FunctionParamGenerator>(
        params: NewParam[],
    ) {
        const This = this as unknown as FunctionParamsGenerator<NewParam>;
        This.params = params;
        return This;
    }

    addParam<NewParam extends FunctionParamGenerator = FunctionParamGenerator>(
        param: FunctionParamGenerator,
    ) {
        const This = this as unknown as FunctionParamsGenerator<NewParam>;
        This.params.push(param as NewParam);
        return This;
    }

    generate() {
        return this.params.map((param) => param.generate()).join(", ");
    }

    clone() {
        return new FunctionParamsGenerator([...this.params]) as this;
    }

    override getAllChildren() {
        return this.params;
    }

    static create<
        Param extends FunctionParamGenerator = FunctionParamGenerator,
    >(params: (Param | TemplateFunctionParam)[]) {
        return new FunctionParamsGenerator(params);
    }

    static generate<
        Param extends FunctionParamGenerator = FunctionParamGenerator,
    >(params: (Param | TemplateFunctionParam)[]) {
        return FunctionParamsGenerator.create(params).generate();
    }
}

export class FunctionGenerator<
    Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
    Params extends FunctionParamsGenerator = FunctionParamsGenerator,
    ReturnType extends string = string,
    Return extends string = string,
    Body extends MultiLineGenerator = MultiLineGenerator,
    IsAsync extends boolean = boolean,
    IsArrow extends boolean = boolean,
    IsGenerator extends boolean = boolean,
    Name extends string | undefined = undefined,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private generics: Generics = new GenericsTypeGenerator(
        [],
    ) as unknown as Generics;
    private params: Params;
    private return: Return;
    private returnType: ReturnType;
    private body: Body;
    private isAsync = false as IsAsync;
    private isArrow = false as IsArrow;
    private isGenerator = false as IsGenerator;
    private name?: Name;

    constructor(options: {
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionParam[];
        return?: Return;
        returnType?: ReturnType;
        body: Body | string;
        isAsync?: IsAsync;
        isArrow?: IsArrow;
        isGenerator?: IsGenerator;
        name?: Name;
    }) {
        super();
        this.generics =
            options.generics instanceof GenericsTypeGenerator
                ? options.generics
                : (new GenericsTypeGenerator(
                      options.generics ?? [],
                  ) as Generics);
        this.params =
            options.params instanceof FunctionParamsGenerator
                ? options.params
                : (new FunctionParamsGenerator(options.params ?? []) as Params);
        this.returnType = options.returnType ?? ("" as ReturnType);
        this.return = options.return ?? ("" as Return);
        this.body =
            options.body instanceof MultiLineGenerator
                ? options.body
                : (new MultiLineGenerator([options.body]) as unknown as Body);
        this.isAsync = options.isAsync ?? (false as IsAsync);
        this.isArrow = options.isArrow ?? (false as IsArrow);
        this.isGenerator = options.isGenerator ?? (false as IsGenerator);
        this.name = options.name;
    }

    setGenerics<
        NewGenerics extends GenericsTypeGenerator = GenericsTypeGenerator,
    >(generics: NewGenerics) {
        const This = this as unknown as FunctionGenerator<
            NewGenerics,
            Params,
            ReturnType,
            Return,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Name
        >;
        This.generics = generics;
        return This;
    }

    setParams<
        NewParams extends FunctionParamsGenerator = FunctionParamsGenerator,
    >(params: NewParams) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            NewParams,
            ReturnType,
            Return,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Name
        >;
        This.params = params;
        return This;
    }

    setReturn<NewReturn extends string = string>(returnVal: NewReturn) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            Params,
            ReturnType,
            NewReturn,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Name
        >;
        This.return = returnVal;
        return This;
    }

    setReturnType<NewReturnType extends string = string>(
        returnType: NewReturnType,
    ) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            Params,
            NewReturnType,
            Return,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Name
        >;
        This.returnType = returnType;
        return This;
    }

    setBody<
        NewBody extends MultiLineGenerator | string =
            | MultiLineGenerator
            | string,
    >(body: NewBody) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            Params,
            ReturnType,
            Return,
            NewBody extends string
                ? MultiLineGenerator<string>
                : MultiLineGenerator,
            IsAsync,
            IsArrow,
            IsGenerator,
            Name
        >;
        This.body =
            typeof body === "string"
                ? (new MultiLineGenerator([
                      body,
                  ]) as unknown as NewBody extends string
                      ? MultiLineGenerator<string>
                      : MultiLineGenerator)
                : (body as unknown as NewBody extends string
                      ? MultiLineGenerator<string>
                      : MultiLineGenerator);
        return This;
    }

    setIsAsync<NewIsAsync extends boolean = boolean>(isAsync: NewIsAsync) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            Params,
            ReturnType,
            Return,
            Body,
            NewIsAsync,
            IsArrow,
            IsGenerator,
            Name
        >;
        This.isAsync = isAsync;
        return This;
    }

    setIsArrow<NewIsArrow extends boolean = boolean>(isArrow: NewIsArrow) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            Params,
            ReturnType,
            Return,
            Body,
            IsAsync,
            NewIsArrow,
            IsGenerator,
            Name
        >;
        This.isArrow = isArrow;
        return This;
    }

    setIsGenerator<NewIsGenerator extends boolean = boolean>(
        isGenerator: NewIsGenerator,
    ) {
        const This = this as unknown as FunctionGenerator<
            Generics,
            Params,
            ReturnType,
            Return,
            Body,
            IsAsync,
            IsArrow,
            NewIsGenerator,
            Name
        >;
        This.isGenerator = isGenerator;
        return This;
    }

    addParam(param: FunctionParamGenerator) {
        this.params.addParam(param);
        return this;
    }

    addGeneric(generic: GenericTypeGenerator | TemplateGenericType) {
        this.generics.addGeneric(generic);
        return this;
    }

    generate() {
        return `${this.isAsync ? "async " : ""}${this.isArrow ? "" : "function"}${this.isGenerator ? "* " : ""}${" " + (this.name ?? "")}${this.generics.generate()}${wrapInParentheses(this.params.generate())}${this.returnType ? `:${this.returnType}` : ""} ${this.isArrow ? "=>" : ""} ${wrapInBraces(`${this.body}${this.return ? `\nreturn ${this.return};` : ""}`)}`;
    }

    clone() {
        return new FunctionGenerator({
            generics: this.generics.clone(),
            params: this.params.clone(),
            returnType: this.returnType,
            return: this.return,
            body: this.body.clone(),
            isAsync: this.isAsync,
            isArrow: this.isArrow,
            isGenerator: this.isGenerator,
            name: this.name,
        }) as this;
    }

    override getAllChildren() {
        return [
            this.generics,
            this.params,
            ...(this.body instanceof TemplateGenerator ? [this.body] : []),
        ];
    }

    static create<
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Params extends FunctionParamsGenerator = FunctionParamsGenerator,
        ReturnType extends string = string,
        Return extends string = string,
        Body extends MultiLineGenerator | string = MultiLineGenerator | string,
        IsAsync extends boolean = boolean,
        IsArrow extends boolean = boolean,
        IsGenerator extends boolean = boolean,
        Name extends string | undefined = undefined,
    >(options: {
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionParam[];
        return?: Return;
        returnType?: ReturnType;
        body: Body;
        isAsync?: IsAsync;
        isArrow?: IsArrow;
        isGenerator?: IsGenerator;
        name?: Name;
    }) {
        return new FunctionGenerator(options);
    }

    static generate<
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Params extends FunctionParamsGenerator = FunctionParamsGenerator,
        ReturnType extends string = string,
        Return extends string = string,
        Body extends MultiLineGenerator | string = MultiLineGenerator | string,
        IsAsync extends boolean = boolean,
        IsArrow extends boolean = boolean,
        IsGenerator extends boolean = boolean,
        Name extends string | undefined = undefined,
    >(options: {
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionParam[];
        return?: Return;
        returnType?: ReturnType;
        body: Body;
        isAsync?: IsAsync;
        isArrow?: IsArrow;
        isGenerator?: IsGenerator;
        name?: Name;
    }) {
        return FunctionGenerator.create({
            generics: options.generics,
            params: options.params,
            returnType: options.returnType,
            return: options.return,
            body: options.body,
            isAsync: options.isAsync,
            isArrow: options.isArrow,
            isGenerator: options.isGenerator,
            name: options.name,
        }).generate();
    }
}
