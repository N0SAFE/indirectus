import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import {
  ClassGenerator,
  ClassMethodGenerator,
  ClassPropertyGenerator,
} from "@/lib/templating/generator/class.generator";
import { CommentGenerator } from "@/lib/templating/generator/comment.generator";
import { ImportGenerator } from "@/lib/templating/generator/import.generator";
import { Collection } from "@/types/registry";
import { ItemMethods, ItemsMethods, Methods, SingletonMethods } from "@/types/shape/Bindings/ItemBindings";

export const imports = (collection: Collection) =>
  MultiLineGenerator.create([
    ImportGenerator.create("@directus/sdk", {
      all: true,
      as: "Directus",
      type: true,
    }),
    ImportGenerator.create("../../types/ApplyQueryFields", {
      named: [
        {
          name: "ApplyQueryFields",
        },
      ],
      type: true,
    }),
    ImportGenerator.create("../chainable-bindable", {
      default: "ChainableBinding",
    }),
    ImportGenerator.create("../../client", {
      named: [{ name: "Schema" }, { name: "Collections" }],
      type: true,
    }),
    ...(collection.is_singleton
      ? [
          ImportGenerator.create("./types", {
            named: [
              {
                name: "TypedCollectionSingletonWrapper",
              },
            ],
          }),
          ImportGenerator.create(
            "../../commands/{{ collectionName }}.commands",
            {
              named: [
                {
                  name: "read{{collectionName}}",
                },
                {
                  name: "update{{collectionName}}",
                },
              ],
            },
          ),
        ]
      : [
          ImportGenerator.create("./types", {
            named: [
              {
                name: "TypedCollectionItemsWrapper",
              },
              {
                name: "TypedCollectionItemWrapper",
              },
            ],
          }),
          ImportGenerator.create(
            "../../commands/{{ collectionName }}.commands",
            {
              named: [
                {
                  name: "create{{collectionName}}Item",
                },
                {
                  name: "create{{collectionName}}Items",
                },
                {
                  name: "delete{{collectionName}}Item",
                },
                {
                  name: "delete{{collectionName}}Items",
                },
                {
                  name: "read{{collectionName}}Item",
                },
                {
                  name: "read{{collectionName}}Items",
                },
                {
                  name: "update{{collectionName}}Item",
                },
                {
                  name: "update{{collectionName}}Items",
                },
                {
                  name: "update{{collectionName}}ItemsBatch",
                },
                {
                  name: "aggregate{{collectionName}}Items",
                },
              ],
            },
          ),
        ]),
  ]);

export const variables = {
  collectionName:
    "{% set collectionName = collection.name | to_collection_name %}",
  collectionString:
    "{% set collectionString = collection.name | to_collection_string %}",
  collectionType:
    '{% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}',
  genericQuery:
    '{% set genericQuery = ["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join %}',
  genericQueryArray:
    '{% set genericQueryArray = ["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join %}',
  genericOutput:
    '{% set genericOutput = ["Output = ApplyQueryFields<Schema, ", collectionType, ", Query[\'fields\']>"] | join %}',
  genericOutputArray:
    '{% set genericOutputArray = ["Output = ApplyQueryFields<Schema, ", collectionType, ", Query[\'fields\']>[]"] | join %}',
  genericOutputVoid: '{% set genericOutputVoid = "Output = void" %}',
  applyType: '{% set applyType  = "Output" %}',
};

export type ClassesOptions<Class extends keyof Methods> = {
  methods?: ClassMethodGenerator[];
  properties?: ClassPropertyGenerator[];
  methodLines?: Record<Methods[Class], string[]>;
};

