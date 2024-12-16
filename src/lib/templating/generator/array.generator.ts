import { TemplateGenerator, wrapInBrackets } from "./utils";

export class ArrayGenerator extends TemplateGenerator {
    private content: string[] = [];
    private asConst = false;
    
    constructor(content: string[], options?: { asConst?: boolean }) {
        super();
        this.content = content;
        this.asConst = options?.asConst ?? false;
    }
    
    setContent(content: string[]) {
        this.content = content;
        return this;
    }
    
    setAsConst(asConst: boolean) {
        this.asConst = asConst;
        return this;
    }
    
    generate() {
        return `${wrapInBrackets(this.content.join(", "))}${this.asConst ? " as const" : ""}`;
    }
    
    static create(content: string[], options?: { asConst?: boolean }) {
        return new ArrayGenerator(content, options);
    }
    
    static generate(content: string[], options?: { asConst?: boolean }) {
        return ArrayGenerator.create(content, options).generate();
    }
}
