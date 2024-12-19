import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import { CommentGenerator } from "@/lib/templating/generator/comment.generator";
import { FunctionGenerator } from "@/lib/templating/generator/function.generator";
import { ImportGenerator } from "@/lib/templating/generator/import.generator";
import { TemplateGenerator } from "@/lib/templating/generator/utils";
import { VariableGenerator } from "@/lib/templating/generator/variable.generator";
import NunjuksVariable from "@/lib/templating/string/nunjuksVariable";
import { Command, MethodsShape } from "../common/type";
import { Collection } from "@/types/registry";

const keyTemplate = {
  name: "key",
  type: "Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}['id'] : string | number",
};
const keysTemplate = {
  name: "keys",
  type: "Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}['id'][] : string[] | number[]",
};
const queryTemplate = {
  name: "query",
  type: "Query",
  optional: true,
};

export const generate = (collection: Collection) => {
  const toReturn = {
    imports: MultiLineGenerator.create([
      ImportGenerator.create("@directus/sdk", {
        all: true,
        type: true,
        as: "Directus",
      }),
      new ImportGenerator("@directus/sdk", {
        all: true,
        as: "DirectusSDK",
      }),
      new ImportGenerator("../client", {
        all: false,
        type: true,
        named: [
          {
            name: "Collections",
          },
          {
            name: "Schema",
          },
        ],
      }),
    ]),
    variables: {
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
      applyType: `{% set applyType  = ["ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join %}`,
    } as const satisfies Record<string, NunjuksVariable>,
  }
  if (collection.is_singleton) {
    
  }
};

