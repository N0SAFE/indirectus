import { TemplateGenerator } from "./utils";

export class ExportGenerator extends TemplateGenerator {
    private default: boolean = false;
    private content: string | TemplateGenerator;
    
    constructor(content: string | TemplateGenerator, options?: { default?: boolean }) {
        super();
        this.content = content;
        this.default = options?.default ?? false;
    }
    
    setContent(content: string | TemplateGenerator) {
        this.content = content;
        return this;
    }
    
    setDefault(defaultValue: boolean) {
        this.default = defaultValue;
        return this;
    }
    
    generate() {
        return `export ${this.default ? "default " : ""}${this.content}`;
    }
    
    static create(content: string | TemplateGenerator, options?: { default?: boolean }) {
        return new ExportGenerator(content, options);
    }
    
    static generate(content: string | TemplateGenerator, options?: { default?: boolean }) {
        return ExportGenerator.create(content, options).generate();
    }
}
