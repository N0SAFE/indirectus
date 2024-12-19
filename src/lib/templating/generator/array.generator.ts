import { TemplateGenerator, wrapInBrackets } from "./utils";

export class ArrayGenerator<
    Content extends string = string,
    AsConst extends boolean = false,
> extends TemplateGenerator {
    private content = [] as Content[];
    private asConst = false as AsConst;
    
    constructor(content: Content[], options?: { asConst?: AsConst }) {
        super();
        this.content = content;
        this.asConst = options?.asConst ?? (false as AsConst);
    }
    
    setContent<
        NewContent extends string,
    >(content: NewContent[]) {
        const This = this as unknown as ArrayGenerator<NewContent, AsConst>;
        This.content = content;
        return This;
    }
    
    setAsConst<
        NewAsConst extends boolean,
    >(asConst: NewAsConst) {
        const This = this as unknown as ArrayGenerator<Content, NewAsConst>;
        This.asConst = asConst;
        return This;
    }
    
    generate() {
        return `${wrapInBrackets(this.content.join(", "))}${this.asConst ? " as const" : ""}`;
    }

    clone() {
        return new ArrayGenerator([...this.content], { asConst: this.asConst }) as this;
    }
    
    static create<
        Content extends string = string,
        AsConst extends boolean = false,
    >(content: Content[], options?: { asConst?: AsConst }) {
        return new ArrayGenerator(content, options);
    }

    static generate<
        Content extends string = string,
        AsConst extends boolean = false,
    >(content: Content[], options?: { asConst?: AsConst }) {
        return ArrayGenerator.create(content, options).generate();
    }
}
