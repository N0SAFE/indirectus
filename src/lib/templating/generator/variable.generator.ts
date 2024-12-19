import { TemplateGenerator } from "./utils";

export class VariableGenerator<
  Name extends string = string,
  Value extends string | TemplateGenerator = string | TemplateGenerator,
  Type extends "let" | "const" | "var" = "let",
> extends TemplateGenerator {
  private name: Name;
  private value: Value;
  private type: Type;

  constructor(name: Name, value: Value, type?: Type) {
    super();
    this.name = name;
    this.type = type ?? ("let" as Type);
    this.value = value;
  }

  setName<NewName extends string>(name: NewName) {
    const This = this as unknown as VariableGenerator<NewName, Value, Type>;
    This.name = name;
    return This;
  }

  setType<NewType extends "let" | "const" | "var">(type: NewType) {
    const This = this as unknown as VariableGenerator<Name, Value, NewType>;
    This.type = type;
    return This;
  }

  setValue<NewValue extends string | TemplateGenerator>(value: NewValue) {
    const This = this as unknown as VariableGenerator<Name, NewValue, Type>;
    This.value = value;
    return This;
  }

  generate() {
    return `${this.type} ${this.name} = ${this.value instanceof TemplateGenerator ? this.value.generate() : this.value};`;
  }

  clone() {
    return new VariableGenerator(this.name, this.value, this.type) as this;
  }

  static create<
    Name extends string = string,
    Value extends string | TemplateGenerator = string | TemplateGenerator,
    Type extends "let" | "const" | "var" = "let",
  >(name: Name, value: Value, type?: Type) {
    return new VariableGenerator(name, value, type);
  }

  static generate<
    Name extends string = string,
    Value extends string | TemplateGenerator = string | TemplateGenerator,
    Type extends "let" | "const" | "var" = "let",
  >(name: Name, value: Value, type?: Type) {
    return VariableGenerator.create(name, value, type).generate();
  }
}
