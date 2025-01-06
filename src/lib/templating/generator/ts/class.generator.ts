import { CommentGenerator } from "./comment.generator";
import {
    FunctionGenerator,
    TemplateFunctionParam,
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "./function.generator";
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
import { MultiLineGenerator } from "../struct/arrangement.generator";
import { IdentifierGenerator } from "../struct/identifier.generate";

type RT<T extends (...args: any) => any> = ReturnType<T>;

export class ClassMethodGenerator<
    Name extends string = string,
    Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
    Params extends FunctionParamsGenerator = FunctionParamsGenerator,
    Return extends string = string,
    ReturnType extends string = string,
    Body extends MultiLineGenerator = MultiLineGenerator,
    IsAsync extends boolean = boolean,
    IsArrow extends boolean = boolean,
    IsGenerator extends boolean = boolean,
    Protection extends "public" | "private" | "protected" =
        | "public"
        | "private"
        | "protected",
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private generics?: Generics;
    private params?: Params;
    private return?: Return;
    private returnType?: ReturnType;
    private body: Body;
    private isAsync = false as IsAsync;
    private isArrow = false as IsArrow;
    private isGenerator = false as IsGenerator;
    private protection: Protection = "public" as Protection;

    constructor(options: {
        name: Name;
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionParam[];
        return?: Return;
        returnType?: ReturnType;
        body: Body | string | string[];
        isAsync?: IsAsync;
        isArrow?: IsArrow;
        isGenerator?: IsGenerator;
        protection?: Protection;
    }) {
        super();
        this.name = options.name;
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
        this.return = options.return;
        this.returnType = options.returnType;
        this.body =
            options.body instanceof MultiLineGenerator
                ? options.body
                : (new MultiLineGenerator(
                      Array.isArray(options.body)
                          ? options.body
                          : [options.body],
                  ) as Body);
        this.isAsync = options.isAsync ?? this.isAsync;
        this.isArrow = options.isArrow ?? this.isArrow;
        this.isGenerator = options.isGenerator ?? this.isGenerator;
        this.protection = options.protection ?? this.protection;
    }

    setName<NewName extends string>(name: NewName) {
        const This = this as unknown as ClassMethodGenerator<
            NewName,
            Generics,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator
        >;
        This.name = name;
        return This;
    }

    getName() {
        return this.name;
    }

    setGenerics<NewGenerics extends GenericsTypeGenerator>(
        generics: NewGenerics,
    ) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            NewGenerics,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.generics = generics;
        return This;
    }

    addGeneric<NewGeneric extends GenericTypeGenerator>(generic: NewGeneric) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            GenericsTypeGenerator<
                Generics extends GenericsTypeGenerator<infer R>
                    ? R
                    : never | NewGeneric
            >,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.generics?.addGeneric(
            generic as unknown as Generics extends GenericsTypeGenerator<
                infer R
            >
                ? R
                : never | NewGeneric,
        );
        return This;
    }

    getGenerics() {
        return this.generics;
    }

    setParams<
        NewParams extends FunctionParamsGenerator = FunctionParamsGenerator,
    >(params: NewParams) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            NewParams,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.params = params;
        return This;
    }

    addParam<NewParam extends FunctionParamGenerator = FunctionParamGenerator>(
        param: NewParam,
    ) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            FunctionParamsGenerator<
                Params extends FunctionParamsGenerator<infer R>
                    ? R
                    : never | NewParam
            >,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.params?.addParam(param);
        return This;
    }

    getParams() {
        return this.params;
    }

    setReturnType<NewReturnType extends string = string>(
        returnType: NewReturnType,
    ) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            Params,
            Return,
            NewReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.returnType = returnType;
        return This;
    }

    getReturnType() {
        return this.returnType;
    }

    setBody<NewBody extends MultiLineGenerator = MultiLineGenerator>(
        body: string | NewBody,
    ) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            Params,
            Return,
            ReturnType,
            NewBody,
            IsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.body =
            body instanceof MultiLineGenerator
                ? body
                : (new MultiLineGenerator([body]) as NewBody);
        return This;
    }

    addBody(body: string) {
        this.body.addLine(body);
        return this;
    }

    getBody() {
        return this.body;
    }

    setIsAsync<NewIsAsync extends boolean>(isAsync: NewIsAsync) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            Params,
            Return,
            ReturnType,
            Body,
            NewIsAsync,
            IsArrow,
            IsGenerator,
            Protection
        >;
        This.isAsync = isAsync;
        return This;
    }

    getIsAsync() {
        return this.isAsync;
    }

    setIsArrow<NewIsArrow extends boolean>(isArrow: NewIsArrow) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            NewIsArrow,
            IsGenerator,
            Protection
        >;
        This.isArrow = isArrow;
        return This;
    }

    getIsArrow() {
        return this.isArrow;
    }

    setIsGenerator<NewIsGenerator extends boolean>(
        isGenerator: NewIsGenerator,
    ) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            NewIsGenerator,
            Protection
        >;
        This.isGenerator = isGenerator;
        return This;
    }

    getIsGenerator() {
        return this.isGenerator;
    }

    setProtection<NewProtection extends "public" | "private" | "protected">(
        protection: NewProtection,
    ) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            Generics,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator,
            NewProtection
        >;
        This.protection = protection;
        return This;
    }

    generate() {
        return this.isArrow
            ? `${this.protection} ${this.name} = ${FunctionGenerator.generate({
                  generics: this.generics,
                  params: this.params,
                  return: this.return,
                  returnType: this.returnType,
                  body: this.body,
                  isAsync: this.isAsync,
                  isArrow: this.isArrow,
                  isGenerator: this.isGenerator,
              })}`
            : `${this.protection} ${this.isAsync ? "async " : ""}${this.isGenerator ? "* " : ""}${this.name}${this.generics?.generate()}${wrapInParentheses(this.params?.generate() || "")}${this.returnType ? `: ${this.returnType}` : ""} ${wrapInBraces(`${this.body}\n${this.return}`)}`;
    }

    clone() {
        return new ClassMethodGenerator({
            name: this.name,
            generics: this.generics?.clone(),
            params: this.params?.clone(),
            return: this.return,
            returnType: this.returnType,
            body: this.body.clone(),
            isAsync: this.isAsync,
            isArrow: this.isArrow,
            isGenerator: this.isGenerator,
            protection: this.protection,
        }) as this;
    }

    override getAllChildren() {
        return [
            ...(this.generics ? [this.generics] : []),
            ...(this.params ? [this.params] : []),
            this.body,
        ];
    }

    static create<
        Name extends string = string,
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Params extends FunctionParamsGenerator = FunctionParamsGenerator,
        Return extends string = string,
        ReturnType extends string = string,
        Body extends MultiLineGenerator = MultiLineGenerator,
        IsAsync extends boolean = boolean,
        IsArrow extends boolean = boolean,
        IsGenerator extends boolean = boolean,
        Protection extends "public" | "private" | "protected" =
            | "public"
            | "private"
            | "protected",
    >(options: {
        name: Name;
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionParam[];
        return?: Return;
        returnType?: ReturnType;
        body: Body | string | string[];
        isAsync?: IsAsync;
        isArrow?: IsArrow;
        isGenerator?: IsGenerator;
        protection?: Protection;
    }) {
        return new ClassMethodGenerator(options);
    }

    static generate<
        Name extends string = string,
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Params extends FunctionParamsGenerator = FunctionParamsGenerator,
        Return extends string = string,
        ReturnType extends string = string,
        Body extends MultiLineGenerator = MultiLineGenerator,
        IsAsync extends boolean = boolean,
        IsArrow extends boolean = boolean,
        IsGenerator extends boolean = boolean,
        Protection extends "public" | "private" | "protected" =
            | "public"
            | "private"
            | "protected",
    >(options: {
        name: Name;
        generics?: Generics | TemplateGenericType[];
        params?: Params | TemplateFunctionParam[];
        return?: Return;
        returnType?: ReturnType;
        body: Body | string | string[];
        isAsync?: IsAsync;
        isArrow?: IsArrow;
        isGenerator?: IsGenerator;
        protection?: Protection;
    }) {
        return ClassMethodGenerator.create(options).generate();
    }
}

