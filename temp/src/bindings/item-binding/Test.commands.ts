import type * as Directus from "@directus/sdk";
import type { ApplyQueryFields } from "../../types/ApplyQueryFields";
import ChainableBinding from "../chainable-bindable";
import type { Schema, Collections } from "../../client";
import {
  TypedCollectionItemsWrapper,
  TypedCollectionItemWrapper,
} from "./types";
import {
  createTestItem,
  createTestItems,
  deleteTestItem,
  deleteTestItems,
  readTestItem,
  readTestItems,
  updateTestItem,
  updateTestItems,
  updateTestItemsBatch,
  aggregateTestItems,
} from "../../commands/Test.commands";
export class TestItems
  extends ChainableBinding
  implements TypedCollectionItemsWrapper<Collections.Test, "test">
{
  /**
   * Creates many items in the collection.
   */
  async create<
    const Query extends Directus.Query<Schema, Collections.Test[]>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>[],
  >(items: Partial<Collections.Test>[], query?: Query): Promise<Output> {
    let toReturn = this.request(
      createTestItems(items, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read many items from the collection.
   */
  async query<
    const Query extends Directus.Query<Schema, Collections.Test>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>[],
  >(query?: Query): Promise<Output> {
    let toReturn = this.request(
      readTestItems(query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read the first item from the collection matching the query.
   */
  async find<
    const Query extends Directus.Query<Schema, Collections.Test>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>,
  >(query?: Query): Promise<Output | undefined> {
    let toReturn = this.request(readTestItems({ ...query, limit: 1 })).then(
      (items) => items?.[0],
    ) as unknown as Promise<Output | undefined>;
    return toReturn;
  }

  /**
   * Update many items in the collection.
   */
  async update<
    const Query extends Directus.Query<Schema, Collections.Test[]>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>[],
  >(
    keys: Collections.Test extends { id: number | string }
      ? Collections.Test["id"][]
      : string[] | number[],
    patch: Partial<Collections.Test>,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateTestItems(keys, patch, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * update many items in the collection with batch
   */
  async updateBatch<
    const Query extends Directus.Query<Schema, Collections.Test[]>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>[],
  >(
    items: Partial<Directus.UnpackList<Collections.Test>>[],
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateTestItemsBatch(items, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<Output = void>(
    keys: Collections.Test extends { id: number | string }
      ? Collections.Test["id"][]
      : string[] | number[],
  ): Promise<Output> {
    let toReturn = this.request(
      deleteTestItems(keys),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Aggregates the items in the collection.
   */
  async aggregate<
    Options extends Directus.AggregationOptions<Schema, "test">,
    Output = Directus.AggregationOutput<Schema, "test", Options>[number],
  >(options: Options): Promise<Output> {
    let toReturn = this.request(aggregateTestItems<Options>(options)).then(
      (a) => a?.[0],
    ) as unknown as Promise<Output>;
    return toReturn;
  }
}
export class TestItem
  extends ChainableBinding
  implements TypedCollectionItemWrapper<Collections.Test>
{
  /**
   * Create a single item in the collection.
   */
  async create<
    const Query extends Directus.Query<Schema, Collections.Test[]>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>,
  >(item: Partial<Collections.Test>, query?: Query): Promise<Output> {
    let toReturn = this.request(
      createTestItem(item, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read a single item from the collection.
   */
  async get<
    const Query extends Directus.Query<Schema, Collections.Test>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>,
  >(
    key: Collections.Test extends { id: number | string }
      ? Collections.Test["id"]
      : string | number,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      readTestItem(key, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Update a single item from the collection.
   */
  async update<
    const Query extends Directus.Query<Schema, Collections.Test[]>,
    Output = ApplyQueryFields<Schema, Collections.Test, Query["fields"]>,
  >(
    key: Collections.Test extends { id: number | string }
      ? Collections.Test["id"]
      : string | number,
    patch: Partial<Collections.Test>,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateTestItem(key, patch, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Remove a single item in the collection.
   */
  async remove<Output = void>(
    key: Collections.Test extends { id: number | string }
      ? Collections.Test["id"]
      : string | number,
  ): Promise<Output> {
    let toReturn = this.request(
      deleteTestItem(key),
    ) as unknown as Promise<Output>;
    return toReturn;
  }
}
