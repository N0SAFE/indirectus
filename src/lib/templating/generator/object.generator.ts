import { TemplateGenerator, wrapInBraces } from "./utils";

export class ObjectGenerator extends TemplateGenerator {
    private content: Record<string, string> = {};
    private asConst = false;
    
    constructor(content: Record<string, string>, options?: { asConst?: boolean }) {
        super();
        this.content = content;
        this.asConst = options?.asConst ?? false;
    }
    
    setContent(content: Record<string, string>) {
        this.content = content;
        return this;
    }
    
    setAsConst(asConst: boolean) {
        this.asConst = asConst;
        return this;
    }
    
    generate() {
        return `${wrapInBraces(Object.entries(this.content)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", "))}${this.asConst ? " as const" : ""}`;
    }
    
    static create(content: Record<string, string>, options?: { asConst?: boolean }) {
        return new ObjectGenerator(content, options);
    }
    
    static generate(content: Record<string, string>, options?: { asConst?: boolean }) {
        return ObjectGenerator.create(content, options).generate();
    }
}
