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
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private name: Name;
    private generics?: Generics;
    private params?: Params;
    private return?: Return;
    private returnType?: ReturnType;
    private body: Body;
    private isAsync = false as IsAsync;
    private isArrow = false as IsArrow;
    private isGenerator = false as IsGenerator;

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
    }) {
        super();
        this.name = options.name;
        this.generics =
            options.generics instanceof GenericsTypeGenerator
                ? options.generics
                : (new GenericsTypeGenerator(options.generics ?? []) as Generics);
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

    setGenerics<NewGenerics extends GenericsTypeGenerator>(generics: NewGenerics) {
        const This = this as unknown as ClassMethodGenerator<
            Name,
            NewGenerics,
            Params,
            Return,
            ReturnType,
            Body,
            IsAsync,
            IsArrow,
            IsGenerator
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
            IsGenerator
        >;
        This.generics?.addGeneric(
            generic as unknown as Generics extends GenericsTypeGenerator<infer R>
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
            IsGenerator
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
            IsGenerator
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
            IsGenerator
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
            IsGenerator
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
            IsGenerator
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
            IsGenerator
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
            NewIsGenerator
        >;
        This.isGenerator = isGenerator;
        return This;
    }

    getIsGenerator() {
        return this.isGenerator;
    }

    generate() {
        return this.isArrow
            ? `${this.name} = ${FunctionGenerator.generate({
                  generics: this.generics,
                  params: this.params,
                  return: this.return,
                  returnType: this.returnType,
                  body: this.body,
                  isAsync: this.isAsync,
                  isArrow: this.isArrow,
                  isGenerator: this.isGenerator,
              })}`
            : `${this.isAsync ? "async " : ""}${this.isGenerator ? "* " : ""}${this.name}${this.generics?.generate()}${wrapInParentheses(this.params?.generate() || "")}${this.returnType ? `: ${this.returnType}` : ""} ${wrapInBraces(`${this.body}\n${this.return}`)}`;
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
    }) {
        return ClassMethodGenerator.create(options).generate();
    }
}

export class ClassPropertyGenerator<
    Name extends string = string,
    Type extends string = string,
    Optional extends boolean = boolean,
    DefaultValue extends string = string,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private name: Name;
    private type: Type;
    private optional = false as Optional;
    private defaultValue = "" as DefaultValue;

    constructor(options: {
        name: Name;
        type: Type;
        optional: Optional;
        defaultValue: DefaultValue;
    }) {
        super();
        this.name = options.name;
        this.type = options.type;
        this.optional = options.optional;
        this.defaultValue = options.defaultValue;
    }

    setName<NewName extends string = string>(name: NewName) {
        const This = this as unknown as ClassPropertyGenerator<
            NewName,
            Type,
            Optional,
            DefaultValue
        >;
        This.name = name;
        return This;
    }

    setType<NewType extends string = string>(type: NewType) {
        const This = this as unknown as ClassPropertyGenerator<
            Name,
            NewType,
            Optional,
            DefaultValue
        >;
        This.type = type;
        return This;
    }

    setOptional<NewOptional extends boolean = boolean>(optional: NewOptional) {
        const This = this as unknown as ClassPropertyGenerator<
            Name,
            Type,
            NewOptional,
            DefaultValue
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
            NewDefaultValue
        >;
        This.defaultValue = defaultValue;
        return This;
    }

    generate() {
        return `${this.name}${this.optional ? "?" : ""}${this.type ? `: ${this.type}` : ""}${this.defaultValue ? ` = ${this.defaultValue}` : ""}`;
    }

    clone() {
        return new ClassPropertyGenerator({
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
    >(options: {
        name: Name;
        type: Type;
        optional: Optional;
        defaultValue: DefaultValue;
    }) {
        return new ClassPropertyGenerator(options);
    }

    static generate<
        Name extends string = string,
        Type extends string = string,
        Optional extends boolean = boolean,
        DefaultValue extends string = string,
    >(options: {
        name: Name;
        type: Type;
        optional: Optional;
        defaultValue: DefaultValue;
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
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
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
    }

    setName<NewName extends string = string>(name: NewName) {
        const This = this as unknown as ClassGenerator<
            NewName,
            Generics,
            Properties,
            Methods,
            Extended,
            Implemented
        >;
        This.name = name;
        return This;
    }

    getName() {
        return this.name;
    }

    setGenerics<NewGenerics extends GenericsTypeGenerator = GenericsTypeGenerator>(
        generics: NewGenerics,
    ) {
        const This = this as unknown as ClassGenerator<
            Name,
            NewGenerics,
            Properties,
            Methods,
            Extended,
            Implemented
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
            Implemented
        >;
        This.generics.addGeneric(
            generic as unknown as Generics extends GenericsTypeGenerator<infer R>
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
            Implemented
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
            NewImplemented
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
            Implemented | NewImplemented
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
            Implemented
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
            Implemented
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
            Implemented
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
            Implemented
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
        ${this.properties.setSeperationSize(0)}
        
        ${this.methods.setSeperationSize(2)}
    `)}`;
    }

    clone() {
        return new ClassGenerator(this.name, {
            generics: this.generics.clone(),
            extended: this.extended,
            implemented: [...this.implemented],
            properties: this.properties.clone().getLines(),
            methods: this.methods.clone().getLines(),
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
        },
    ) {
        return ClassGenerator.create(name, options).generate();
    }
}
