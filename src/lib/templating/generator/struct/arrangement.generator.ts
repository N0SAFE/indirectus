import { Loopable } from "../logic/loop.generator";
import { ArrayGenerator } from "../ts/array.generator";
import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";
import { IdentifierGenerator } from "./identifier.generate";

export class MultiLineGenerator<
    Content extends Loopable<string | TemplateStringGenerator> = Loopable<
        string | TemplateStringGenerator
    >,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

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

    map<NewContent extends string | TemplateStringGenerator>(
        predicate: (line: Content) => NewContent,
    ) {
        return this.lines.map(predicate);
    }

    setLines<NewContent extends string | TemplateStringGenerator>(
        lines: NewContent[],
    ) {
        const This = this as unknown as MultiLineGenerator<NewContent>;
        This.lines = lines;
        return This;
    }

    addLine<NewContent extends string | TemplateStringGenerator>(
        line: NewContent,
    ) {
        const This = this as unknown as MultiLineGenerator<
            Content | NewContent
        >;
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
                line instanceof TemplateStringGenerator
                    ? line.generate()
                    : line,
            )
            .join("\n".repeat(this.seperationSize));
    }

    clone() {
        return new MultiLineGenerator<Content>(
            this.lines.map((line) => {
                if (line instanceof TemplateStringGenerator) {
                    return line.clone() as Content;
                }
                return line;
            }),
            { seperationSize: this.seperationSize },
        ) as this;
    }

    override getAllChildren() {
        return this.lines.filter(
            (line): line is Extract<typeof line, TemplateGenerator> =>
                line instanceof TemplateGenerator,
        );
    }

    static create<Content extends string | TemplateStringGenerator>(
        lines: Content[],
        options?: { seperationSize?: number },
    ) {
        return new MultiLineGenerator<Content>(lines, options);
    }

    static generate<Content extends string | TemplateStringGenerator>(
        lines: Content[],
        options?: { seperationSize?: number },
    ) {
        return MultiLineGenerator.create<Content>(lines, options).generate();
    }
}

export type Mulitlineable<T, Add extends TemplateStringGenerator = never> =
    | T
    | (T extends TemplateStringGenerator
          ? MultiLineGenerator<T | Add>
          : Add extends TemplateStringGenerator
            ? MultiLineGenerator<Add>
            : never);

// const identifierGenerator = IdentifierGenerator.create(
//   "a",
//   ArrayGenerator.create(["1", "2", "3"]),
// );

// const e = identifierGenerator.getChildrenByIdentifier("a");

const mult = MultiLineGenerator.create([
    IdentifierGenerator.create(
        "a",
        ArrayGenerator.create(["1", "2", "3"] as const),
    ),
    IdentifierGenerator.create(
        "b",
        ArrayGenerator.create(["4", "5", "6"] as const),
    ),
    MultiLineGenerator.create([
        IdentifierGenerator.create(
            "c",
            IdentifierGenerator.create(
                "d",
                ArrayGenerator.create(["7", "8", "9"] as const),
            ),
        ),
        IdentifierGenerator.create(
            "e",
            ArrayGenerator.create(["10", "11", "12"]),
        ),
        ArrayGenerator.create(["13", "14", "15"]),
    ]),
]);

const t = mult.getChildrenByIdentifier("d");

type z =
    typeof mult extends MultiLineGenerator<infer Content> ? Content : never;

// type ez<T extends TemplateStringGenerator> = {
//   [Key in _RecursiveGet<T>["name"]]: never
// }

type zz = RecursiveGet<typeof mult>;

const aaa: "a" | "b" = "a";

// type e = RecursiveGet<typeof mult>;

type aaa = { name: "a" } | { name: "b" };

type p = aaa extends { name: "a" } ? "a" : never;
