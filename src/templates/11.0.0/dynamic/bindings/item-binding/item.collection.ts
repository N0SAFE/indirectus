import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import {
  ClassGenerator,
  ClassMethodGenerator,
} from "@/lib/templating/generator/class.generator";
import { CommentGenerator } from "@/lib/templating/generator/comment.generator";
import { ImportGenerator } from "@/lib/templating/generator/import.generator";
import { Collection } from "@/types/registry";

export const imports = (collection: Collection) =>
  MultiLineGenerator.create([
    ImportGenerator.create("@directus/sdk", {
      all: true,
      as: "Directus",
      type: true,
    }),
    ImportGenerator.create("@directus/sdk", {
      all: true,
      as: "DirectusSDK",
    }),
    ImportGenerator.create("../../types/ApplyQueryFields", {
      named: [
        {
          name: "ApplyQueryFields",
        },
      ],
      type: true,
    }),
    ImportGenerator.create("../../client", {
      named: [{ name: "Schema" }],
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

/**
 * {% set collectionName = collection.name | to_collection_name %}
  {% set collectionString = collection.name | to_collection_string %}
  {% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}
  {% set genericQuery = ["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join %}
  {% set genericQueryArray = ["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join %}
  {% set genericOutput = ["Output = ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join %}
  {% set genericOutputArray = ["Output = ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>[]"] | join %}
  {% set genericOutputVoid = "Output = void" %}
  {% set applyType  = "Output" %}
  
  import type * as Directus from '@directus/sdk'
  
  import { ApplyQueryFields } from '../../types/ApplyQueryFields'
  
  import ChainableBinding from '../chainable-bindable'
  
  import {
      Collections,
      Schema,
  } from '../../client'
 */

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

export const is_singleton = [
  ClassGenerator.create("{{ collectionName }}Singleton", {
    extended: "ChainableBinding",
    implemented: ["TypedCollectionSingletonWrapper<{{ collectionType }}>"],
    methods: [
      MultiLineGenerator.create([
        CommentGenerator.create(
          ["Reads the {{ collection.name | to_collection_text }} singleton."],
          { forceMultiline: true },
        ),
        ClassMethodGenerator.create({
          body: "return this.request(read{{ collectionName }}(query)) as unknown as Promise<{{ applyType }}>;",
          name: "read",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(
          ["Updates the {{ collection.name | to_collection_text }} singleton."],
          { forceMultiline: true },
        ),
        ClassMethodGenerator.create({
          body: "return this.request(update{{ collectionName }}(patch, query)) as unknown as Promise<{{ applyType }}>;",
          name: "update",
        }),
      ]),
    ],
  }),
];

export type Naming<CollectionName extends string, IsSingleton extends boolean> = IsSingleton extends true
  ? {
    [key in `${CollectionName}Singleton`]: `create${CollectionName}Singleton` | `update${CollectionName}Singleton` | `read${CollectionName}Singleton`;
  }
  : {
    [key in `${CollectionName}Items`]: `create${CollectionName}Items` | `read${CollectionName}Items` | `find${CollectionName}Items` | `update${CollectionName}Items` | `update${CollectionName}ItemsBatch` | `delete${CollectionName}Items` | `aggregate${CollectionName}Items`;
  } & {
    [key in `${CollectionName}Item`]: `create${CollectionName}Item` | `read${CollectionName}Item` | `update${CollectionName}Item` | `delete${CollectionName}Item`;
  };


export const is_not_singleton = [
  ClassGenerator.create("{{ collectionName }}Items", {
    extended: "ChainableBinding",
    implemented: [
      "TypedCollectionItemsWrapper<{{ collectionType }}, {{ collectionString }}>",
    ],
    methods: [
      MultiLineGenerator.create([
        CommentGenerator.create(["Creates many items in the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(create{{ collectionName }}Items(items, query)) as unknown as Promise<{{ applyType }}>;",
          name: "create",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Read many items from the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(read{{ collectionName }}Items(query)) as unknown as Promise<{{ applyType }}>;",
          name: "query",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(
          ["Read the first item from the collection matching the query."],
          { forceMultiline: true },
        ),
        ClassMethodGenerator.create({
          body: "return this.request(read{{ collectionName }}Items({\n        ...query,\n        limit: 1,\n      })).then(items => items?.[0]) as unknown as Promise<{{ applyType }} | undefined>;",
          name: "find",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Update many items in the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(update{{ collectionName }}Items(keys, patch, query)) as unknown as Promise<{{ applyType }}>;",
          name: "update",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(
          ["update many items in the collection with batch"],
          { forceMultiline: true },
        ),
        ClassMethodGenerator.create({
          body: "return this.request(update{{ collectionName }}ItemsBatch(items, query)) as unknown as Promise<{{ applyType }}>;",
          name: "updateBatch",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Remove many items in the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(delete{{ collectionName }}Items(keys)) as unknown as Promise<{{ applyType }}>;",
          name: "remove",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Aggregates the items in the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(\n aggregate{{ collectionName }}Items<Options>(options),\n).then((a) => a?.[0]) as unknown as Promise<Output>;",
          name: "aggregate",
        }),
      ]),
    ],
  }),
  ClassGenerator.create("{{ collectionName }}Item", {
    extended: "ChainableBinding",
    implemented: ["TypedCollectionItemWrapper<{{ collectionType }}>"],
    methods: [
      MultiLineGenerator.create([
        CommentGenerator.create(["Create a single item in the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(create{{ collectionName }}Item(item, query)) as unknown as Promise<{{ applyType }}>;",
          name: "create",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Read a single item from the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(read{{ collectionName }}Item(key, query)) as unknown as Promise<{{ applyType }}>;",
          name: "get",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Update a single item from the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(update{{ collectionName }}Item(key, patch, query)) as unknown as Promise<{{ applyType }}>;",
          name: "update",
        }),
      ]),
      MultiLineGenerator.create([
        CommentGenerator.create(["Remove a single item in the collection."], {
          forceMultiline: true,
        }),
        ClassMethodGenerator.create({
          body: "return this.request(delete{{ collectionName }}Item(key)) as unknown as Promise<{{ applyType }}>;",
          name: "remove",
        }),
      ]),
    ],
  }),
];