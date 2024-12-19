import { TemplateGenerator, wrapInBraces } from "./utils";

export class ObjectGenerator<
  Content extends Record<string, unknown> = {},
  AsConst extends boolean = false,
> extends TemplateGenerator {
  private content: Content;
  private asConst: AsConst;

  constructor(content: Content, options?: { asConst?: AsConst }) {
    super();
    this.content = content;
    this.asConst = options?.asConst ?? (false as AsConst);
  }

  setContent<NewContent extends Record<string, unknown>>(content: NewContent) {
    const This = this as unknown as ObjectGenerator<NewContent, AsConst>;
    This.content = content;
    return This;
  }

  setAsConst<NewAsConst extends boolean>(asConst: NewAsConst) {
    const This = this as unknown as ObjectGenerator<Content, NewAsConst>;
    This.asConst = asConst;
    return This;
  }

  generate() {
    return `${wrapInBraces(
      Object.entries(this.content)
        .map(([key, value]) => `"${key}": ${value}`)
        .join(", "),
    )}${this.asConst ? " as const" : ""}`;
  }

  clone() {
    return new ObjectGenerator(
      { ...this.content },
      { asConst: this.asConst },
    ) as this;
  }

  static create<
    Content extends Record<string, unknown> = {},
    AsConst extends boolean = false,
  >(content: Content, options?: { asConst?: AsConst }) {
    return new ObjectGenerator(content, options);
  }

  static generate<
    Content extends Record<string, unknown> = {},
    AsConst extends boolean = false,
  >(content: Content, options?: { asConst?: AsConst }) {
    return ObjectGenerator.create(content, options).generate();
  }
}
