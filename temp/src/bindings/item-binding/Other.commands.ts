import type * as Directus from "@directus/sdk";
import type { ApplyQueryFields } from "../../types/ApplyQueryFields";
import ChainableBinding from "../chainable-bindable";
import type { Schema, Collections } from "../../client";
import {
  TypedCollectionItemsWrapper,
  TypedCollectionItemWrapper,
} from "./types";
import {
  createOtherItem,
  createOtherItems,
  deleteOtherItem,
  deleteOtherItems,
  readOtherItem,
  readOtherItems,
  updateOtherItem,
  updateOtherItems,
  updateOtherItemsBatch,
  aggregateOtherItems,
} from "../../commands/Other.commands";
export class OtherItems
  extends ChainableBinding
  implements TypedCollectionItemsWrapper<Collections.Other, "other">
{
  /**
   * Creates many items in the collection.
   */
  async create<
    const Query extends Directus.Query<Schema, Collections.Other[]>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>[],
  >(items: Partial<Collections.Other>[], query?: Query): Promise<Output> {
    let toReturn = this.request(
      createOtherItems(items, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read many items from the collection.
   */
  async query<
    const Query extends Directus.Query<Schema, Collections.Other>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>[],
  >(query?: Query): Promise<Output> {
    let toReturn = this.request(
      readOtherItems(query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read the first item from the collection matching the query.
   */
  async find<
    const Query extends Directus.Query<Schema, Collections.Other>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>,
  >(query?: Query): Promise<Output | undefined> {
    let toReturn = this.request(readOtherItems({ ...query, limit: 1 })).then(
      (items) => items?.[0],
    ) as unknown as Promise<Output | undefined>;
    return toReturn;
  }

  /**
   * Update many items in the collection.
   */
  async update<
    const Query extends Directus.Query<Schema, Collections.Other[]>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>[],
  >(
    keys: Collections.Other extends { id: number | string }
      ? Collections.Other["id"][]
      : string[] | number[],
    patch: Partial<Collections.Other>,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateOtherItems(keys, patch, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * update many items in the collection with batch
   */
  async updateBatch<
    const Query extends Directus.Query<Schema, Collections.Other[]>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>[],
  >(
    items: Partial<Directus.UnpackList<Collections.Other>>[],
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateOtherItemsBatch(items, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<Output = void>(
    keys: Collections.Other extends { id: number | string }
      ? Collections.Other["id"][]
      : string[] | number[],
  ): Promise<Output> {
    let toReturn = this.request(
      deleteOtherItems(keys),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Aggregates the items in the collection.
   */
  async aggregate<
    Options extends Directus.AggregationOptions<Schema, "other">,
    Output = Directus.AggregationOutput<Schema, "other", Options>[number],
  >(options: Options): Promise<Output> {
    let toReturn = this.request(aggregateOtherItems<Options>(options)).then(
      (a) => a?.[0],
    ) as unknown as Promise<Output>;
    return toReturn;
  }
}
export class OtherItem
  extends ChainableBinding
  implements TypedCollectionItemWrapper<Collections.Other>
{
  /**
   * Create a single item in the collection.
   */
  async create<
    const Query extends Directus.Query<Schema, Collections.Other[]>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>,
  >(item: Partial<Collections.Other>, query?: Query): Promise<Output> {
    let toReturn = this.request(
      createOtherItem(item, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read a single item from the collection.
   */
  async get<
    const Query extends Directus.Query<Schema, Collections.Other>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>,
  >(
    key: Collections.Other extends { id: number | string }
      ? Collections.Other["id"]
      : string | number,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      readOtherItem(key, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Update a single item from the collection.
   */
  async update<
    const Query extends Directus.Query<Schema, Collections.Other[]>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>,
  >(
    key: Collections.Other extends { id: number | string }
      ? Collections.Other["id"]
      : string | number,
    patch: Partial<Collections.Other>,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateOtherItem(key, patch, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Remove a single item in the collection.
   */
  async remove<Output = void>(
    key: Collections.Other extends { id: number | string }
      ? Collections.Other["id"]
      : string | number,
  ): Promise<Output> {
    let toReturn = this.request(
      deleteOtherItem(key),
    ) as unknown as Promise<Output>;
    return toReturn;
  }
}
