// // import semver from "semver";
// // import { TemplateGenerator } from './src/lib/templating/generator/utils';
// // import { MultiLineGenerator } from './src/lib/templating/generator/arrangement.generator';
// import { VariableDeclaratorGenerator } from "./src/lib/templating/generator/variable.generator";
// import { FunctionGenerator } from "./src/lib/templating/generator/function.generator";
// import { CommentGenerator } from "./src/lib/templating/generator/comment.generator";
// import {
//     NunjucksElseConditionGenerator,
//     NunjucksIfConditionGenerator,
//     NunjuksConditionGenerator,
// } from "./src/lib/templating/generator/nunjucks/condition.generator";
// import { NunjucksVariableGenerator } from "./src/lib/templating/generator/nunjucks/variables.generator";
// import { Collection, Registry } from "./src/types/registry";
// import { IdentifierGenerator } from "./src/lib/templating/generator/identifier.generate";
// import { ImportGenerator } from "./src/lib/templating/generator/import.generator";
// import { FileGenerator } from "./src/lib/templating/generator/file.generator";
// import { MultiLineGenerator } from "./src/lib/templating/generator/arrangement.generator";

// // const t = semver.compareIdentifiers("13.1.0", "13.0.0");
// // const r = semver.toComparators("13.1.0")!;

// // const dirs = ["13.0.0", "13.1.0", "13.2.0", "13.3.0", "12.0.0"];

// // console.log(dirs.sort(semver.compare))

// // const version = "13.1.0";

// // let smallest: string | null = null;

// // for (const dir of dirs) {
// //   console.log({
// //     dir,
// //     version,
// //     smallest,
// //   });
// //   if (
// //     semver.valid(dir) &&
// //     (semver.compareIdentifiers(dir, smallest) < 0 || smallest === null)
// //   ) {
// //     smallest = dir as `${number}.${number}.${number}`;
// //   }
// // }

// // console.log(smallest);

// // export class SectionIdentifierGenerator extends IdentifierGenerator<
// //   "section",
// //   MultiLineGenerator<string>
// // > {
// //   readonly identifier = "section";
// //   readonly content: MultiLineGenerator<string>;

// //   constructor(content: MultiLineGenerator<string>) {
// //     super();
// //     this.content = content;
// //   }

// //   clone(): this {
// //     return new SectionIdentifierGenerator(this.content.clone()) as this;
// //   }
// // }

// // export abstract class IdentifierGenerator<
// //   Identifier extends string,
// //   Content extends TemplateGenerator
// // > extends TemplateGenerator {
// //   abstract readonly identifier: Identifier;
// //   abstract readonly content: Content;

// //   getFromIdentifier<T extends string>(identifier: T): TemplateGenerator[] {
// //     return identifier === this.identifier ? [this.content] : [];
// //   }

// //   generate(): string {
// //     return this.content.generate();
// //   }

// //   clone(): this {
// //     // Implementation depends on your needs
// //     return this;
// //   }
// // }

// // export class CustomIdentifierGenerator extends IdentifierGenerator<
// //   "custom",
// //   MultiLineGenerator<string>
// // > {
// //   readonly identifier = "custom";
// //   readonly content: MultiLineGenerator<string>;

// //   constructor(content: MultiLineGenerator<string>) {
// //     super();
// //     this.content = content;
// //   }

// //   clone(): this {
// //     return new CustomIdentifierGenerator(this.content.clone()) as this;
// //   }
// // }

// // export class HeaderIdentifierGenerator extends IdentifierGenerator<
// //   "header",
// //   MultiLineGenerator<string>
// // > {
// //   readonly identifier = "header";
// //   readonly content: MultiLineGenerator<string>;

// //   constructor(content: MultiLineGenerator<string>) {
// //     super();
// //     this.content = content;
// //   }

// //   clone(): this {
// //     return new HeaderIdentifierGenerator(this.content.clone()) as this;
// //   }
// // }

// // const template = new MultiLineGenerator<string | TemplateGenerator>([]);

// // const header = new HeaderIdentifierGenerator(
// //   new MultiLineGenerator(["# Title"])
// // );

// // const section = new SectionIdentifierGenerator(
// //   new MultiLineGenerator(["Content paragraph"])
// // );

// // template
// //   .addLine(header)
// //   .addLine(section);

// // // Get all headers
// // const headers = template.getFromIdentifier("header");

// // // Get all sections
// // const sections = template.getFromIdentifier("section");

