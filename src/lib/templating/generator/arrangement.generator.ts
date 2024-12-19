import { TemplateGenerator } from "./utils";

export class MultiLineGenerator<
  Content extends string | TemplateGenerator = string | TemplateGenerator,
> extends TemplateGenerator {
  private lines: Content[] = [];
  private seperationSize = 1;

  constructor(lines: Content[], options?: { seperationSize?: number }) {
    super();
    this.lines = lines;
    this.seperationSize = options?.seperationSize
      ? options.seperationSize <= 0
        ? 1
        : options.seperationSize
      : 1;
  }

  forEach(callback: (line: Content) => void) {
    this.lines.forEach(callback);
  }

  find(predicate: (line: Content) => boolean) {
    return this.lines.find(predicate);
  }

  every(predicate: (line: Content) => boolean) {
    return this.lines.every(predicate);
  }

  some(predicate: (line: Content) => boolean) {
    return this.lines.some(predicate);
  }

  filter(predicate: (line: Content) => boolean) {
    return this.lines.filter(predicate);
  }

  map<NewContent extends string | TemplateGenerator>(
    predicate: (line: Content) => NewContent,
  ) {
    return this.lines.map(predicate);
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

  getLines() {
    return this.lines;
  }

  setSeperationSize(seperationSize: number) {
    const This = this as unknown as MultiLineGenerator<Content>;
    This.seperationSize = seperationSize;
    return This;
  }

  getSeperationSize() {
    return this.seperationSize;
  }

  generate() {
    return this.lines
      .map((line) =>
        line instanceof TemplateGenerator ? line.generate() : line,
      )
      .join("\n".repeat(this.seperationSize));
  }

  clone() {
    return new MultiLineGenerator<Content>(
      this.lines.map((line) => {
        if (line instanceof TemplateGenerator) {
          return line.clone() as Content;
        }
        return line;
      }),
      { seperationSize: this.seperationSize },
    ) as this;
  }

  static create<Content extends string | TemplateGenerator>(
    lines: Content[],
    options?: { seperationSize?: number },
  ) {
    return new MultiLineGenerator<Content>(lines, options);
  }

  static generate<Content extends string | TemplateGenerator>(
    lines: Content[],
    options?: { seperationSize?: number },
  ) {
    return MultiLineGenerator.create<Content>(lines, options).generate();
  }
}