export const imports = MultiLineGenerator.create([
  ImportGenerator.create("@directus/sdk", {
    all: true,
    type: true,
    as: "Directus",
  }),
  new ImportGenerator("@directus/sdk", {
    all: true,
    as: "DirectusSDK",
  }),
  new ImportGenerator("../client", {
    all: false,
    type: true,
    named: [
      {
        name: "Collections",
      },
      {
        name: "Schema",
      },
    ],
  }),
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
  applyType: `{% set applyType  = ["ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join %}`,
} as const satisfies Record<string, NunjuksVariable>;

export const methods = {
  Singleton: {
    read: {
      comment: CommentGenerator.create(
        ["Reads the {{ collection.name | to_collection_text }} singleton."],
        {
          forceMultiline: true,
        },
      ),
      export: FunctionGenerator.create({
        name: "read{{ collectionName }}",
        generics: [
          {
            name: "{{ genericQuery }}",
          },
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);',
        return: "toReturn",
      }),
    },
    get: {
      comment: CommentGenerator.create(
        ["Reads the {{ collection.name | to_collection_text }} singleton."],
        { forceMultiline: true },
      ),
      export: VariableGenerator.create(
        "get{{ collectionName }}",
        "read{{ collectionName }}",
        "const",
      ),
    },
    update: {
      comment: CommentGenerator.create(
        ["Updates the {{ collection.name | to_collection_text }} singleton."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "update{{ collectionName }}",
        generics: [
          {
            name: "{{ genericQuery }}",
          },
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", patch, query);',
        return: "toReturn",
      }),
    },
  } as const satisfies Record<string, Command>,
  Item: {
    create: {
      comment: CommentGenerator.create(
        ["Create a single {{ collection.name | to_collection_text }} item."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "create{{ collectionName }}Item",
        generics: [
          {
            name: "const Query extends Directus.Query<Schema, {{ collectionType }}[]>",
          },
        ],
        params: [
          {
            name: "item",
            type: `Partial<{{ collectionType }}>`,
          },
          queryTemplate,
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.createItem<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.createItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", item, query);',
        return: "toReturn",
      }),
    },

    read: {
      comment: CommentGenerator.create(
        [
          "Gets a single known {{ collection.name | to_collection_text }} item by id.",
        ],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "read{{ collectionName }}Item",
        generics: [
          {
            name: "{{ genericQuery }}",
          },
        ],
        params: [keyTemplate, queryTemplate],
        returnType:
          "ReturnType<typeof DirectusSDK.readItem<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.readItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, query);',
        return: "toReturn",
      }),
    },
    get: {
      comment: CommentGenerator.create(
        [
          "Gets a single known {{ collection.name | to_collection_text }} item by id.",
        ],
        { forceMultiline: true },
      ),
      export: VariableGenerator.create(
        "get{{ collectionName }}",
        "read{{ collectionName }}Item",
        "const",
      ),
    },
    update: {
      comment: CommentGenerator.create(
        [
          "Update a single known {{ collection.name | to_collection_text }} item by id.",
        ],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "update{{ collectionName }}Item",
        generics: [
          {
            name: "{{ genericQueryArray }}",
          },
        ],
        params: [
          keyTemplate,
          {
            name: "patch",
            type: `Partial<{{ collectionType }}>`,
          },
          queryTemplate,
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, patch, query);',
        return: "toReturn",
      }),
    },
    delete: {
      comment: CommentGenerator.create(
        [
          "Deletes a single known {{ collection.name | to_collection_text }} item by id.",
        ],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "delete{{ collectionName }}Item",
        generics: [],
        params: [keyTemplate],
        returnType:
          "ReturnType<typeof DirectusSDK.deleteItem<Schema, {{ collectionString }}>>",
        body: 'let toReturn = DirectusSDK.deleteItem<Schema, {{ collectionString }}>("{{ collection.name }}", key);',
        return: "toReturn",
      }),
    },
  } as const satisfies Record<string, Command>,
  Items: {
    create: {
      comment: CommentGenerator.create(
        ["Create many {{ collection.name | to_collection_text }} items."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "create{{ collectionName }}Items",
        generics: [
          {
            name: "{{ genericQueryArray }}",
          },
        ],
        params: [
          {
            name: "items",
            type: `Partial<{{ collectionType }}>[]`,
          },
          queryTemplate,
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.createItems<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.createItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);',
        return: "toReturn",
      }),
    },
    read: {
      comment: CommentGenerator.create(
        ["Read many {{ collection.name | to_collection_text }} items."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "read{{ collectionName }}Items",
        generics: [
          {
            name: "{{ genericQuery }}",
          },
        ],
        params: [queryTemplate],
        returnType:
          "ReturnType<typeof DirectusSDK.readItems<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.readItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);',
        return: "toReturn",
      }),
    },
    list: {
      comment: CommentGenerator.create(
        ["Read many {{ collection.name | to_collection_text }} items."],
        { forceMultiline: true },
      ),
      export: VariableGenerator.create(
        "list{{ collectionName }}",
        "read{{ collectionName }}Items",
        "const",
      ),
    },
    update: {
      comment: CommentGenerator.create(
        ["Update many {{ collection.name | to_collection_text }} items."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "update{{ collectionName }}Items",
        generics: [
          {
            name: "{{ genericQueryArray }}",
          },
        ],
        params: [
          keysTemplate,
          {
            name: "patch",
            type: `Partial<{{ collectionType }}>`,
          },
          queryTemplate,
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys, patch, query);',
        return: "toReturn",
      }),
    },
    updateBatch: {
      comment: CommentGenerator.create(
        [
          "Update many {{ collection.name | to_collection_text }} items with batch",
        ],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "update{{ collectionName }}ItemsBatch",
        generics: [
          {
            name: "{{ genericQueryArray }}",
          },
        ],
        params: [
          {
            name: "items",
            type: `Partial<Directus.UnpackList<Collections.{{collectionName}}>>[]`,
          },
          queryTemplate,
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);',
        return: "toReturn",
      }),
    },
    delete: {
      comment: CommentGenerator.create(
        ["Deletes many {{ collection.name | to_collection_text }} items."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "delete{{ collectionName }}Items",
        generics: [
          {
            name: "{{ genericQueryArray }}",
          },
        ],
        params: [keysTemplate],
        returnType:
          "ReturnType<typeof DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>>",
        body: 'let toReturn = DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys);',
        return: "toReturn",
      }),
    },
    aggregate: {
      comment: CommentGenerator.create(
        ["Aggregates {{ collection.name | to_collection_text }} items."],
        { forceMultiline: true },
      ),
      export: FunctionGenerator.create({
        name: "aggregate{{ collectionName }}Items",
        generics: [
          {
            extends:
              "Directus.AggregationOptions<Schema, '{{ collection.name }}'>",
            name: "Options",
          },
        ],
        params: [
          {
            name: "option",
            type: "Options",
          },
        ],
        returnType:
          "ReturnType<typeof DirectusSDK.aggregate<Schema, '{{ collection.name }}', Options>>",
        body: 'let toReturn = DirectusSDK.aggregate<Schema, "{{ collection.name }}", Options>("{{ collection.name }}", option);',
        return: "toReturn",
      }),
    },
  } as const satisfies Record<string, Command>,
} as const satisfies MethodsShape;

// import type * as Directus from "@directus/sdk";