// const keyTemplate = {
//     name: "key",
//     type: "Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}['id'] : string | number",
// };
// const keysTemplate = {
//     name: "keys",
//     type: "Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}['id'][] : string[] | number[]",
// };
// const queryTemplate = {
//     name: "query",
//     type: "Query",
//     optional: true,
// };
// const t = <CollectionName extends string>(
//     registry: Registry,
//     collection: Collection,
// ) =>
//     IdentifierGenerator.create(
//         collection.name as unknown as `Commands<"${CollectionName}">`,
//         FileGenerator.create([
//             MultiLineGenerator.create([
//                 ImportGenerator.create("@directus/sdk", {
//                     all: true,
//                     type: true,
//                     as: "Directus",
//                 }),
//                 new ImportGenerator("@directus/sdk", {
//                     all: true,
//                     as: "DirectusSDK",
//                 }),
//                 new ImportGenerator("../client", {
//                     all: false,
//                     type: true,
//                     named: [
//                         {
//                             name: "Collections",
//                         },
//                         {
//                             name: "Schema",
//                         },
//                     ],
//                 }),
//             ]),
//             MultiLineGenerator.create([
//                 NunjucksVariableGenerator.create(
//                     "collectionName",
//                     "collection.name | to_collection_name",
//                 ),
//                 NunjucksVariableGenerator.create(
//                     "collectionString",
//                     "collection.name | to_collection_string",
//                 ),
//                 NunjucksVariableGenerator.create(
//                     "collectionType",
//                     '["Collections.", collection.name | to_collection_name] | join',
//                 ),
//                 NunjucksVariableGenerator.create(
//                     "genericQuery",
//                     '["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join',
//                 ),
//                 NunjucksVariableGenerator.create(
//                     "genericQueryArray",
//                     '["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join',
//                 ),
//                 NunjucksVariableGenerator.create(
//                     "applyType",
//                     '["ApplyQueryFields<Schema, ", collectionType, ", Query[\'fields\']>"] | join',
//                 ),
//             ]),
//             MultiLineGenerator.create([
//                 NunjuksConditionGenerator.create({
//                     if: NunjucksIfConditionGenerator.create(
//                         "collection.is_singleton",
//                         MultiLineGenerator.create([
//                             CommentGenerator.create([
//                                 "Reads the {{ collection.name | to_collection_text }} singleton.",
//                             ]),
//                             FunctionGenerator.create({
//                                 name: "read{{ collectionName }}",
//                                 generics: [
//                                     {
//                                         name: "{{ genericQuery }}",
//                                     },
//                                 ],
//                                 returnType:
//                                     "ReturnType<typeof DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>>",
//                                 body: 'let toReturn = DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);',
//                                 return: "toReturn",
//                             }),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Reads the {{ collection.name | to_collection_text }} singleton.",
//                                 ]),
//                                 VariableDeclaratorGenerator.create(
//                                     "get{{ collectionName }}",
//                                     "read{{ collectionName }}",
//                                     "const",
//                                 ),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Updates the {{ collection.name | to_collection_text }} singleton.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "update{{ collectionName }}",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQuery }}",
//                                         },
//                                     ],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", patch, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                         ]),
//                     ),
//                     else: NunjucksElseConditionGenerator.create(
//                         MultiLineGenerator.create([
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Create many {{ collection.name | to_collection_text }} items.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "create{{ collectionName }}Items",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQueryArray }}",
//                                         },
//                                     ],
//                                     params: [
//                                         {
//                                             name: "items",
//                                             type: `Partial<{{ collectionType }}>[]`,
//                                         },
//                                         queryTemplate,
//                                     ],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.createItems<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.createItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Create a single {{ collection.name | to_collection_text }} item.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "create{{ collectionName }}Item",
//                                     generics: [
//                                         {
//                                             name: "const Query extends DirectusSDK.Query<Schema, {{ collectionType }}[]>",
//                                         },
//                                     ],
//                                     params: [
//                                         {
//                                             name: "item",
//                                             type: `Partial<{{ collectionType }}>`,
//                                         },
//                                         queryTemplate,
//                                     ],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.createItem<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.createItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", item, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Read many {{ collection.name | to_collection_text }} items.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "read{{ collectionName }}Items",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQuery }}",
//                                         },
//                                     ],
//                                     params: [queryTemplate],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.readItems<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.readItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Read many {{ collection.name | to_collection_text }} items.",
//                                 ]),
//                                 VariableDeclaratorGenerator.create(
//                                     "list{{ collectionName }}",
//                                     "read{{ collectionName }}Items",
//                                     "const",
//                                 ),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Gets a single known {{ collection.name | to_collection_text }} item by id.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "read{{ collectionName }}Item",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQuery }}",
//                                         },
//                                     ],
//                                     params: [keyTemplate, queryTemplate],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.readItem<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.readItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Gets a single known {{ collection.name | to_collection_text }} item by id.",
//                                 ]),
//                                 VariableDeclaratorGenerator.create(
//                                     "read{{ collectionName }}",
//                                     "read{{ collectionName }}Item",
//                                     "const",
//                                 ),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Update many {{ collection.name | to_collection_text }} items.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "update{{ collectionName }}Items",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQueryArray }}",
//                                         },
//                                     ],
//                                     params: [
//                                         keysTemplate,
//                                         {
//                                             name: "patch",
//                                             type: `Partial<{{ collectionType }}>`,
//                                         },
//                                         queryTemplate,
//                                     ],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys, patch, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Update many {{ collection.name | to_collection_text }} items with batch",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "update{{ collectionName }}ItemsBatch",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQueryArray }}",
//                                         },
//                                     ],
//                                     params: [
//                                         {
//                                             name: "items",
//                                             type: `Partial<Directus.UnpackList<Collections.{{collectionName}}>>[]`,
//                                         },
//                                         queryTemplate,
//                                     ],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Update a single known {{ collection.name | to_collection_text }} item by id.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "update{{ collectionName }}Item",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQueryArray }}",
//                                         },
//                                     ],
//                                     params: [
//                                         keyTemplate,
//                                         {
//                                             name: "patch",
//                                             type: `Partial<{{ collectionType }}>`,
//                                         },
//                                         queryTemplate,
//                                     ],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, patch, query);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Deletes a single known {{ collection.name | to_collection_text }} item by id.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "delete{{ collectionName }}Item",
//                                     generics: [],
//                                     params: [keyTemplate],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.deleteItem<Schema, {{ collectionString }}>>",
//                                     body: 'let toReturn = DirectusSDK.deleteItem<Schema, {{ collectionString }}>("{{ collection.name }}", key);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                             MultiLineGenerator.create([
//                                 CommentGenerator.create([
//                                     "Deletes many {{ collection.name | to_collection_text }} items.",
//                                 ]),
//                                 FunctionGenerator.create({
//                                     name: "delete{{ collectionName }}Items",
//                                     generics: [
//                                         {
//                                             name: "{{ genericQueryArray }}",
//                                         },
//                                     ],
//                                     params: [keysTemplate],
//                                     returnType:
//                                         "ReturnType<typeof DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>>",
//                                     body: 'let toReturn = DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys);',
//                                     return: "toReturn",
//                                 }),
//                             ]),
//                         ]),
//                     ),
//                 }),
//             ]),
//         ]),
//     );

