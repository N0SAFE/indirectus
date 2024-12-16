import {
  GenericGenerator,
  GenericsGenerator,
  TemplateGeneric,
} from "./generic.generator";
import { TemplateGenerator, wrapInBraces, wrapInParentheses } from "./utils";

export type FunctionParam = {
  name: string;
  type?: string;
  optional?: boolean;
  defaultValue?: string;
};

export class FunctionParamGenerator extends TemplateGenerator {
  private name = "";
  private type = "";
  private optional = false;
  private defaultValue = "";

  constructor(param: FunctionParam) {
    super();
    this.name = param.name;
    this.type = param.type ?? "";
    this.optional = param.optional ?? false;
    this.defaultValue = param.defaultValue ?? "";
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

  static create(param: FunctionParam) {
    return new FunctionParamGenerator(param);
  }

  static generate(param: FunctionParam) {
    return FunctionParamGenerator.create(param).generate();
  }
}

export class FunctionParamsGenerator extends TemplateGenerator {
  private params: FunctionParamGenerator[] = [];

  constructor(params: FunctionParamGenerator[] | FunctionParam[]) {
    super();
    this.params = params.map((param) =>
      param instanceof FunctionParamGenerator
        ? param
        : FunctionParamGenerator.create(param),
    );
  }

  setParams(params: FunctionParamGenerator[]) {
    this.params = params;
    return this;
  }

  addParam(param: FunctionParamGenerator) {
    this.params.push(param);
    return this;
  }

  generate() {
    return this.params.map((param) => param.generate()).join(", ")
  }

  static create(params: FunctionParamGenerator[] | FunctionParam[]) {
    return new FunctionParamsGenerator(params);
  }

  static generate(params: FunctionParamGenerator[] | FunctionParam[]) {
    return FunctionParamsGenerator.create(params).generate();
  }
}

export class FunctionGenerator extends TemplateGenerator {
  private generics: GenericsGenerator = new GenericsGenerator([]);
  private params: FunctionParamsGenerator;
  private return = "";
  private returnType = "";
  private body = "";
  private isAsync = false;
  private isArrow = false;
  private isGenerator = false;
  private name?: string

  constructor(options: {
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    return?: string;
    returnType?: string;
    body: string;
    isAsync?: boolean;
    isArrow?: boolean;
    isGenerator?: boolean;
    name?: string
  }) {
    super();
    this.generics =
      options.generics instanceof GenericsGenerator
        ? options.generics
        : new GenericsGenerator(options.generics ?? []);
    this.params =
      options.params instanceof FunctionParamsGenerator
        ? options.params
        : new FunctionParamsGenerator(options.params ?? []);
    this.returnType = options.returnType ?? "";
    this.return = options.return ?? "";
    this.body = options.body;
    this.isAsync = options.isAsync ?? false;
    this.isArrow = options.isArrow ?? false;
    this.isGenerator = options.isGenerator ?? false;
    this.name = options.name
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

  addParam(param: FunctionParamGenerator) {
    this.params.addParam(param);
    return this;
  }

  addGeneric(generic: GenericGenerator | TemplateGeneric) {
    this.generics.addGeneric(generic);
    return this;
  }

  generate() {
    return `${this.isAsync ? "async " : ""}${this.isArrow ? "" : "function"}${this.isGenerator ? "* " : ""}${' ' + (this.name ?? "")}${this.generics.generate()}${wrapInParentheses(this.params.generate())}${this.returnType ? `:${this.returnType}` : ""} ${this.isArrow ? "=>" : ""} ${wrapInBraces(`${this.body}${this.return ? `\nreturn ${this.return};` : ""}`)}`;
  }

  static create(options: {
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    returnType?: string;
    return?: string;
    body: string;
    isAsync?: boolean;
    isArrow?: boolean;
    isGenerator?: boolean;
    name?: string
  }) {
    return new FunctionGenerator(options);
  }

  static generate(options: {
    returnType?: string;
    return?: string;
    generics?: GenericsGenerator | TemplateGeneric[];
    params?: FunctionParamsGenerator | FunctionParam[];
    body: string;
    isAsync?: boolean;
    isArrow?: boolean;
    isGenerator?: boolean;
    name?: string
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
      name: options.name
    }).generate();
  }
}
