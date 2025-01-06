import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
    wrapInBrackets,
} from "../utils";
import { TemplateTypescriptTypeDeclaratorGenerator } from "./declarator.generator";

export class ArrayTypeGenerator<
    Content extends string | TemplateTypescriptTypeDeclaratorGenerator =
        | string
        | TemplateTypescriptTypeDeclaratorGenerator,
    AsConst extends boolean = false,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private content = [] as Content[];

    constructor(content: Content[]) {
        super();
        this.content = content;
    }

    setContent<
        NewContent extends string | TemplateTypescriptTypeDeclaratorGenerator,
    >(content: NewContent[]) {
        const This = this as unknown as ArrayTypeGenerator<NewContent, AsConst>;
        This.content = content;
        return This;
    }

    addContent<
        NewContent extends string | TemplateTypescriptTypeDeclaratorGenerator,
    >(content: NewContent) {
        const This = this as unknown as ArrayTypeGenerator<
            Content | NewContent,
            AsConst
        >;
        This.content.push(content);
        return This;
    }

    generate() {
        return `${wrapInBrackets(this.content.join(", "))}`;
    }

    clone() {
        return new ArrayTypeGenerator([...this.content]) as this;
    }

    override getAllChildren() {
        return this.content.filter(
            (line): line is Extract<typeof line, TemplateGenerator> =>
                line instanceof TemplateGenerator,
        );
    }

    static create<
        Content extends string | TemplateTypescriptTypeDeclaratorGenerator =
            | string
            | TemplateTypescriptTypeDeclaratorGenerator,
    >(content: Content[]) {
        return new ArrayTypeGenerator(content);
    }

    static generate<
        Content extends string | TemplateTypescriptTypeDeclaratorGenerator =
            | string
            | TemplateTypescriptTypeDeclaratorGenerator,
    >(content: Content[]) {
        return ArrayTypeGenerator.create(content).generate();
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