export const classes = {
  Singleton: (options?: ClassesOptions<"Singleton">) =>
    ClassGenerator.create("{{ collectionName }}Singleton", {
      extended: "ChainableBinding",
      implemented: ["TypedCollectionSingletonWrapper<{{ collectionType }}>"],
      properties: options?.properties,
      methods: [
        MultiLineGenerator.create([
          CommentGenerator.create(
            ["Reads the {{ collection.name | to_collection_text }} singleton."],
            { forceMultiline: true },
          ),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQuery }}",
              },
              {
                name: "{{ genericOutput }}",
              },
            ],
            params: [
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(read{{ collectionName }}(query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.read ?? []),
            ],
            return: "return toReturn;",
            name: "read" satisfies SingletonMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(
            [
              "Updates the {{ collection.name | to_collection_text }} singleton.",
            ],
            { forceMultiline: true },
          ),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQuery }}",
              },
              {
                name: "{{ genericOutput }}",
              },
            ],
            params: [
              {
                name: "patch",
                type: "Partial<{{ collectionType }}>",
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(update{{ collectionName }}(patch, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.update ?? []),
            ],
            return: "return toReturn;",
            name: "update" satisfies SingletonMethods,
          }),
        ]),
        ...(options?.methods ?? []),
      ],
    }),
  Items: (options?: ClassesOptions<"Items">) =>
    ClassGenerator.create("{{ collectionName }}Items", {
      extended: "ChainableBinding",
      implemented: [
        "TypedCollectionItemsWrapper<{{ collectionType }}, {{ collectionString }}>",
      ],
      properties: options?.properties,
      methods: [
        MultiLineGenerator.create([
          CommentGenerator.create(["Creates many items in the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQueryArray }}",
              },
              {
                name: "{{ genericOutputArray }}",
              },
            ],
            params: [
              {
                name: "items",
                type: "Partial<{{ collectionType }}>[]",
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(create{{ collectionName }}Items(items, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.create ?? []),
            ],
            return: "return toReturn;",
            name: "create" satisfies ItemsMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(["Read many items from the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQuery }}",
              },
              {
                name: "{{ genericOutputArray }}",
              },
            ],
            params: [
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(read{{ collectionName }}Items(query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.query ?? []),
            ],
            return: "return toReturn;",
            name: "query" satisfies ItemsMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(
            ["Read the first item from the collection matching the query."],
            { forceMultiline: true },
          ),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQuery }}",
              },
              {
                name: "{{ genericOutput }}",
              },
            ],
            params: [
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }} | undefined>",
            body: [
              "let toReturn = this.request(read{{ collectionName }}Items({...query,limit: 1})).then(items => items?.[0]) as unknown as Promise<{{ applyType }} | undefined>;",
              ...(options?.methodLines?.find ?? []),
            ],
            return: "return toReturn;",
            name: "find" satisfies ItemsMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(["Update many items in the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQueryArray }}",
              },
              {
                name: "{{ genericOutputArray }}",
              },
            ],
            params: [
              {
                name: "keys",
                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]',
              },
              {
                name: "patch",
                type: "Partial<{{ collectionType }}>",
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(update{{ collectionName }}Items(keys, patch, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.update ?? []),
            ],
            return: "return toReturn;",
            name: "update" satisfies ItemsMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(
            ["update many items in the collection with batch"],
            { forceMultiline: true },
          ),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQueryArray }}",
              },
              {
                name: "{{ genericOutputArray }}",
              },
            ],
            params: [
              {
                name: "items",
                type: "Partial<Directus.UnpackList<Collections.{{collectionName}}>>[]",
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(update{{ collectionName }}ItemsBatch(items, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.updateBatch ?? []),
            ],
            return: "return toReturn;",
            name: "updateBatch" satisfies ItemsMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(["Remove many items in the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericOutputVoid }}",
              },
            ],
            params: [
              {
                name: "keys",
                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]',
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(delete{{ collectionName }}Items(keys)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.remove ?? []),
            ],
            return: "return toReturn;",
            name: "remove" satisfies ItemsMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(["Aggregates the items in the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "Options extends Directus.AggregationOptions<Schema, {{ collectionString }}>",
              },
              {
                name: "Output = Directus.AggregationOutput< Schema, {{ collectionString }}, Options >[number]",
              },
            ],
            params: [
              {
                name: "options?",
                type: "Options",
              },
            ],
            returnType: "Promise<Output>",
            body: [
              "let toReturn = this.request(\n aggregate{{ collectionName }}Items<Options>(options?),\n).then((a) => a?.[0]) as unknown as Promise<Output>;",
              ...(options?.methodLines?.aggregate ?? []),
            ],
            return: "return toReturn;",
            name: "aggregate" satisfies ItemsMethods,
          }),
        ]),
        ...(options?.methods ?? []),
      ],
    }),
  Item: (options?: ClassesOptions<"Item">) =>
    ClassGenerator.create("{{ collectionName }}Item", {
      extended: "ChainableBinding",
      implemented: ["TypedCollectionItemWrapper<{{ collectionType }}>"],
      properties: options?.properties,
      methods: [
        MultiLineGenerator.create([
          CommentGenerator.create(["Create a single item in the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQueryArray }}",
              },
              {
                name: "{{ genericOutput }}",
              },
            ],
            params: [
              {
                name: "item",
                type: "Partial<{{ collectionType }}>",
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(create{{ collectionName }}Item(item, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.create ?? []),
            ],
            return: "return toReturn;",
            name: "create" satisfies ItemMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(["Read a single item from the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQuery }}",
              },
              {
                name: "{{ genericOutput }}",
              },
            ],
            params: [
              {
                name: "key",
                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number',
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(read{{ collectionName }}Item(key, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.get ?? []),
            ],
            return: "return toReturn;",
            name: "get" satisfies ItemMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(
            ["Update a single item from the collection."],
            {
              forceMultiline: true,
            },
          ),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericQueryArray }}",
              },
              {
                name: "{{ genericOutput }}",
              },
            ],
            params: [
              {
                name: "key",
                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number',
              },
              {
                name: "patch",
                type: "Partial<{{ collectionType }}>",
              },
              {
                name: "query",
                type: "Query",
                optional: true,
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(update{{ collectionName }}Item(key, patch, query)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.update ?? []),
            ],
            return: "return toReturn;",
            name: "update" satisfies ItemMethods,
          }),
        ]),
        MultiLineGenerator.create([
          CommentGenerator.create(["Remove a single item in the collection."], {
            forceMultiline: true,
          }),
          ClassMethodGenerator.create({
            isAsync: true,
            generics: [
              {
                name: "{{ genericOutputVoid }}",
              },
            ],
            params: [
              {
                name: "key",
                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number',
              },
            ],
            returnType: "Promise<{{ applyType }}>",
            body: [
              "let toReturn = this.request(delete{{ collectionName }}Item(key)) as unknown as Promise<{{ applyType }}>;",
              ...(options?.methodLines?.remove ?? []),
            ],
            return: "return toReturn;",
            name: "remove" satisfies ItemMethods,
          }),
        ]),
        ...(options?.methods ?? []),
      ],
    }),
} satisfies {
  [key in keyof Methods]: (options?: ClassesOptions<key>) => ClassGenerator;
};