export class ClassPropertyGenerator<
    Name extends string = string,
    Type extends string = string,
    Optional extends boolean = boolean,
    DefaultValue extends string = string,
    Protection extends "public" | "private" | "protected" =
        | "public"
        | "private"
        | "protected",
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private name: Name;
    private type?: Type;
    private optional?: Optional;
    private defaultValue?: DefaultValue;
    private protection: Protection;

    constructor(options: {
        name: Name;
        type?: Type;
        optional?: Optional;
        defaultValue?: DefaultValue;
        protection?: Protection;
    }) {
        super();
        this.name = options.name;
        this.type = options.type;
        this.optional = options.optional ?? (false as Optional);
        this.defaultValue = options.defaultValue;
        this.protection = options.protection ?? ("public" as Protection);
    }

    setName<NewName extends string = string>(name: NewName) {
        const This = this as unknown as ClassPropertyGenerator<
            NewName,
            Type,
            Optional,
            DefaultValue,
            Protection
        >;
        This.name = name;
        return This;
    }

    setType<NewType extends string = string>(type: NewType) {
        const This = this as unknown as ClassPropertyGenerator<
            Name,
            NewType,
            Optional,
            DefaultValue,
            Protection
        >;
        This.type = type;
        return This;
    }

    setOptional<NewOptional extends boolean = boolean>(optional: NewOptional) {
        const This = this as unknown as ClassPropertyGenerator<
            Name,
            Type,
            NewOptional,
            DefaultValue,
            Protection
        >;
        This.optional = optional;
        return This;
    }

    setDefaultValue<NewDefaultValue extends string = string>(
        defaultValue: NewDefaultValue,
    ) {
        const This = this as unknown as ClassPropertyGenerator<
            Name,
            Type,
            Optional,
            NewDefaultValue,
            Protection
        >;
        This.defaultValue = defaultValue;
        return This;
    }

    setProtection<NewProtection extends "public" | "private" | "protected">(
        protection: NewProtection,
    ) {
        const This = this as unknown as ClassPropertyGenerator<
            Name,
            Type,
            Optional,
            DefaultValue,
            NewProtection
        >;
        This.protection = protection;
        return This;
    }

    generate() {
        return `${this.protection} ${this.name}${this.optional ? "?" : ""}${this.type ? `: ${this.type}` : ""}${this.defaultValue ? ` = ${this.defaultValue}` : ""}`;
    }

    clone() {
        return new ClassPropertyGenerator({
            name: this.name,
            type: this.type,
            optional: this.optional,
            defaultValue: this.defaultValue,
            protection: this.protection,
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
        Protection extends "public" | "private" | "protected" =
            | "public"
            | "private"
            | "protected",
    >(options: {
        name: Name;
        type?: Type;
        optional?: Optional;
        defaultValue?: DefaultValue;
        protection?: Protection;
    }) {
        return new ClassPropertyGenerator(options);
    }

    static generate<
        Name extends string = string,
        Type extends string = string,
        Optional extends boolean = boolean,
        DefaultValue extends string = string,
        Protection extends "public" | "private" | "protected" =
            | "public"
            | "private"
            | "protected",
    >(options: {
        name: Name;
        type?: Type;
        optional?: Optional;
        defaultValue?: DefaultValue;
        protection?: Protection;
    }) {
        return ClassPropertyGenerator.create(options).generate();
    }
}

// export function generateClass({
//   name,
//   generics = [],
//   properties = [],
//   methods = [],
//   extended = "",
//   implemented = [],
// }: {
//   name: string;
//   generics?: TemplateGenericType[];
//   properties?: TemplateFunctionParam[];
//   methods?: ReturnType<typeof generateMethod>[];
//   extended?: string;
//   implemented?: string[];
// }) {
//   return `class ${name}${generateGenerics(generics)}${extended ? ` extends ${extended}` : ""}${implemented.length > 0 ? ` implements ${implemented.join(", ")}` : ""} ${wrapInBraces(`
//           ${properties.map((prop) => generateProperty(prop)).join("\n")}
//           ${methods.map((method) => method).join("\n")}
//       `)}`;
// }

export class ClassGenerator<
    Name extends string = string,
    Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
    Properties extends MultiLineGenerator<
        | ClassPropertyGenerator
        | IdentifierGenerator<string, ClassPropertyGenerator>
        | MultiLineGenerator<
              | CommentGenerator
              | ClassPropertyGenerator
              | IdentifierGenerator<string, ClassPropertyGenerator>
          >
    > = MultiLineGenerator<
        | ClassPropertyGenerator
        | IdentifierGenerator<string, ClassPropertyGenerator>
        | MultiLineGenerator<
              | CommentGenerator
              | ClassPropertyGenerator
              | IdentifierGenerator<string, ClassPropertyGenerator>
          >
    >,
    Methods extends MultiLineGenerator<
        | ClassMethodGenerator
        | IdentifierGenerator<string, ClassMethodGenerator>
        | MultiLineGenerator<
              | CommentGenerator
              | ClassMethodGenerator
              | IdentifierGenerator<string, ClassMethodGenerator>
          >
    > = MultiLineGenerator<
        | ClassMethodGenerator
        | IdentifierGenerator<string, ClassMethodGenerator>
        | MultiLineGenerator<
              | CommentGenerator
              | ClassMethodGenerator
              | IdentifierGenerator<string, ClassMethodGenerator>
          >
    >,
    Extended extends string = string,
    Implemented extends string = string,
    Content extends string = string,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private content?: Content;
    private generics: Generics;
    private properties: Properties;
    private methods: Methods;
    private extended = "" as Extended;
    private implemented = [] as Implemented[];

    constructor(
        private name: Name,
        options?: {
            generics?: Generics | TemplateGenericType[];
            extended?: Extended;
            implemented?: Implemented[];
            properties?:
                | Properties
                | (
                      | ClassPropertyGenerator
                      | IdentifierGenerator<string, ClassPropertyGenerator>
                      | Parameters<typeof ClassPropertyGenerator.generate>[0]
                      | MultiLineGenerator<
                            | CommentGenerator
                            | ClassPropertyGenerator
                            | IdentifierGenerator<
                                  string,
                                  ClassPropertyGenerator
                              >
                        >
                  )[];
            methods?:
                | Methods
                | (
                      | ClassMethodGenerator
                      | IdentifierGenerator<string, ClassMethodGenerator>
                      | Parameters<typeof ClassMethodGenerator.generate>[0]
                      | MultiLineGenerator<
                            | CommentGenerator
                            | ClassMethodGenerator
                            | IdentifierGenerator<string, ClassMethodGenerator>
                        >
                  )[];
            content?: Content;
        },
    ) {
        super();
        this.generics =
            options?.generics instanceof GenericsTypeGenerator
                ? options.generics
                : ((GenericsTypeGenerator.create(options?.generics ?? []) ??
                      new GenericsTypeGenerator([])) as Generics);
        this.extended = options?.extended ?? ("" as Extended);
        this.implemented = options?.implemented ?? [];
        this.properties = (
            Array.isArray(options?.properties)
                ? MultiLineGenerator.create(
                      options?.properties?.map((prop) =>
                          prop instanceof MultiLineGenerator
                              ? prop
                              : prop instanceof ClassPropertyGenerator
                                ? prop
                                : prop instanceof IdentifierGenerator
                                  ? prop
                                  : ClassPropertyGenerator.create(prop),
                      ),
                  )
                : (options?.properties ?? MultiLineGenerator.create([]))
        ) as Properties;
        this.methods = (
            Array.isArray(options?.methods)
                ? MultiLineGenerator.create(
                      options?.methods?.map((method) =>
                          method instanceof MultiLineGenerator
                              ? method
                              : method instanceof ClassMethodGenerator
                                ? method
                                : method instanceof IdentifierGenerator
                                  ? method
                                  : ClassMethodGenerator.create(method),
                      ),
                  )
                : (options?.methods ?? MultiLineGenerator.create([]))
        ) as Methods;
        this.content = options?.content;
    }

    setName<NewName extends string = string>(name: NewName) {
        const This = this as unknown as ClassGenerator<
            NewName,
            Generics,
            Properties,
            Methods,
            Extended,
            Implemented,
            Content
        >;
        This.name = name;
        return This;
    }

    getName() {
        return this.name;
    }

    setGenerics<
        NewGenerics extends GenericsTypeGenerator = GenericsTypeGenerator,
    >(generics: NewGenerics) {
        const This = this as unknown as ClassGenerator<
            Name,
            NewGenerics,
            Properties,
            Methods,
            Extended,
            Implemented,
            Content
        >;
        This.generics = generics;
        return This;
    }

    addGeneric<
        NewGeneric extends
            | GenericTypeGenerator
            | TemplateGenericType = GenericTypeGenerator,
    >(generic: TemplateGenericType | NewGeneric) {
        const This = this as unknown as ClassGenerator<
            Name,
            GenericsTypeGenerator<
                Generics extends GenericsTypeGenerator<infer R>
                    ? R
                    : never | NewGeneric
            >,
            Properties,
            Methods,
            Extended,
            Implemented,
            Content
        >;
        This.generics.addGeneric(
            generic as unknown as Generics extends GenericsTypeGenerator<
                infer R
            >
                ? R
                : never | NewGeneric,
        );
        return This;
    }

    getGenerics() {
        return this.generics;
    }

    setExtended<NewExtended extends string = string>(extended: NewExtended) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            Properties,
            Methods,
            NewExtended,
            Implemented,
            Content
        >;
        This.extended = extended;
        return This;
    }

    getExtended() {
        return this.extended;
    }

    setImplemented<NewImplemented extends string = string>(
        implemented: NewImplemented[],
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            Properties,
            Methods,
            Extended,
            NewImplemented,
            Content
        >;
        This.implemented = implemented;
        return This;
    }

    addImplemented<NewImplemented extends string = string>(
        implemented: NewImplemented,
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            Properties,
            Methods,
            Extended,
            Implemented | NewImplemented,
            Content
        >;
        This.implemented.push(implemented);
        return This;
    }

    getImplemented() {
        return this.implemented;
    }

    setProperties<
        NewProperties extends MultiLineGenerator<
            | ClassPropertyGenerator
            | IdentifierGenerator<string, ClassPropertyGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassPropertyGenerator
                  | IdentifierGenerator<string, ClassPropertyGenerator>
              >
        > = MultiLineGenerator<
            | ClassPropertyGenerator
            | IdentifierGenerator<string, ClassPropertyGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassPropertyGenerator
                  | IdentifierGenerator<string, ClassPropertyGenerator>
              >
        >,
    >(
        properties:
            | NewProperties
            | (
                  | ClassPropertyGenerator
                  | Parameters<typeof ClassPropertyGenerator.generate>[0]
                  | IdentifierGenerator<string, ClassPropertyGenerator>
                  | MultiLineGenerator<
                        | CommentGenerator
                        | ClassPropertyGenerator
                        | IdentifierGenerator<string, ClassPropertyGenerator>
                    >
              )[],
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            NewProperties,
            Methods,
            Extended,
            Implemented,
            Content
        >;
        This.properties = (
            Array.isArray(properties)
                ? MultiLineGenerator.create(
                      properties.map((prop) =>
                          prop instanceof MultiLineGenerator
                              ? prop
                              : prop instanceof ClassPropertyGenerator
                                ? prop
                                : prop instanceof IdentifierGenerator
                                  ? prop
                                  : ClassPropertyGenerator.create(prop),
                      ),
                  )
                : properties
        ) as NewProperties;
        return This;
    }

    addProperty<NewProperty extends ClassPropertyGenerator>(
        property:
            | NewProperty
            | Parameters<typeof ClassPropertyGenerator.generate>[0],
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            MultiLineGenerator<
                Properties extends MultiLineGenerator<infer R>
                    ? R
                    : never | NewProperty
            >,
            Methods,
            Extended,
            Implemented,
            Content
        >;
        This.properties.addLine(
            property instanceof ClassPropertyGenerator
                ? property
                : ClassPropertyGenerator.create(property),
        );
        return This;
    }

    getProperties() {
        return this.properties;
    }

    setMethods<
        NewMethods extends MultiLineGenerator<
            | ClassMethodGenerator
            | IdentifierGenerator<string, ClassMethodGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassMethodGenerator
                  | IdentifierGenerator<string, ClassMethodGenerator>
              >
        > = MultiLineGenerator<
            | ClassMethodGenerator
            | IdentifierGenerator<string, ClassMethodGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassMethodGenerator
                  | IdentifierGenerator<string, ClassMethodGenerator>
              >
        >,
    >(
        methods:
            | NewMethods
            | (
                  | ClassMethodGenerator
                  | Parameters<typeof ClassMethodGenerator.generate>[0]
                  | IdentifierGenerator<string, ClassMethodGenerator>
                  | MultiLineGenerator<
                        | CommentGenerator
                        | ClassMethodGenerator
                        | IdentifierGenerator<string, ClassMethodGenerator>
                    >
              )[],
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            Properties,
            NewMethods,
            Extended,
            Implemented,
            Content
        >;
        This.methods = (
            Array.isArray(methods)
                ? MultiLineGenerator.create(
                      methods.map((method) =>
                          method instanceof MultiLineGenerator
                              ? method
                              : method instanceof ClassMethodGenerator
                                ? method
                                : method instanceof IdentifierGenerator
                                  ? method
                                  : ClassMethodGenerator.create(method),
                      ),
                  )
                : methods
        ) as NewMethods;
        return This;
    }

    addMethod<NewMethod extends ClassMethodGenerator = ClassMethodGenerator>(
        method: NewMethod | Parameters<typeof ClassMethodGenerator.generate>[0],
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            Properties,
            MultiLineGenerator<
                Methods extends MultiLineGenerator<infer R>
                    ? R
                    : never | NewMethod
            >,
            Extended,
            Implemented,
            Content
        >;
        This.methods.addLine(
            method instanceof ClassMethodGenerator
                ? method
                : ClassMethodGenerator.create(method),
        );
        return This;
    }

    getMethods() {
        return this.methods;
    }

    generate() {
        return `class ${this.name}${this.generics.generate()}${this.extended ? ` extends ${this.extended}` : ""}${this.implemented.length > 0 ? ` implements ${this.implemented.join(", ")}` : ""} ${wrapInBraces(`
        ${this.content ? this.content : ""}

        ${this.properties.setSeperationSize(0)}
        
        ${this.methods.setSeperationSize(2)}
    `)}`;
    }

    setContent<NewContent extends string = string>(content: NewContent) {
        const This = this as unknown as ClassGenerator<
            Name,
            Generics,
            Properties,
            Methods,
            Extended,
            Implemented,
            NewContent
        >;
        This.content = content;
        return This;
    }

    clone() {
        return new ClassGenerator(this.name, {
            generics: this.generics.clone(),
            extended: this.extended,
            implemented: [...this.implemented],
            properties: this.properties.clone().getLines(),
            methods: this.methods.clone().getLines(),
            content: this.content,
        }) as this;
    }

    override getAllChildren() {
        return [this.generics, this.properties, this.methods];
    }

    static create<
        Name extends string = string,
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Properties extends MultiLineGenerator<
            | ClassPropertyGenerator
            | IdentifierGenerator<string, ClassPropertyGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassPropertyGenerator
                  | IdentifierGenerator<string, ClassPropertyGenerator>
              >
        > = MultiLineGenerator<
            | ClassPropertyGenerator
            | IdentifierGenerator<string, ClassPropertyGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassPropertyGenerator
                  | IdentifierGenerator<string, ClassPropertyGenerator>
              >
        >,
        Methods extends MultiLineGenerator<
            | ClassMethodGenerator
            | IdentifierGenerator<string, ClassMethodGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassMethodGenerator
                  | IdentifierGenerator<string, ClassMethodGenerator>
              >
        > = MultiLineGenerator<
            | ClassMethodGenerator
            | IdentifierGenerator<string, ClassMethodGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassMethodGenerator
                  | IdentifierGenerator<string, ClassMethodGenerator>
              >
        >,
        Extended extends string = string,
        Implemented extends string = string,
        Content extends string = string,
    >(
        name: Name,
        options?: {
            generics?: Generics | TemplateGenericType[];
            extended?: Extended;
            implemented?: Implemented[];
            properties?:
                | Properties
                | (
                      | ClassPropertyGenerator
                      | IdentifierGenerator<string, ClassPropertyGenerator>
                      | Parameters<typeof ClassPropertyGenerator.generate>[0]
                      | MultiLineGenerator<
                            | CommentGenerator
                            | ClassPropertyGenerator
                            | IdentifierGenerator<
                                  string,
                                  ClassPropertyGenerator
                              >
                        >
                  )[];
            methods?:
                | Methods
                | (
                      | ClassMethodGenerator
                      | IdentifierGenerator<string, ClassMethodGenerator>
                      | Parameters<typeof ClassMethodGenerator.generate>[0]
                      | MultiLineGenerator<
                            | CommentGenerator
                            | ClassMethodGenerator
                            | IdentifierGenerator<string, ClassMethodGenerator>
                        >
                  )[];
            content?: Content;
        },
    ) {
        return new ClassGenerator(name, options);
    }

    static generate<
        Name extends string = string,
        Generics extends GenericsTypeGenerator = GenericsTypeGenerator,
        Properties extends MultiLineGenerator<
            | ClassPropertyGenerator
            | IdentifierGenerator<string, ClassPropertyGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassPropertyGenerator
                  | IdentifierGenerator<string, ClassPropertyGenerator>
              >
        > = MultiLineGenerator<
            | ClassPropertyGenerator
            | IdentifierGenerator<string, ClassPropertyGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassPropertyGenerator
                  | IdentifierGenerator<string, ClassPropertyGenerator>
              >
        >,
        Methods extends MultiLineGenerator<
            | ClassMethodGenerator
            | IdentifierGenerator<string, ClassMethodGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassMethodGenerator
                  | IdentifierGenerator<string, ClassMethodGenerator>
              >
        > = MultiLineGenerator<
            | ClassMethodGenerator
            | IdentifierGenerator<string, ClassMethodGenerator>
            | MultiLineGenerator<
                  | CommentGenerator
                  | ClassMethodGenerator
                  | IdentifierGenerator<string, ClassMethodGenerator>
              >
        >,
        Extended extends string = string,
        Implemented extends string = string,
        Content extends string = string,
    >(
        name: Name,
        options?: {
            generics?: Generics | TemplateGenericType[];
            extended?: Extended;
            implemented?: Implemented[];
            properties?:
                | Properties
                | (
                      | ClassPropertyGenerator
                      | IdentifierGenerator<string, ClassPropertyGenerator>
                      | Parameters<typeof ClassPropertyGenerator.generate>[0]
                      | MultiLineGenerator<
                            | CommentGenerator
                            | ClassPropertyGenerator
                            | IdentifierGenerator<
                                  string,
                                  ClassPropertyGenerator
                              >
                        >
                  )[];
            methods?:
                | Methods
                | (
                      | ClassMethodGenerator
                      | IdentifierGenerator<string, ClassMethodGenerator>
                      | Parameters<typeof ClassMethodGenerator.generate>[0]
                      | MultiLineGenerator<
                            | CommentGenerator
                            | ClassMethodGenerator
                            | IdentifierGenerator<string, ClassMethodGenerator>
                        >
                  )[];
            content?: Content;
        },
    ) {
        return ClassGenerator.create(name, options).generate();
    }
}
