import { to_collection_name } from "../../../../../default/extensions/filters/directus";
import { Context } from "../../../../../types/types";

export const generate = (context: Context) => {
  const typesTemplate = `import type * as Directus from "@directus/sdk";

import * as DirectusSDK from "@directus/sdk";

import { ToSafeOutput } from "../../utils/index";

import { ApplyQueryFields } from "../../types/ApplyQueryFields";

import { Schema } from "../../client";

export interface TypedCollectionSingletonWrapper<Collection extends object> {
  /**
   * Reads the singleton.
   */
  read<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
  >(
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Updates the singleton.
   */
  update<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
  >(
    patch: Partial<Collection>,
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;
}

export interface TypedCollectionItemsWrapper<Collection extends object> {
  /**
   * Creates many items in the collection.
   */
  create<
    const Query extends DirectusSDK.Query<Schema, Collection[]>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
  >(
    items: Partial<Collection>[],
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Read many items from the collection.
   */
  query<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
  >(
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Read the first item from the collection matching the query.
   */
  find<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
  >(
    query?: Query,
  ): Promise<ToSafeOutput<Output | undefined>>;

  /**
   * Update many items in the collection.
   */
  update<
    const Query extends DirectusSDK.Query<Schema, Collection[]>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
  >(
    keys: string[] | number[],
    patch: Partial<Collection>,
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * update many items with batch
   */
  updateBatch<
    const Query extends Directus.Query<Schema, Collection[]>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>[],
  >(
    items: Partial<Directus.UnpackList<Collection>>[],
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Remove many items in the collection.
   */
  remove<Output = void>(keys: string[] | number[]): Promise<ToSafeOutput<Output>>;
}

export interface TypedCollectionItemWrapper<Collection extends object> {
  /**
   * Create a single item in the collection.
   */
  create<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
  >(
    item: Partial<Collection>,
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Read a single item from the collection.
   */
  get<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
  >(
    key: string | number,
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Update a single item from the collection.
   */
  update<
    const Query extends DirectusSDK.Query<Schema, Collection>,
    Output = ApplyQueryFields<Schema, Collection, Query["fields"]>,
  >(
    key: string | number,
    patch: Partial<Collection>,
    query?: Query,
  ): Promise<ToSafeOutput<Output>>;

  /**
   * Remove many items in the collection.
   */
  remove<Output = void>(key: string | number): Promise<ToSafeOutput<Output>>;
}`;

  const perCollection = `{% set collectionName = collection.name | to_collection_name %}
{% set collectionString = collection.name | to_collection_string %}
{% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}
{% set genericQuery = ["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join %}
{% set genericQueryArray = ["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join %}
{% set genericOutput = ["Output = ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join %}
{% set genericOutputArray = ["Output = ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>[]"] | join %}
{% set genericOutputVoid = "Output = void" %}
{% set applyType  = "ToSafeOutput<Output>" %}
{% set applyTypeUndefined  = "ToSafeOutput<Output | undefined>" %}

import type * as Directus from '@directus/sdk'

import { toSafe, ToSafeOutput } from "../../utils/index";

import { ApplyQueryFields } from '../../types/ApplyQueryFields'

import ChainableBinding from '../chainable-bindable'

import {
    Collections,
    Schema,
} from '../../client'

{% if collection.is_singleton %}
import { TypedCollectionSingletonWrapper } from "./types";

import { read{{ collectionName }}, update{{ collectionName }} } from '../../commands/{{ collectionName }}.commands'

export class {{ collectionName }}Singleton extends ChainableBinding implements TypedCollectionSingletonWrapper<{{ collectionType }}>
{
  /**
   *
   */
  constructor(client: Directus.DirectusClient<Schema> & Directus.RestClient<Schema>)
  {
    super(client);
  }

  /**
   * Reads the {{ collection.name | to_collection_text }} singleton.
   */
  async read<{{ genericQuery }}, {{ genericOutput }}>(query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(read{{ collectionName }}(query))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Updates the {{ collection.name | to_collection_text }} singleton.
   */
  async update<{{ genericQuery }}, {{ genericOutput }}>(patch: Partial<{{ collectionType }}>, query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(update{{ collectionName }}(patch, query))) as unknown as Promise<{{ applyType }}>;
  }
}

{% else %}
import { TypedCollectionItemsWrapper, TypedCollectionItemWrapper } from "./types";

import { create{{ collectionName }}Item, create{{ collectionName }}Items, delete{{ collectionName }}Item, delete{{ collectionName }}Items, read{{ collectionName }}Item, read{{ collectionName }}Items, update{{ collectionName }}Item, update{{ collectionName }}Items, update{{ collectionName }}ItemsBatch } from '../../commands/{{ collectionName }}.commands'

export class {{ collectionName }}Items extends ChainableBinding implements TypedCollectionItemsWrapper<{{ collectionType }}>
{
  /**
   *
   */
  constructor(client: Directus.DirectusClient<Schema> & Directus.RestClient<Schema>)
  {
    super(client);
  }

  /**
   * Creates many items in the collection.
   */
  async create<
    {{ genericQueryArray }}, {{ genericOutputArray }}
  >(
      items: Partial<{{ collectionType }}>[],
      query?: Query
  ): Promise<
      {{ applyType }}
  > {
    return toSafe(this.request(create{{ collectionName }}Items(items, query))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Read many items from the collection.
   */
  async query<{{ genericQuery }}, {{ genericOutputArray }}>(query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(read{{ collectionName }}Items(query))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Read the first item from the collection matching the query.
   */
  async find<{{ genericQuery }}, {{ genericOutput }}>(query?: Query): Promise<{{ applyTypeUndefined }}>
  {
    return toSafe(this.request(read{{ collectionName }}Items({
      ...query,
      limit: 1,
    })).then(items => items?.[0])) as unknown as Promise<{{ applyTypeUndefined }}>;
  }

  /**
   * Update many items in the collection.
   */
  async update<{{ genericQueryArray }}, {{ genericOutputArray }}>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[], patch: Partial<{{ collectionType }}>, query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(update{{ collectionName }}Items(keys, patch, query))) as unknown as Promise<{{ applyType }}>;
  }
  
  /**
   * update many items in the collection with batch
   */
  async updateBatch<{{ genericQueryArray }}, {{ genericOutputArray }}> (items: Partial<Directus.UnpackList<Collections.{{collectionName}}>>[], query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(update{{ collectionName }}ItemsBatch(items, query))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<{{ genericOutputVoid }}>(keys: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]): Promise<{{ applyType }}>
  {
    return toSafe(this.request(delete{{ collectionName }}Items(keys))) as unknown as Promise<{{ applyType }}>;
  }
}

export class {{ collectionName }}Item extends ChainableBinding implements TypedCollectionItemWrapper<{{ collectionType }}>
{
  /**
   *
   */
  constructor(client: Directus.DirectusClient<Schema> & Directus.RestClient<Schema>)
  {
    super(client);
  }

  /**
   * Create a single item in the collection.
   */
  async create<{{ genericQuery }}, {{ genericOutput }}>(item: Partial<{{ collectionType }}>, query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(create{{ collectionName }}Item(item, query as any))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Read a single item from the collection.
   */
  async get<{{ genericQuery }}, {{ genericOutput }}>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(read{{ collectionName }}Item(key, query))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Update a single item from the collection.
   */
  async update<{{ genericQuery }}, {{ genericOutput }}>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number, patch: Partial<{{ collectionType }}>, query?: Query): Promise<{{ applyType }}>
  {
    return toSafe(this.request(update{{ collectionName }}Item(key, patch, query as any))) as unknown as Promise<{{ applyType }}>;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<{{ genericOutputVoid }}>(key: Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number): Promise<{{ applyType }}>
  {
    return toSafe(this.request(delete{{ collectionName }}Item(key))) as unknown as Promise<{{ applyType }}>;
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
