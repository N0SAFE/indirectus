import { RecursiveGet, TemplateStringGenerator } from "../utils";

// export type Depths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// export type GetAllContentToTemplateStringGeneratorUnion<
//   T extends ReturnType<TemplateStringGenerator["getAllChildren"]>,
// > = T extends TemplateStringGenerator
//   ? T
//   : T extends TemplateStringGenerator[]
//     ? T[number]
//     : never;

// export type _RecursiveGet<
//   T extends TemplateStringGenerator,
//   Depth extends number = 5,
//   ExistAlready extends string = "",
// > = Depth extends 0
//   ? never
//   : T extends TemplateStringGenerator
//     ? T extends IdentifierGenerator
//       ? T extends IdentifierGenerator<infer Name, infer Content>
//         ? Name extends ExistAlready
//           ? _RecursiveGet<
//               GetAllContentToTemplateStringGeneratorUnion<
//                 ReturnType<T["getAllChildren"]>
//               >,
//               Depths[Depth],
//               ExistAlready
//             >
//           :
//               | { name: Name; content: Content }
//               | _RecursiveGet<
//                   GetAllContentToTemplateStringGeneratorUnion<
//                     ReturnType<T["getAllChildren"]>
//                   >,
//                   Depths[Depth],
//                   ExistAlready | Name
//                 >
//         : never
//       : _RecursiveGet<
//           GetAllContentToTemplateStringGeneratorUnion<
//             ReturnType<T["getAllChildren"]>
//           >,
//           Depths[Depth],
//           ExistAlready
//         >
//     : never;
// // @ts-ignore
// export type RecursiveGet<
//   T extends TemplateStringGenerator,
//   Rec extends _RecursiveGet<T> = _RecursiveGet<T>,
// > = {
//   [Key in Rec["name"]]: Extract<
//     Rec,
//     { name: Key; content: unknown }
//   >["content"];
// };

export class IdentifierGenerator<
    Name extends string = string,
    Content extends TemplateStringGenerator = TemplateStringGenerator,
> extends TemplateStringGenerator {
    constructor(
        private name: Name,
        private content: Content,
    ) {
        super();
    }

    setName<NewName extends string>(name: NewName) {
        const This = this as unknown as IdentifierGenerator<NewName, Content>;
        This.name = name;
        return This;
    }

    setContent<NewContent extends TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as IdentifierGenerator<Name, NewContent>;
        This.content = content;
        return This;
    }

    generate() {
        return this.content.generate();
    }

    clone() {
        return new IdentifierGenerator<Name, Content>(
            this.name,
            this.content.clone(),
        ) as this;
    }

    override getChildrenByIdentifier<
        T extends RecursiveGet<ReturnType<this["getAllChildren"]>[number]>,
        Identifier extends keyof T,
    >(identifier: Identifier): T[Identifier][] {
        const content = this.getAllChildren();
        return content.map((child) => {
            if (identifier === (this.name as string)) {
                return child;
            }
            return child.getChildrenByIdentifier(identifier as string);
        }) as T[Identifier][];
    }

    override getAllChildren() {
        return [this.content] as [Content];
    }

    static create<
        Name extends string = string,
        Content extends TemplateStringGenerator = TemplateStringGenerator,
    >(name: Name, content: Content) {
        return new IdentifierGenerator(name, content);
    }

    static generate<
        Name extends string = string,
        Content extends TemplateStringGenerator = TemplateStringGenerator,
    >(name: Name, content: Content) {
        return IdentifierGenerator.create(name, content).generate();
    }
}

// const identifierGenerator = IdentifierGenerator.create(
//   "a",
//   ArrayGenerator.create(["1", "2", "3"]),
// );

// const zzz = identifierGenerator.getChildrenByIdentifier("a");

// const identifier = IdentifierGenerator.create(
//   "name",
//   IdentifierGenerator.create(
//     "v",
//     IdentifierGenerator.create(
//       "c",
//       IdentifierGenerator.create(
//         "s",
//         IdentifierGenerator.create(
//           "other",
//           IdentifierGenerator.create("blah", "blah"),
//         ),
//       ),
//     ),
//   ),
// );

// type z = RecursiveGet<typeof identifier>;

// const t = identifier.getAllChildren();
// const ez = identifier.getChildrenByIdentifier("c");
// const a = identifier.test("c");
// type Obj = typeof identifier extends IdentifierGenerator<infer _, infer __, infer T, infer Keys> ? {
//   Keys: Keys,
//   T: T,
// } : never;
// type z = Obj['T']['content']

// type zz = RecursiveGet<typeof identifier>;
