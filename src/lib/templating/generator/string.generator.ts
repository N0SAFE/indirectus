import { TemplateGenerator } from "./utils";

export class StringGenerator<
  Value extends string = string,
  Quote extends "single" | "double" | "backtick" = "single",
  AsConst extends boolean = false,
> extends TemplateGenerator {
  private quote: Quote;
  private value: Value;
  private asConst: AsConst;

  constructor(value: Value, options?: { asConst?: AsConst; quote?: Quote }) {
    super();
    this.value = value;
    this.asConst = options?.asConst ?? (false as AsConst);
    this.quote = options?.quote ?? ("single" as Quote);
  }

  setValue<NewValue extends string>(value: NewValue) {
    const This = this as unknown as StringGenerator<NewValue, Quote, AsConst>;
    This.value = value;
    return This;
  }

  setAsConst<NewAsConst extends boolean>(asConst: NewAsConst) {
    const This = this as unknown as StringGenerator<Value, Quote, NewAsConst>;
    This.asConst = asConst;
    return This;
  }

  setQuote<NewQuote extends "single" | "double" | "backtick">(quote: NewQuote) {
    const This = this as unknown as StringGenerator<Value, NewQuote, AsConst>;
    This.quote = quote;
    return This;
  }

  generate() {
    return `${this.quote === "single" ? `'${this.value}'` : this.quote === "double" ? `"${this.value}"` : `\`${this.value}\``}${this.asConst ? " as const" : ""}`;
  }

  clone() {
    return new StringGenerator(this.value, {
      asConst: this.asConst,
      quote: this.quote,
    }) as this;
  }

  static create<
    Value extends string = string,
    Quote extends "single" | "double" | "backtick" = "single",
    AsConst extends boolean = false,
  >(value: Value, options?: { asConst?: AsConst; quote?: Quote }) {
    return new StringGenerator(value, options);
  }

  static generate<
    Value extends string = string,
    Quote extends "single" | "double" | "backtick" = "single",
    AsConst extends boolean = false,
  >(value: Value, options?: { asConst?: AsConst; quote?: Quote }) {
    return StringGenerator.create(value, options).generate();
  }
}
