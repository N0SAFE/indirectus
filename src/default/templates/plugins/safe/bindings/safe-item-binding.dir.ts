import { to_collection_name } from "../../../../../default/extensions/filters/directus";
import { Context } from "../../../../../types/types";

export const generate = (context: Context) => {
  const typesTemplate = `
  import type * as Directus from "@directus/sdk";

import * as DirectusSDK from "@directus/sdk";

import { ApplyQueryFields } from "../../types/ApplyQueryFields";

import { Collections, CollectionsType, Schema } from "../../client";

export interface TypedCollectionSingletonWrapper<Collection extends object>
{
  /**
   * Reads the singleton.
   */
  read<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>, isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Updates the singleton.
   */
  update<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(patch: Partial<Collection>, query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>, isError: false, error: never} | {error: Error, isError: true, data: never}>;
}

export interface TypedCollectionItemsWrapper<Collection extends object>
{
  /**
   * Creates many items in the collection.
   */
  create<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(items: Partial<Collection>[], query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>[], isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Read many items from the collection.
   */
  query<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>[], isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Read the first item from the collection matching the query.
   */
  find<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']> | undefined, isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Update many items in the collection.
   */
  update<const Query extends DirectusSDK.Query<CollectionsType, Collection[]>>(keys: string[] | number[], patch: Partial<Collection>, query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>[], isError: false, error: never} | {error: Error, isError: true, data: never}>;
    
  /**
   * update many items with batch
   */
  updateBatch<const Query extends Directus.Query<CollectionsType, Collection[]>>(items: Partial<Directus.UnpackList<Collection>>[], query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ["*"] : Query["fields"] extends undefined ? ["*"] : Query["fields"] extends Readonly<any[]> ? Query["fields"] : ["*"]>[], isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Remove many items in the collection.
   */
  remove<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(keys: string[] | number[]): Promise<{data: void, isError: false, error: never} | {error: Error, isError: true, data: never} >;
}

export interface TypedCollectionItemWrapper<Collection extends object>
{
  /**
   * Create a single item in the collection.
   */
  create<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(item: Partial<Collection>, query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>, isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Read a single item from the collection.
   */
  get<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(key: string | number, query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']> | undefined, isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Update a single item from the collection.
   */
  update<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(key: string | number, patch: Partial<Collection>, query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collection, Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']> | undefined, isError: false, error: never} | {error: Error, isError: true, data: never}>;

  /**
   * Remove many items in the collection.
   */
  remove<const Query extends DirectusSDK.Query<CollectionsType, Collection>>(key: string | number): Promise<{data: void, isError: false, error: never} | {error: Error, isError: true, data: never}>;
}`;

  const perCollection = `{% set collectionName = collection.name | to_collection_name %}
{% set collectionString = collection.name | to_collection_string %}
{% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}
{% set genericQuery = ["const Query extends Directus.Query<CollectionsType, ", collectionType, ">"] | join %}
{% set genericQueryArray = ["const Query extends Directus.Query<CollectionsType, ", collectionType, "[]>"] | join %}
{% set applyType  = ["ApplyQueryFields<CollectionsType, ", collectionType, ", Query extends undefined ? ['*'] : Query['fields'] extends undefined ? ['*'] : Query['fields'] extends Readonly<any[]> ? Query['fields'] : ['*']>"] | join %}


{% if collection.is_singleton %}

/**
 * Reads the {{ collection.name | to_collection_text }} singleton.
 */
export function read{{ collectionName }}<
  {{ genericQuery }},
>(query?: Query) {
  return DirectusSDK.readSingleton<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", query);
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
>(patch: Partial<{{ collectionType }}>, query?: Query) {
  return DirectusSDK.updateSingleton<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", patch, query);
}

export class {{ collectionName }}Singleton implements TypedCollectionSingletonWrapper<{{ collectionType }}>
{
  /**
   *
   */
  constructor(private client: Directus.DirectusClient<Schema> & Directus.RestClient<Schema>)
  {
  }

  /**
   * Reads the {{ collection.name | to_collection_text }} singleton.
   */
  async read<{{ genericQuery }}>(query?: Query): Promise<{data: {{ applyType }}, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return this.client.request(read{{ collectionName }}(query)).then((data) => ({data, isError: false}) as any).catch((error) => ({error, isError: true})); // the any type is here because we transform the type through or custom ApplyQueryFields type.
  }

  /**
   * Updates the {{ collection.name | to_collection_text }} singleton.
   */
  async update<{{ genericQuery }}>(patch: Partial<{{ collectionType }}>, query?: Query): Promise<{data: {{ applyType }}, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(update{{ collectionName }}(patch, query)).then((data) => ({data, isError: false}) as any).catch((error) => ({error, isError: true})); // the any type is here because we transform the type through or custom ApplyQueryFields type.
  }
}

{% else %}

/**
 * Create many {{ collection.name | to_collection_text }} items.
 */
export function create{{ collectionName }}Items<
  {{ genericQueryArray}}
>(items: Partial<{{ collectionType }}>[], query?: Query) {
  return DirectusSDK.createItems<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", items, query);
}

/**
 * Create a single {{ collection.name | to_collection_text }} item.
 */
export function create{{ collectionName }}Item<
  const Query extends DirectusSDK.Query<CollectionsType, {{ collectionType }}[]> // Is this a mistake? Why []?
>(item: Partial<{{ collectionType }}>, query?: Query) {
  return DirectusSDK.createItem<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", item, query);
}

/**
 * Read many {{ collection.name | to_collection_text }} items.
 */
export function read{{ collectionName }}Items<
  {{ genericQuery }},
>(query?: Query) {
  return DirectusSDK.readItems<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", query);
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
>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, query?: Query) {
  return DirectusSDK.readItem<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", key, query);
}

/**
 * Gets a single known {{ collection.name | to_collection_text }} item by id.
 */
export const read{{ collectionName }} = read{{ collectionName }}Item;

/**
 * Read many {{ collection.name | to_collection_text }} items.
 */
export function update{{ collectionName }}Items<
  {{ genericQueryArray }},
>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[], patch: Partial<{{ collectionType }}>, query?: Query) {
  return DirectusSDK.updateItems<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", keys, patch, query);
}

/**
 * Update many {{ collection.name | to_collection_text }} items with batch
 */
export function update{{ collectionName }}ItemsBatch<
{{ genericQueryArray }},
> (items: Partial<Directus.UnpackList<Collections.{{collectionName}}>>[], query?: Query) {
  return DirectusSDK.updateItemsBatch<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", items, query);
}

/**
 * Gets a single known {{ collection.name | to_collection_text }} item by id.
 */
export function update{{ collectionName }}Item<
  {{ genericQueryArray }},
>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, patch: Partial<{{ collectionType }}>, query?: Query) {
  return DirectusSDK.updateItem<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", key, patch, query);
}

/**
 * Deletes many {{ collection.name | to_collection_text }} items.
 */
export function delete{{ collectionName }}Items<
  {{ genericQueryArray }},
>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]) {
  return DirectusSDK.deleteItems<CollectionsType, {{ collectionString }}, Query>("{{ collection.name }}", keys);
}

/**
 * Deletes a single known {{ collection.name | to_collection_text }} item by id.
 */
export function delete{{ collectionName }}Item(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number) {
  return DirectusSDK.deleteItem<CollectionsType, {{ collectionString }}>("{{ collection.name }}", key);
}

export class {{ collectionName }}Items implements TypedCollectionItemsWrapper<{{ collectionType }}>
{
  /**
   *
   */
  constructor(private client: Directus.DirectusClient<Schema> & Directus.RestClient<Schema>)
  {
  }

  /**
   * Creates many items in the collection.
   */
  async create<
    const Query extends DirectusSDK.Query<CollectionsType, {{ collectionType }}>
  >(
      items: Partial<{{ collectionType }}>[],
      query?: Query
  ): Promise<
      {data: {{ applyType }}[], isError: false, error: never} | {error: Error, isError: true, data: never}
  > {
    return await this.client.request(create{{ collectionName }}Items(items, query as any)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    })); // the any type is here because we transform the type through or custom ApplyQueryFields type.
  }

  /**
   * Read many items from the collection.
   */
  async query<{{ genericQuery }}>(query?: Query): Promise<{data: {{ applyType }}[], isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(read{{ collectionName }}Items(query)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    })); // the any type is here because we transform the type through or custom ApplyQueryFields type.
  }

  /**
   * Read the first item from the collection matching the query.
   */
  async find<{{ genericQuery }}>(query?: Query): Promise<{data: {{ applyType }} | undefined, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return this.client.request(read{{ collectionName }}Items({
      ...query,
      limit: 1,
    })).then((items) => ({
      data: items?.[0], // the any type is here because we transform the type through or custom ApplyQueryFields type.
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    }));
  }

  /**
   * Update many items in the collection.
   */
  async update<{{ genericQueryArray }}>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[], patch: Partial<{{ collectionType }}>, query?: Query): Promise<{data: {{ applyType }}[], isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(update{{ collectionName }}Items(keys, patch, query)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    })); // the any type is here because we transform the type through or custom ApplyQueryFields type.
  }
  
  /**
   * update many items in the collection with batch
   */
  async updateBatch<{{ genericQueryArray }}> (items: Partial<Directus.UnpackList<Collections.{{collectionName}}>>[], query?: Query): Promise<{data: ApplyQueryFields<CollectionsType, Collections.{{collectionName}}[], Query extends undefined ? ["*"] : Query["fields"] extends undefined ? ["*"] : Query["fields"] extends Readonly<any[]> ? Query["fields"] : ["*"]>[], isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(update{{ collectionName }}ItemsBatch(items, query)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    })); // the any type is here because we transform the type through or custom ApplyQueryFields type.
  }

  /**
   * Remove many items in the collection.
   */
  async remove<{{ genericQuery }}>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]): Promise<{data: void, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(delete{{ collectionName }}Items(keys)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    }));
  }
}

export class {{ collectionName }}Item implements TypedCollectionItemWrapper<{{ collectionType }}>
{
  /**
   *
   */
  constructor(private client: Directus.DirectusClient<Schema> & Directus.RestClient<Schema>)
  {
  }

  /**
   * Create a single item in the collection.
   */
  async create<{{ genericQuery }}>(item: Partial<{{ collectionType }}>, query?: Query): Promise<{data: {{ applyType }}, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(create{{ collectionName }}Item(item, query as any)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    }));
  }

  /**
   * Read a single item from the collection.
   */
  async get<{{ genericQuery }}>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, query?: Query): Promise<{data: {{ applyType }} | undefined, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(read{{ collectionName }}Item(key, query)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    }));
  }

  /**
   * Update a single item from the collection.
   */
  async update<{{ genericQuery }}>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, patch: Partial<{{ collectionType }}>, query?: Query): Promise<{data: {{ applyType }} | undefined, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(update{{ collectionName }}Item(key, patch, query as any)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    }));
  }

  /**
   * Remove many items in the collection.
   */
  async remove<{{ genericQuery }}>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number): Promise<{data: void, isError: false, error: never} | {error: Error, isError: true, data: never}>
  {
    return await this.client.request(delete{{ collectionName }}Item(key)).then((data) => ({
      data,
      isError: false,
    }) as any).catch((error) => ({
      error,
      isError: true,
    }));
  }
}

{% endif %}`;

  return {
    files: [
      {
        path: "./index.ts",
        template: context.registry.collections
          .filter((collection) => {
            return !collection.is_system;
          })
          .reduce((acc, collection) => {
            return `${acc}export * from './${to_collection_name(context, collection.name.toString())}.collection';\n`;
          }, ""),
      },
      {
        path: "./types.ts",
        template: typesTemplate,
      },
      ...context.registry.collections
        .filter((collection) => {
          return !collection.is_system;
        })
        .map((collection) => {
          return {
            path: `./${to_collection_name(context, collection.name.toString())}.collection.ts`,
            template: perCollection,
            variables: {
              collection,
            },
          };
        }),
    ],
  };
};
