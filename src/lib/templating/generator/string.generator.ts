import { TemplateGenerator } from "./utils";

export class StringGenerator extends TemplateGenerator {
  private quote: "single" | "double" | "backtick";
  private value: string;
  private asConst = false;

  constructor(
    value: string,
    options?: { asConst?: boolean; quote?: "single" | "double" | "backtick" },
  ) {
    super();
    this.value = value;
    this.asConst = options?.asConst ?? false;
    this.quote = options?.quote ?? "single";
  }

  setValue(value: string) {
    this.value = value;
    return this;
  }

  setAsConst(asConst: boolean) {
    this.asConst = asConst;
    return this;
  }

  setQuote(quote: "single" | "double" | "backtick") {
    this.quote = quote;
    return this;
  }

  generate() {
    return `${this.quote === "single" ? `'${this.value}'` : this.quote === "double" ? `"${this.value}"` : `\`${this.value}\``}${this.asConst ? " as const" : ""}`;
  }

  static create(value: string, options?: { asConst?: boolean, quote?: "single" | "double" | "backtick"  }) {
    return new StringGenerator(value, options);
  }
  
  static generate(value: string, options?: { asConst?: boolean, quote?: "single" | "double" | "backtick" }) {
    return StringGenerator.create(value, options).generate();
  }
}
