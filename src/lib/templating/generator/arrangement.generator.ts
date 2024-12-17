import { TemplateGenerator } from "./utils";

export class MultiLineGenerator<
  Content extends string | TemplateGenerator = string | TemplateGenerator
> extends TemplateGenerator {
  private lines: Content[] = [];
  private seperationSize = 1;

  constructor(lines: Content[], options?: { seperationSize?: number }) {
    super();
    this.lines = lines;
    this.seperationSize = options?.seperationSize ? options.seperationSize <= 0 ? 1 : options.seperationSize : 1;
  }

  setLines<NewContent extends string | TemplateGenerator>(lines: NewContent[]) {
    const This = this as unknown as MultiLineGenerator<NewContent>;
    This.lines = lines;
    return This;
  }

  addLine<NewContent extends string | TemplateGenerator>(line: NewContent) {
    const This = this as unknown as MultiLineGenerator<Content | NewContent>;
    This.lines.push(line);
    return This;
  }

  setSeperationSize(seperationSize: number) {
    const This = this as unknown as MultiLineGenerator<Content>;
    This.seperationSize = seperationSize;
    return This;
  }

  generate() {
    return this.lines
      .map((line) =>
        line instanceof TemplateGenerator ? line.generate() : line,
      )
      .join("\n".repeat(this.seperationSize));
  }

  static create<Content extends string | TemplateGenerator>(lines: Content[], options?: { seperationSize?: number }) {
    return new MultiLineGenerator<Content>(lines, options);
  }

  static generate<Content extends string | TemplateGenerator>(
    lines: Content[],
    options?: { seperationSize?: number }
  ) {
    return MultiLineGenerator.create<Content>(lines, options).generate();
  }
}
