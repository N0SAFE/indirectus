import type * as Directus from "@directus/sdk";

import { ApplyQueryFields } from "../../types/ApplyQueryFields";

import ChainableBinding from "../chainable-bindable";

import { Collections, createTypedClient, Schema } from "../../client";

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
import { Fallback, SubscriptionOutput } from "../../utils";

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
    return this.request(
      createOtherItems(items, query),
    ) as unknown as Promise<Output>;
  }

  /**
   * Read many items from the collection.
   */
  async query<
    const Query extends Directus.Query<Schema, Collections.Other>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>[],
  >(query?: Query): Promise<Output> {
    return this.request(readOtherItems(query)) as unknown as Promise<Output>;
  }

  /**
   * Read the first item from the collection matching the query.
   */
  async find<
    const Query extends Directus.Query<Schema, Collections.Other>,
    Output = ApplyQueryFields<Schema, Collections.Other, Query["fields"]>,
  >(query?: Query): Promise<Output | undefined> {
    return this.request(
      readOtherItems({
        ...query,
        limit: 1,
      }),
    ).then((items) => items?.[0]) as unknown as Promise<Output | undefined>;
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
    return this.request(
      updateOtherItems(keys, patch, query),
    ) as unknown as Promise<Output>;
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
    return this.request(
      updateOtherItemsBatch(items, query),
    ) as unknown as Promise<Output>;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<Output = void>(
    keys: Collections.Other extends { id: number | string }
      ? Collections.Other["id"][]
      : string[] | number[],
  ): Promise<Output> {
    return this.request(deleteOtherItems(keys)) as unknown as Promise<Output>;
  }

  /**
   * Aggregates the items in the collection.
   */
  async aggregate<
    Options extends Directus.AggregationOptions<Schema, "other">,
    Output = Directus.AggregationOutput<Schema, "other", Options>[number],
  >(options: Options): Promise<Output> {
    return this.request(aggregateOtherItems<Options>(options)).then(
      (a) => a?.[0],
    ) as unknown as Promise<Output>;
  }

  async subscribe<
    const Options extends Directus.SubscribeOptions<Schema, "other">,
    Output = SubscriptionOutput<
      Schema,
      "other",
      Options["query"],
      Fallback<Options["event"], Directus.SubscriptionOptionsEvents> | "init"
    >,
  >(
    options?: Options,
  ): Promise<{
    subscription: AsyncGenerator<Output, void, unknown>;
    unsubscribe(): void;
  }> {
    return this._subscribe<"other", Options>(
      "other",
      options,
    ) as unknown as Promise<{
      subscription: AsyncGenerator<Output, void, unknown>;
      unsubscribe(): void;
    }>;
  }
}

const otherItems = new OtherItems(createTypedClient("test")).subscribe({
  event: "create",
  query: {
    fields: ["id"],
  },
});

otherItems.then(async (subscription) => {
  for await (const item of subscription.subscription) {
    if (item.event === "init") {
      console.log("Initial items:", item.data[0].id);
      continue;
    }
    console.log(item);
  }
});

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
    return this.request(
      createOtherItem(item, query),
    ) as unknown as Promise<Output>;
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
    return this.request(
      readOtherItem(key, query),
    ) as unknown as Promise<Output>;
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
    return this.request(
      updateOtherItem(key, patch, query),
    ) as unknown as Promise<Output>;
  }

  /**
   * Remove many items in the collection.
   */
  async remove<Output = void>(
    key: Collections.Other extends { id: number | string }
      ? Collections.Other["id"]
      : string | number,
  ): Promise<Output> {
    return this.request(deleteOtherItem(key)) as unknown as Promise<Output>;
  }
}
