import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
    wrapInBrackets,
} from "../utils";

export class ArrayGenerator<
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
    AsConst extends boolean = false,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private content = [] as Content[];
    private asConst = false as AsConst;

    constructor(content: Content[], options?: { asConst?: AsConst }) {
        super();
        this.content = content;
        this.asConst = options?.asConst ?? (false as AsConst);
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent[],
    ) {
        const This = this as unknown as ArrayGenerator<NewContent, AsConst>;
        This.content = content;
        return This;
    }

    addContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as ArrayGenerator<
            Content | NewContent,
            AsConst
        >;
        This.content.push(content);
        return This;
    }

    setAsConst<NewAsConst extends boolean>(asConst: NewAsConst) {
        const This = this as unknown as ArrayGenerator<Content, NewAsConst>;
        This.asConst = asConst;
        return This;
    }

    generate() {
        return `${wrapInBrackets(this.content.join(", "))}${this.asConst ? " as const" : ""}`;
    }

    clone() {
        return new ArrayGenerator([...this.content], {
            asConst: this.asConst,
        }) as this;
    }

    override getAllChildren() {
        return this.content.filter(
            (line): line is Extract<typeof line, TemplateGenerator> =>
                line instanceof TemplateGenerator,
        );
    }

    static create<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AsConst extends boolean = false,
    >(content: Content[], options?: { asConst?: AsConst }) {
        return new ArrayGenerator(content, options);
    }

    static generate<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AsConst extends boolean = false,
    >(content: Content[], options?: { asConst?: AsConst }) {
        return ArrayGenerator.create(content, options).generate();
    }
}

// const array = ArrayGenerator.create([
//   "a",
//   "b",
//   "c",
//   ArrayGenerator.create([
//     ArrayGenerator.create([
//       ArrayGenerator.create([
//         IdentifierGenerator.create(
//           "a",
//           ArrayGenerator.create(["a", "b", "c"] as const),
//         ),
//       ]),
//     ]),
//   ]),
//   IdentifierGenerator.create(
//     "d",
//     ArrayGenerator.create([
//       "e",
//       "f",
//       IdentifierGenerator.create("b", ArrayGenerator.create([])),
//     ] as const),
//   ),
//   IdentifierGenerator.create("g", ArrayGenerator.create(["h", "i"] as const)),
// ]).getFromIdentifier("a");
