import { MultiLineGenerator } from "./arrangement.generator";
import { CommentGenerator } from "./comment.generator";
import {
  FunctionGenerator,
  FunctionParam,
  FunctionParamGenerator,
  FunctionParamsGenerator,
} from "./function.generator";
import {
  GenericGenerator,
  GenericsGenerator,
  TemplateGeneric,
} from "./generic.generator";
import { TemplateGenerator, wrapInBraces, wrapInParentheses } from "./utils";

export class ClassMethodGenerator<
  Name extends string = string,
  Generics extends GenericsGenerator = GenericsGenerator,
  Params extends FunctionParamsGenerator = FunctionParamsGenerator,
  Return extends string = string,
  ReturnType extends string = string,
  Body extends MultiLineGenerator = MultiLineGenerator,
  IsAsync extends boolean = false,
  IsArrow extends boolean = false,
  IsGenerator extends boolean = false,
> extends TemplateGenerator {
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
    generics?: Generics | TemplateGeneric[];
    params?: Params | FunctionParam[];
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
      options.generics instanceof GenericsGenerator
        ? options.generics
        : (new GenericsGenerator(options.generics ?? []) as Generics);
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
            Array.isArray(options.body) ? options.body : [options.body],
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

  setGenerics<NewGenerics extends GenericsGenerator>(generics: NewGenerics) {
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

  addGeneric<NewGeneric extends GenericGenerator>(generic: NewGeneric) {
    const This = this as unknown as ClassMethodGenerator<
      Name,
      GenericsGenerator<
        Generics extends GenericsGenerator<infer R> ? R : never | NewGeneric
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
      generic as unknown as Generics extends GenericsGenerator<infer R>
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
        Params extends FunctionParamsGenerator<infer R> ? R : never | NewParam
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

  setIsGenerator<NewIsGenerator extends boolean>(isGenerator: NewIsGenerator) {
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

  static create<
    Name extends string = string,
    Generics extends GenericsGenerator = GenericsGenerator,
    Params extends FunctionParamsGenerator = FunctionParamsGenerator,
    Return extends string = string,
    ReturnType extends string = string,
    Body extends MultiLineGenerator = MultiLineGenerator,
    IsAsync extends boolean = false,
    IsArrow extends boolean = false,
    IsGenerator extends boolean = false,
  >(options: {
    name: Name;
    generics?: Generics | TemplateGeneric[];
    params?: Params | FunctionParam[];
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
    Generics extends GenericsGenerator = GenericsGenerator,
    Params extends FunctionParamsGenerator = FunctionParamsGenerator,
    Return extends string = string,
    ReturnType extends string = string,
    Body extends MultiLineGenerator = MultiLineGenerator,
    IsAsync extends boolean = false,
    IsArrow extends boolean = false,
    IsGenerator extends boolean = false,
  >(options: {
    name: Name;
    generics?: Generics | TemplateGeneric[];
    params?: Params | FunctionParam[];
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

export class ClassPropertyGenerator extends TemplateGenerator {
  private name: string;
  private type: string;
  private optional = false;
  private defaultValue = "";

  constructor(options: {
    name: string;
    type: string;
    optional: boolean;
    defaultValue: string;
  }) {
    super();
    this.name = options.name;
    this.type = options.type;
    this.optional = options.optional;
    this.defaultValue = options.defaultValue;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  setOptional(optional: boolean) {
    this.optional = optional;
    return this;
  }

  setDefaultValue(defaultValue: string) {
    this.defaultValue = defaultValue;
    return this;
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

  static create(options: {
    name: string;
    type: string;
    optional: boolean;
    defaultValue: string;
  }) {
    return new ClassPropertyGenerator(options);
  }

  static generate(options: {
    name: string;
    type: string;
    optional: boolean;
    defaultValue: string;
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
//   generics?: TemplateGeneric[];
//   properties?: FunctionParam[];
//   methods?: ReturnType<typeof generateMethod>[];
//   extended?: string;
//   implemented?: string[];
// }) {
//   return `class ${name}${generateGenerics(generics)}${extended ? ` extends ${extended}` : ""}${implemented.length > 0 ? ` implements ${implemented.join(", ")}` : ""} ${wrapInBraces(`
//           ${properties.map((prop) => generateProperty(prop)).join("\n")}
//           ${methods.map((method) => method).join("\n")}
//       `)}`;
// }

export class ClassGenerator extends TemplateGenerator {
  private generics: GenericsGenerator;
  private properties: MultiLineGenerator<
    | ClassPropertyGenerator
    | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
  >;
  private methods: MultiLineGenerator<
    | ClassMethodGenerator
    | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
  >;
  private extended = "";
  private implemented: string[] = [];

  constructor(
    private name: string,
    options?: {
      generics?: GenericsGenerator | TemplateGeneric[];
      extended?: string;
      implemented?: string[];
      properties?: (
        | ClassPropertyGenerator
        | Parameters<typeof ClassPropertyGenerator.generate>[0]
        | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
      )[];
      methods?: (
        | ClassMethodGenerator
        | Parameters<typeof ClassMethodGenerator.generate>[0]
        | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
      )[];
    },
  ) {
    super();
    this.generics =
      options?.generics instanceof GenericsGenerator
        ? options.generics
        : (GenericsGenerator.create(options?.generics ?? []) ??
          new GenericsGenerator([]));
    this.extended = options?.extended ?? "";
    this.implemented = options?.implemented ?? [];
    this.properties = Array.isArray(options?.properties)
      ? MultiLineGenerator.create(
          options?.properties?.map((prop) =>
            prop instanceof MultiLineGenerator
              ? prop
              : prop instanceof ClassPropertyGenerator
                ? prop
                : ClassPropertyGenerator.create(prop),
          ),
        )
      : (options?.properties ?? MultiLineGenerator.create([]));
    this.methods = Array.isArray(options?.methods)
      ? MultiLineGenerator.create(
          options?.methods?.map((method) =>
            method instanceof MultiLineGenerator
              ? method
              : method instanceof ClassMethodGenerator
                ? method
                : ClassMethodGenerator.create(method),
          ),
        )
      : (options?.methods ?? MultiLineGenerator.create([]));
  }

  setGenerics(generics: GenericsGenerator) {
    this.generics = generics;
    return this;
  }

  addGeneric(generic: TemplateGeneric | GenericGenerator) {
    this.generics.addGeneric(generic);
    return this;
  }

  getGenerics() {
    return this.generics;
  }

  setExtended(extended: string) {
    this.extended = extended;
    return this;
  }

  getExtended() {
    return this.extended;
  }

  setImplemented(implemented: string[]) {
    this.implemented = implemented;
    return this;
  }

  addImplemented(implemented: string) {
    this.implemented.push(implemented);
    return this;
  }

  getImplemented() {
    return this.implemented;
  }

  setProperties(
    properties:
      | ClassPropertyGenerator[]
      | Parameters<typeof ClassPropertyGenerator.generate>[0][]
      | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>[],
  ) {
    this.properties = Array.isArray(properties)
      ? MultiLineGenerator.create(
          properties.map((prop) =>
            prop instanceof MultiLineGenerator
              ? prop
              : prop instanceof ClassPropertyGenerator
                ? prop
                : ClassPropertyGenerator.create(prop),
          ),
        )
      : properties;
    return this;
  }

  addProperty(
    property:
      | ClassPropertyGenerator
      | Parameters<typeof ClassPropertyGenerator.generate>[0],
  ) {
    this.properties.addLine(
      property instanceof ClassPropertyGenerator
        ? property
        : ClassPropertyGenerator.create(property),
    );
    return this;
  }

  getProperties() {
    return this.properties;
  }

  setMethods(
    methods:
      | ClassMethodGenerator[]
      | Parameters<typeof ClassMethodGenerator.generate>[0][]
      | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>[],
  ) {
    this.methods = Array.isArray(methods)
      ? MultiLineGenerator.create(
          methods.map((method) =>
            method instanceof MultiLineGenerator
              ? method
              : method instanceof ClassMethodGenerator
                ? method
                : ClassMethodGenerator.create(method),
          ),
        )
      : methods;
    return this;
  }

  addMethod(
    method:
      | ClassMethodGenerator
      | Parameters<typeof ClassMethodGenerator.generate>[0],
  ) {
    this.methods.addLine(
      method instanceof ClassMethodGenerator
        ? method
        : ClassMethodGenerator.create(method),
    );
    return this;
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

  static create(
    name: string,
    options?: {
      generics?: GenericsGenerator | TemplateGeneric[];
      extended?: string;
      implemented?: string[];
      properties?: (
        | ClassPropertyGenerator
        | Parameters<typeof ClassPropertyGenerator.generate>[0]
        | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
      )[];
      methods?: (
        | ClassMethodGenerator
        | Parameters<typeof ClassMethodGenerator.generate>[0]
        | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
      )[];
    },
  ) {
    return new ClassGenerator(name, options);
  }

  static generate(
    name: string,
    options?: {
      generics?: GenericsGenerator | TemplateGeneric[];
      extended?: string;
      implemented?: string[];
      properties?: (
        | ClassPropertyGenerator
        | Parameters<typeof ClassPropertyGenerator.generate>[0]
        | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
      )[];
      methods?: (
        | ClassMethodGenerator
        | Parameters<typeof ClassMethodGenerator.generate>[0]
        | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
      )[];
    },
  ) {
    return ClassGenerator.create(name, options).generate();
  }
}
