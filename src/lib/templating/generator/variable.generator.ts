import { TemplateGenerator } from "./utils";

export class VariableGenerator extends TemplateGenerator {
  private name: string;
  private type: "let" | "const" | "var";
  private value: string | TemplateGenerator;

  constructor(
    name: string,
    value: string | TemplateGenerator,
    type?: "let" | "const" | "var",
  ) {
    super();
    this.name = name;
    this.type = type ?? "let";
    this.value = value;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setType(type: "let" | "const" | "var") {
    this.type = type;
    return this;
  }

  setValue(value: string | TemplateGenerator) {
    this.value = value;
    return this;
  }

  generate() {
    return `${this.type} ${this.name} = ${this.value instanceof TemplateGenerator ? this.value.generate() : this.value};`;
  }

  static create(
    name: string,
    value: string | TemplateGenerator,
    type?: "let" | "const" | "var",
  ) {
    return new VariableGenerator(name, value, type);
  }

  static generate(
    name: string,
    value: string | TemplateGenerator,
    type?: "let" | "const" | "var",
  ) {
    return VariableGenerator.create(name, value, type).generate();
  }
}
