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

export class ClassMethodGenerator extends TemplateGenerator {
  private name: string;
  private generics?: GenericsGenerator;
  private params?: FunctionParamsGenerator;
  private returnType?: string;
  private body: MultiLineGenerator;
  private isAsync = false;
  private isArrow = false;
  private isGenerator = false;

  constructor(options: {
    name: string;
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    return?: string;
    body: string | MultiLineGenerator;
    isAsync?: boolean;
    isArrow?: boolean;
    isGenerator?: boolean;
  }) {
    super();
    this.name = options.name;
    this.generics =
      options.generics instanceof GenericsGenerator
        ? options.generics
        : new GenericsGenerator(options.generics ?? []);
    this.params =
      options.params instanceof FunctionParamsGenerator
        ? options.params
        : new FunctionParamsGenerator(options.params ?? []);
    this.returnType = options.return;
    this.body =
      options.body instanceof MultiLineGenerator
        ? options.body
        : new MultiLineGenerator([options.body]);
    this.isAsync = options.isAsync ?? this.isAsync;
    this.isArrow = options.isArrow ?? this.isArrow;
    this.isGenerator = options.isGenerator ?? this.isGenerator;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }
  
  getName() {
    return this.name;
  }

  setGenerics(generics: GenericsGenerator) {
    this.generics = generics;
    return this;
  }
  
  addGeneric(generic: TemplateGeneric | GenericGenerator) {
    this.generics?.addGeneric(generic);
    return this;
  }
  
  getGenerics() {
    return this.generics;
  }

  setParams(params: FunctionParamsGenerator) {
    this.params = params;
    return this;
  }
  
  addParam(param: FunctionParamGenerator) {
    this.params?.addParam(param);
    return this;
  }
  
  getParams() {
    return this.params;
  }

  setReturnType(returnType: string) {
    this.returnType = returnType;
    return this;
  }
  
  getReturnType() {
    return this.returnType;
  }

  setBody(body: string | MultiLineGenerator) {
    this.body = MultiLineGenerator.create([body]);
    return this;
  }
  
  addBody(body: string) {
    this.body.addLine(body);
    return this;
  }
  
  getBody() {
    return this.body;
  }

  setIsAsync(isAsync: boolean) {
    this.isAsync = isAsync;
    return this;
  }
  
  getIsAsync() {
    return this.isAsync;
  }

  setIsArrow(isArrow: boolean) {
    this.isArrow = isArrow;
    return this;
  }
  
  getIsArrow() {
    return this.isArrow;
  }

  setIsGenerator(isGenerator: boolean) {
    this.isGenerator = isGenerator;
    return this;
  }
  
  getIsGenerator() {
    return this.isGenerator;
  }

  generate() {
    return this.isArrow
      ? `${this.name} = ${FunctionGenerator.generate({
          generics: this.generics,
          params: this.params,
          return: this.returnType,
          body: this.body,
          isAsync: this.isAsync,
          isArrow: this.isArrow,
          isGenerator: this.isGenerator,
        })}`
      : `${this.isAsync ? "async " : ""}${this.isGenerator ? "* " : ""}${this.name}${this.generics?.generate()}${wrapInParentheses(this.params?.generate() || "")}${this.returnType ? `= ${this.returnType}` : ""} ${wrapInBraces(`${this.body}`)}`;
  }

  static create(options: {
    name: string;
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    return?: string;
    body: string | MultiLineGenerator;
    isAsync?: boolean;
    isArrow?: boolean;
    isGenerator?: boolean;
  }) {
    return new ClassMethodGenerator(options);
  }

  static generate(options: {
    name: string;
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    return?: string;
    body: string | MultiLineGenerator;
    isAsync?: boolean;
    isArrow?: boolean;
    isGenerator?: boolean;
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

export class ClassGenerator {
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
      properties?:
        | ClassPropertyGenerator[]
        | Parameters<typeof ClassPropertyGenerator.generate>[0][]
        | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>[];
      methods?:
        | ClassMethodGenerator[]
        | Parameters<typeof ClassMethodGenerator.generate>[0][]
        | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>[];
    },
  ) {
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

  static create(
    name: string,
    options?: {
      generics?: GenericsGenerator | TemplateGeneric[];
      extended?: string;
      implemented?: string[];
      properties?:
        | ClassPropertyGenerator[]
        | Parameters<typeof ClassPropertyGenerator.generate>[0][]
        | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>[];
      methods?:
        | ClassMethodGenerator[]
        | Parameters<typeof ClassMethodGenerator.generate>[0][]
        | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>[];
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
      properties?:
        | ClassPropertyGenerator[]
        | Parameters<typeof ClassPropertyGenerator.generate>[0][]
        | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>[];
      methods?:
        | ClassMethodGenerator[]
        | Parameters<typeof ClassMethodGenerator.generate>[0][]
        | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>[];
    },
  ) {
    return ClassGenerator.create(name, options).generate();
  }
}