// import * as DirectusSDK from "@directus/sdk";

// import {
//   Collections,
//   Schema,
// } from "../client";
// import { ImportGenerator } from "@/lib/templating/generator/import.generator";

// {% set collectionName = collection.name | to_collection_name %}
// {% set collectionString = collection.name | to_collection_string %}
// {% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}
// {% set genericQuery = ["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join %}
// {% set genericQueryArray = ["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join %}
// {% set applyType  = ["ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join %}

// {% if collection.is_singleton %}

// /**
//  * Reads the {{ collection.name | to_collection_text }} singleton.
//  */
// export function read{{ collectionName }}<
//   {{ genericQuery }},
// >(query?: Query): ReturnType<typeof DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);
// }

// /**
//  * Reads the {{ collection.name | to_collection_text }} singleton.
//  */
// export const get{{ collectionName }} = read{{ collectionName }};

// /**
//  * Updates the {{ collection.name | to_collection_text }} singleton.
//  */
// export function update{{ collectionName }}<
//   {{ genericQuery }},
// >(patch: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", patch, query);
// }

// {% else %}

// /**
//  * Create many {{ collection.name | to_collection_text }} items.
//  */
// export function create{{ collectionName }}Items<
//   {{ genericQueryArray }}
// >(items: Partial<{{ collectionType }}>[], query?: Query): ReturnType<typeof DirectusSDK.createItems<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.createItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);
// }

// /**
//  * Create a single {{ collection.name | to_collection_text }} item.
//  */
// export function create{{ collectionName }}Item<
//   const Query extends DirectusSDK.Query<Schema, {{ collectionType }}[]> // Is this a mistake? Why []?
// >(item: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.createItem<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.createItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", item, query);
// }

// /**
//  * Read many {{ collection.name | to_collection_text }} items.
//  */
// export function read{{ collectionName }}Items<
//   {{ genericQuery }},
// >(query?: Query): ReturnType<typeof DirectusSDK.readItems<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.readItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);
// }

// /**
//  * Read many {{ collection.name | to_collection_text }} items.
//  */
// export const list{{ collectionName }} = read{{ collectionName }}Items;

// /**
//  * Gets a single known {{ collection.name | to_collection_text }} item by id.
//  */
// export function read{{ collectionName }}Item<
//   {{ genericQuery }},
// >(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, query?: Query): ReturnType<typeof DirectusSDK.readItem<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.readItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, query);
// }

// /**
//  * Gets a single known {{ collection.name | to_collection_text }} item by id.
//  */
// export const read{{ collectionName }} = read{{ collectionName }}Item;

// /**
//  * Update many {{ collection.name | to_collection_text }} items.
//  */
// export function update{{ collectionName }}Items<
//   {{ genericQueryArray }},
// >(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[], patch: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys, patch, query);
// }

// /**
//  * Update many {{ collection.name | to_collection_text }} items with batch
//  */
// export function update{{ collectionName }}ItemsBatch<
//   {{ genericQueryArray }},
// > (items: Partial<Directus.UnpackList<Collections.{{collectionName}}>>[], query?: Query): ReturnType<typeof DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);
// }

// /**
//  * Update a single known {{ collection.name | to_collection_text }} item by id.
//  */
// export function update{{ collectionName }}Item<
//   {{ genericQueryArray }},
// >(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, patch: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, patch, query);
// }

// /**
//  * Deletes many {{ collection.name | to_collection_text }} items.
//  */
// export function delete{{ collectionName }}Items<
//   {{ genericQueryArray }},
// >(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]): ReturnType<typeof DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>> {
//   return DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys);
// }

// /**
//  * Deletes a single known {{ collection.name | to_collection_text }} item by id.
//  */
// export function delete{{ collectionName }}Item(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number): ReturnType<typeof DirectusSDK.deleteItem<Schema, {{ collectionString }}>> {
//   return DirectusSDK.deleteItem<Schema, {{ collectionString }}>("{{ collection.name }}", key);
// }

// /**
//  * Aggregates {{ collection.name | to_collection_text }} items.
//  */
// export function aggregate{{ collectionName }}Items<
//   Options extends Directus.AggregationOptions<Schema, "{{ collection.name }}">,
// >(
//   option: Options,
// ): ReturnType<typeof DirectusSDK.aggregate<Schema, "{{ collection.name }}", Options>> {
//   return DirectusSDK.aggregate<Schema, "{{ collection.name }}", Options>(
//     "{{ collection.name }}",
//     option,
//   );
// }

// {% endif %}
