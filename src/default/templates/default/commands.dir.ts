import { to_collection_name } from "../../extensions/filters/directus";
import type { Context } from "../../../types/types";

export const generate = async (context: Context) => {
    console.log("Generating command for Directus instance");
  const perCollection = `import type * as Directus from "@directus/sdk";

import * as DirectusSDK from "@directus/sdk";

import {
  Collections,
  Schema,
} from "../client";

{% set collectionName = collection.name | to_collection_name %}
{% set collectionString = collection.name | to_collection_string %}
{% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}
{% set genericQuery = ["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join %}
{% set genericQueryArray = ["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join %}
{% set applyType  = ["ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join %}


{% if collection.is_singleton %}

/**
 * Reads the {{ collection.name | to_collection_text }} singleton.
 */
export function read{{ collectionName }}<
  {{ genericQuery }},
>(query?: Query): ReturnType<typeof DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);
}

/**
 * Reads the {{ collection.name | to_collection_text }} singleton.
 */
export const get{{ collectionName }} = read{{ collectionName }};

/**
 * Updates the {{ collection.name | to_collection_text }} singleton.
 */
export function update{{ collectionName }}<
  {{ genericQuery }},
>(patch: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.updateSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", patch, query);
}

{% else %}

/**
 * Create many {{ collection.name | to_collection_text }} items.
 */
export function create{{ collectionName }}Items<
  {{ genericQueryArray }}
>(items: Partial<{{ collectionType }}>[], query?: Query): ReturnType<typeof DirectusSDK.createItems<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.createItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);
}

/**
 * Create a single {{ collection.name | to_collection_text }} item.
 */
export function create{{ collectionName }}Item<
  const Query extends DirectusSDK.Query<Schema, {{ collectionType }}[]> // Is this a mistake? Why []?
>(item: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.createItem<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.createItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", item, query);
}

/**
 * Read many {{ collection.name | to_collection_text }} items.
 */
export function read{{ collectionName }}Items<
  {{ genericQuery }},
>(query?: Query): ReturnType<typeof DirectusSDK.readItems<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.readItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);
}

/**
 * Read many {{ collection.name | to_collection_text }} items.
 */
export const list{{ collectionName }} = read{{ collectionName }}Items;

/**
 * Gets a single known {{ collection.name | to_collection_text }} item by id.
 */
export function read{{ collectionName }}Item<
  {{ genericQuery }},
>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, query?: Query): ReturnType<typeof DirectusSDK.readItem<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.readItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, query);
}

/**
 * Gets a single known {{ collection.name | to_collection_text }} item by id.
 */
export const read{{ collectionName }} = read{{ collectionName }}Item;

/**
 * Update many {{ collection.name | to_collection_text }} items.
 */
export function update{{ collectionName }}Items<
  {{ genericQueryArray }},
>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[], patch: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.updateItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys, patch, query);
}

/**
 * Update many {{ collection.name | to_collection_text }} items with batch
 */
export function update{{ collectionName }}ItemsBatch<
  {{ genericQueryArray }},
> (items: Partial<Directus.UnpackList<Collections.{{collectionName}}>>[], query?: Query): ReturnType<typeof DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.updateItemsBatch<Schema, {{ collectionString }}, Query>("{{ collection.name }}", items, query);
}

/**
 * Update a single known {{ collection.name | to_collection_text }} item by id.
 */
export function update{{ collectionName }}Item<
  {{ genericQueryArray }},
>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, patch: Partial<{{ collectionType }}>, query?: Query): ReturnType<typeof DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.updateItem<Schema, {{ collectionString }}, Query>("{{ collection.name }}", key, patch, query);
}

/**
 * Deletes many {{ collection.name | to_collection_text }} items.
 */
export function delete{{ collectionName }}Items<
  {{ genericQueryArray }},
>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]): ReturnType<typeof DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>> {
  return DirectusSDK.deleteItems<Schema, {{ collectionString }}, Query>("{{ collection.name }}", keys);
}

/**
 * Deletes a single known {{ collection.name | to_collection_text }} item by id.
 */
export function delete{{ collectionName }}Item(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number): ReturnType<typeof DirectusSDK.deleteItem<Schema, {{ collectionString }}>> {
  return DirectusSDK.deleteItem<Schema, {{ collectionString }}>("{{ collection.name }}", key);
}

/**
 * Aggregates {{ collection.name | to_collection_text }} items.
 */
export function aggregate{{ collectionName }}Items<
  Options extends Directus.AggregationOptions<Schema, "{{ collection.name }}">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "{{ collection.name }}", Options>> {
  return DirectusSDK.aggregate<Schema, "{{ collection.name }}", Options>(
    "{{ collection.name }}",
    option,
  );
}


{% endif %}`;

  return {
    files: [
      {
        path: "./index.ts",
        template: context.registry.collections
          .reduce((acc, collection) => {
            return `${acc}export * from './${to_collection_name(context, collection.name.toString())}.commands';\n`;
          }, ""),
      },
      ...context.registry.collections
        .filter((collection) => {
          return !collection.is_system;
        })
        .map((collection) => {
          return {
            path: `./${to_collection_name(context, collection.name.toString())}.commands.ts`,
            template: perCollection,
            variables: {
              collection,
            },
          };
        }),
    ],
  };
};
