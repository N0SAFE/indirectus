import { TemplateGenerator } from "./utils";

export type TemplateGeneric<
  Name extends string = string,
  Extends extends string | undefined = string | undefined,
  Default extends string | undefined = string | undefined,
> = {
  name: string;
  extends?: string;
  default?: string;
};

export class GenericGenerator<
  Name extends string = string,
  Extends extends string | undefined = string | undefined,
  Default extends string | undefined = string | undefined,
> extends TemplateGenerator {
  private name: string;
  private ext?: string;
  private def?: string;

  constructor(generic: TemplateGeneric<Name, Extends, Default>) {
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

  clone() {
    return new GenericGenerator({
      name: this.name,
      extends: this.ext,
      default: this.def,
    }) as this;
  }

  static create(generic: TemplateGeneric) {
    return new GenericGenerator(generic);
  }

  static generate(generic: TemplateGeneric) {
    return GenericGenerator.create(generic).generate();
  }
}

export class GenericsGenerator<
  Genenerics extends GenericGenerator = GenericGenerator,
> extends TemplateGenerator {
  private generics: Genenerics[] = [];

  constructor(generics: (Genenerics | TemplateGeneric)[]) {
    super();

    this.generics = generics.map((generic) =>
      generic instanceof GenericGenerator
        ? generic
        : GenericGenerator.create(generic),
    ) as Genenerics[];
  }

  setGenerics<NewGenerics extends GenericGenerator = GenericGenerator>(
    generics: (Genenerics | TemplateGeneric)[],
  ) {
    const This = this as unknown as GenericsGenerator<NewGenerics>;
    This.generics = generics.map((generic) =>
      generic instanceof GenericGenerator
        ? generic
        : GenericGenerator.create(generic),
    ) as NewGenerics[];
    return This;
  }

  addGeneric<NewGeneric extends GenericGenerator = GenericGenerator>(
    generic: Genenerics | TemplateGeneric,
  ) {
    const This = this as unknown as GenericsGenerator<Genenerics | NewGeneric>;
    This.generics.push(
      generic instanceof GenericGenerator
        ? generic
        : (GenericGenerator.create(generic) as Genenerics | NewGeneric),
    );
    return This;
  }

  generate() {
    if (this.generics.length === 0) {
      return "";
    }
    return `<${this.generics.map((g) => g.generate()).join(", ")}>`;
  }

  clone() {
    return new GenericsGenerator([...this.generics]) as this;
  }

  static create<Genenerics extends GenericGenerator = GenericGenerator>(
    generics: (Genenerics | TemplateGeneric)[],
  ) {
    return new GenericsGenerator(generics);
  }

  static generate<Genenerics extends GenericGenerator = GenericGenerator>(
    generics: (Genenerics | TemplateGeneric)[],
  ) {
    return GenericsGenerator.create(generics).generate();
  }
}