// const z = MultiLineGenerator.create([
//     t<"a">(
//         void 0 as unknown as Registry,
//         { name: "a" } as unknown as Collection,
//     ),
// ]);
// console.log(z.generate());

// import type * as Directus from "@directus/sdk";
// import * as DirectusSDK from "@directus/sdk";
// import type { Collections, Schema } from "../client";
// /**
//  * Read munknown directus activity items.
//  */
// export function readDirectusActivityItems(
//     query?: Query,
// ): ReturnType<typeof DirectusSDK.readActivities<Schema, Query>> {
//     let toReturn = DirectusSDK.readActivities<Schema, Query>(query);
//     return toReturn;
// }
// /**
//  * Read munknown directus activity items.
//  */
// export let listDirectusActivity = readDirectusActivityItems;
// /**
//  * Gets a single known directus activity item by id.
//  */
// export function readDirectusActivityItem(
//     key: Collections.test extends { id: number | string }
//         ? Collections.test["id"]
//         : string | number,
//     query?: Query,
// ): ReturnType<typeof DirectusSDK.readActivity<Schema, Query>> {
//     let toReturn = DirectusSDK.readActivity<Schema, Query>(key, query);
//     return toReturn;
// }
// /**
//  * Gets a single known directus activity item by id.
//  */
// export let readDirectusActivity = readDirectusActivityItem;
// /**
//  * Aggregates directus activity items.
//  */
// export function aggregateDirectusActivityItems(
//     option: Options,
// ): ReturnType<
//     typeof DirectusSDK.aggregate<Schema, "directus_activity", Options>
// > {
//     let toReturn = DirectusSDK.aggregate<Schema, "directus_activity", Options>(
//         "directus_activity",
//         option,
//     );
//     return toReturn;
// }

class Base {

}

class T1 {
    public other: Base = new Base();
}

class T2 extends Base {
    constructor(private param: T1) {super()}

    create(baseNumber: Base): T1 {
        return new T1();
    }
}

class T1Super extends T1 {
    public override other = new T2(this);
}

class T2Super extends T2 {
    constructor(param: T1Super) {
        super(param);
    }

    override create(baseString: T2) {
        return new T1Super();
    }
}