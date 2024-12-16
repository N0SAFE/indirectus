import {
  FunctionGenerator,
  FunctionParam,
  FunctionParamsGenerator,
} from "./function.generator";
import { GenericsGenerator, TemplateGeneric } from "./generic.generator";
import { TemplateGenerator, wrapInBraces, wrapInParentheses } from "./utils";

export class ClassMethodGenerator extends TemplateGenerator {
  private name: string;
  private generics?: GenericsGenerator;
  private params?: FunctionParamsGenerator;
  private returnType?: string;
  private body: string;
  private isAsync = false;
  private isArrow = false;
  private isGenerator = false;

  constructor(options: {
    name: string;
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    return?: string;
    body: string;
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
    this.body = options.body;
    this.isAsync = options.isAsync ?? this.isAsync;
    this.isArrow = options.isArrow ?? this.isArrow;
    this.isGenerator = options.isGenerator ?? this.isGenerator;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setGenerics(generics: GenericsGenerator) {
    this.generics = generics;
    return this;
  }

  setParams(params: FunctionParamsGenerator) {
    this.params = params;
    return this;
  }

  setReturnType(returnType: string) {
    this.returnType = returnType;
    return this;
  }

  setBody(body: string) {
    this.body = body;
    return this;
  }

  setIsAsync(isAsync: boolean) {
    this.isAsync = isAsync;
    return this;
  }

  setIsArrow(isArrow: boolean) {
    this.isArrow = isArrow;
    return this;
  }

  setIsGenerator(isGenerator: boolean) {
    this.isGenerator = isGenerator;
    return this;
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
      : `${this.isAsync ? "async " : ""}${this.isGenerator ? "* " : ""}${this.name}${this.generics?.generate()}${wrapInParentheses(this.params?.generate() || "")}${this.returnType ? `= ${this.returnType}` : ""} ${wrapInBraces(this.body)}`;
  }

  static create(options: {
    name: string;
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    return?: string;
    body: string;
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
    body: string;
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
  private properties: ClassPropertyGenerator[];
  private methods: ClassMethodGenerator[];
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
        | Parameters<typeof ClassPropertyGenerator.generate>[0][];
      methods?:
        | ClassMethodGenerator[]
        | Parameters<typeof ClassMethodGenerator.generate>[0][];
    },
  ) {
    this.generics =
      options?.generics instanceof GenericsGenerator
        ? options.generics
        : (GenericsGenerator.create(options?.generics ?? []) ??
          new GenericsGenerator([]));
    this.extended = options?.extended ?? "";
    this.implemented = options?.implemented ?? [];
    this.properties =
      options?.properties?.map((prop) =>
        prop instanceof ClassPropertyGenerator
          ? prop
          : ClassPropertyGenerator.create(prop),
      ) ?? [];
    this.methods =
      options?.methods?.map((method) =>
        method instanceof ClassMethodGenerator
          ? method
          : ClassMethodGenerator.create(method),
      ) ?? [];
  }

  generate() {
    return `class ${this.name}${this.generics.generate()}${this.extended ? ` extends ${this.extended}` : ""}${this.implemented.length > 0 ? ` implements ${this.implemented.join(", ")}` : ""} ${wrapInBraces(`
        ${this.properties.map((prop) => prop.generate()).join("\n")}
        ${this.methods.map((method) => method.generate()).join("\n")}
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
        | Parameters<typeof ClassPropertyGenerator.generate>[0][];
      methods?:
        | ClassMethodGenerator[]
        | Parameters<typeof ClassMethodGenerator.generate>[0][];
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
        | Parameters<typeof ClassPropertyGenerator.generate>[0][];
      methods?:
        | ClassMethodGenerator[]
        | Parameters<typeof ClassMethodGenerator.generate>[0][];
    },
  ) {
    return ClassGenerator.create(name, options).generate();
  }
}
