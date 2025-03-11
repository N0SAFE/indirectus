import type * as Directus from "@directus/sdk";
import type { ApplyQueryFields } from "../../types/ApplyQueryFields";
import ChainableBinding from "../chainable-bindable";
import type { Schema, Collections } from "../../client";
import {
  TypedCollectionItemsWrapper,
  TypedCollectionItemWrapper,
} from "./types";
import {
  createOtherTestItem,
  createOtherTestItems,
  deleteOtherTestItem,
  deleteOtherTestItems,
  readOtherTestItem,
  readOtherTestItems,
  updateOtherTestItem,
  updateOtherTestItems,
  updateOtherTestItemsBatch,
  aggregateOtherTestItems,
} from "../../commands/OtherTest.commands";
export class OtherTestItems
  extends ChainableBinding
  implements TypedCollectionItemsWrapper<Collections.OtherTest, "other_test">
{
  /**
   * Creates many items in the collection.
   */
  async create<
    const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>[],
  >(items: Partial<Collections.OtherTest>[], query?: Query): Promise<Output> {
    let toReturn = this.request(
      createOtherTestItems(items, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read many items from the collection.
   */
  async query<
    const Query extends Directus.Query<Schema, Collections.OtherTest>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>[],
  >(query?: Query): Promise<Output> {
    let toReturn = this.request(
      readOtherTestItems(query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read the first item from the collection matching the query.
   */
  async find<
    const Query extends Directus.Query<Schema, Collections.OtherTest>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>,
  >(query?: Query): Promise<Output | undefined> {
    let toReturn = this.request(
      readOtherTestItems({ ...query, limit: 1 }),
    ).then((items) => items?.[0]) as unknown as Promise<Output | undefined>;
    return toReturn;
  }

  /**
   * Update many items in the collection.
   */
  async update<
    const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>[],
  >(
    keys: Collections.OtherTest extends { id: number | string }
      ? Collections.OtherTest["id"][]
      : string[] | number[],
    patch: Partial<Collections.OtherTest>,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateOtherTestItems(keys, patch, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * update many items in the collection with batch
   */
  async updateBatch<
    const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>[],
  >(
    items: Partial<Directus.UnpackList<Collections.OtherTest>>[],
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateOtherTestItemsBatch(items, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<Output = void>(
    keys: Collections.OtherTest extends { id: number | string }
      ? Collections.OtherTest["id"][]
      : string[] | number[],
  ): Promise<Output> {
    let toReturn = this.request(
      deleteOtherTestItems(keys),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Aggregates the items in the collection.
   */
  async aggregate<
    Options extends Directus.AggregationOptions<Schema, "other_test">,
    Output = Directus.AggregationOutput<Schema, "other_test", Options>[number],
  >(options: Options): Promise<Output> {
    let toReturn = this.request(aggregateOtherTestItems<Options>(options)).then(
      (a) => a?.[0],
    ) as unknown as Promise<Output>;
    return toReturn;
  }
}
export class OtherTestItem
  extends ChainableBinding
  implements TypedCollectionItemWrapper<Collections.OtherTest>
{
  /**
   * Create a single item in the collection.
   */
  async create<
    const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>,
  >(item: Partial<Collections.OtherTest>, query?: Query): Promise<Output> {
    let toReturn = this.request(
      createOtherTestItem(item, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Read a single item from the collection.
   */
  async get<
    const Query extends Directus.Query<Schema, Collections.OtherTest>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>,
  >(
    key: Collections.OtherTest extends { id: number | string }
      ? Collections.OtherTest["id"]
      : string | number,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      readOtherTestItem(key, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Update a single item from the collection.
   */
  async update<
    const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
    Output = ApplyQueryFields<Schema, Collections.OtherTest, Query["fields"]>,
  >(
    key: Collections.OtherTest extends { id: number | string }
      ? Collections.OtherTest["id"]
      : string | number,
    patch: Partial<Collections.OtherTest>,
    query?: Query,
  ): Promise<Output> {
    let toReturn = this.request(
      updateOtherTestItem(key, patch, query),
    ) as unknown as Promise<Output>;
    return toReturn;
  }

  /**
   * Remove a single item in the collection.
   */
  async remove<Output = void>(
    key: Collections.OtherTest extends { id: number | string }
      ? Collections.OtherTest["id"]
      : string | number,
  ): Promise<Output> {
    let toReturn = this.request(
      deleteOtherTestItem(key),
    ) as unknown as Promise<Output>;
    return toReturn;
  }
}
