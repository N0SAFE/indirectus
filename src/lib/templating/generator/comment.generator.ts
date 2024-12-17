import { TemplateGenerator } from "./utils";

export class CommentGenerator extends TemplateGenerator {
  private contents: string[] = [];
  private forceMultiline = false;
  private forceComment = false;

  constructor(contents: string[] = [], options?: { forceMultiline?: boolean, forceComment?: boolean }) {
    super()
    this.contents = contents;
    this.forceMultiline = options?.forceMultiline ?? false;
    this.forceComment = options?.forceComment ?? false;
  }

  setContents(contents: string[]) {
    this.contents = contents;
    return this;
  }

  addContent(content: string) {
    this.contents.push(content);
    return this;
  }

  setForceMultiline(forceMultiline: boolean) {
    this.forceMultiline = forceMultiline;
    return this;
  }
  
  setForceComment(forceComment: boolean) {
    this.forceComment = forceComment;
    return this;
  }

  generate() {
    return this.contents.length === 0
      ? this.forceComment
        ? this.forceMultiline
          ? "/** */"
          : "//"
        : ""
      : this.contents.length === 1 && !this.forceMultiline
        ? `// ${this.contents[0]}`
        : `/**\n${this.contents.map((content) => ` * ${content}`).join("\n* ")}\n */`;
  }

  static create(contents: string[], options?: { forceMultiline?: boolean, forceComment?: boolean }) {
    return new CommentGenerator(contents, options);
  }

  static generate(contents: string[], options?: { forceMultiline?: boolean, forceComment?: boolean }) {
    return CommentGenerator.create(contents, options).generate();
  }
}
