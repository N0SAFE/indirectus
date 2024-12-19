import { TemplateGenerator } from "./utils";

export class ExportGenerator<
  Content extends string | TemplateGenerator = string | TemplateGenerator,
  Default extends boolean = false,
> extends TemplateGenerator {
  private content: Content;
  private default: Default;

  constructor(content: Content, options?: { default?: Default }) {
    super();
    this.content = content;
    this.default = options?.default ?? (false as Default);
  }

  setContent<NewContent extends string | TemplateGenerator>(
    content: NewContent,
  ) {
    const This = this as unknown as ExportGenerator<NewContent, Default>;
    This.content = content;
    return This;
  }

  setDefault<NewDefault extends boolean>(defaultValue: NewDefault) {
    const This = this as unknown as ExportGenerator<Content, NewDefault>;
    This.default = defaultValue;
    return This;
  }

  generate() {
    return `export ${this.default ? "default " : ""}${this.content}`;
  }

  clone() {
    return new ExportGenerator(
      typeof this.content === "string" ? this.content : this.content.clone(),
      { default: this.default },
    ) as this;
  }

  static create<
    Content extends string | TemplateGenerator = string | TemplateGenerator,
    Default extends boolean = false,
  >(content: Content, options?: { default?: Default }) {
    return new ExportGenerator(content, options);
  }

  static generate<
    Content extends string | TemplateGenerator = string | TemplateGenerator,
    Default extends boolean = false,
  >(content: Content, options?: { default?: Default }) {
    return ExportGenerator.create(content, options).generate();
  }
}
