import { TemplateGenerator } from "./utils";

export type TemplateGeneric = {
  name: string;
  extends?: string;
  default?: string;
};

export class GenericGenerator extends TemplateGenerator {
  private name: string;
  private ext?: string;
  private def?: string;

  constructor(generic: TemplateGeneric) {
    super();
    this.name = generic.name;
    this.ext = generic.extends;
    this.def = generic.default;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setExt(ext: string) {
    this.ext = ext;
    return this;
  }

  setDef(def: string) {
    this.def = def;
    return this;
  }

  generate() {
    return `${this.name}${this.ext ? ` extends ${this.ext}` : ""}${this.def ? ` = ${this.def}` : ""}`;
  }

  static create(generic: TemplateGeneric) {
    return new GenericGenerator(generic);
  }
  
  static generate(generic: TemplateGeneric) {
    return GenericGenerator.create(generic).generate();
  }
}

export class GenericsGenerator extends TemplateGenerator {
  private generics: GenericGenerator[] = [];

  constructor(generics: TemplateGeneric[] | GenericGenerator[]) {
    super();

    this.generics = generics.map((generic) =>
      generic instanceof GenericGenerator
        ? generic
        : GenericGenerator.create(generic),
    );
  }

  setGenerics(generics: TemplateGeneric[] | GenericGenerator[]) {
    this.generics = generics.map((generic) =>
      generic instanceof GenericGenerator
        ? generic
        : GenericGenerator.create(generic),
    );
    return this;
  }
  
  addGeneric(generic: TemplateGeneric | GenericGenerator) {
    this.generics.push(
      generic instanceof GenericGenerator
        ? generic
        : GenericGenerator.create(generic),
    );
    return this;
  }

  generate() {
    if (this.generics.length === 0) {
      return "";
    }
    return `<${this.generics.map((g) => g.generate()).join(", ")}>`;
  }

  static create(generics: TemplateGeneric[] | GenericGenerator[]) {
    return new GenericsGenerator(generics);
  }
  
  static generate(generics: TemplateGeneric[] | GenericGenerator[]) {
    return GenericsGenerator.create(generics).generate();
  }
}