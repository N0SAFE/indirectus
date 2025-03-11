import type * as Directus from "@directus/sdk";

import * as DirectusSDK from "@directus/sdk";

import { Collections, Schema } from "../client";

/**
 * Create many other test items.
 */
export function createOtherTestItems<
  const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
>(
  items: Partial<Collections.OtherTest>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createItems<Schema, "other_test", Query>> {
  return DirectusSDK.createItems<Schema, "other_test", Query>(
    "other_test",
    items,
    query,
  );
}

/**
 * Create a single other test item.
 */
export function createOtherTestItem<
  const Query extends DirectusSDK.Query<Schema, Collections.OtherTest[]>, // Is this a mistake? Why []?
>(
  item: Partial<Collections.OtherTest>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createItem<Schema, "other_test", Query>> {
  return DirectusSDK.createItem<Schema, "other_test", Query>(
    "other_test",
    item,
    query,
  );
}

/**
 * Read many other test items.
 */
export function readOtherTestItems<
  const Query extends Directus.Query<Schema, Collections.OtherTest>,
>(
  query?: Query,
): ReturnType<typeof DirectusSDK.readItems<Schema, "other_test", Query>> {
  return DirectusSDK.readItems<Schema, "other_test", Query>(
    "other_test",
    query,
  );
}

/**
 * Read many other test items.
 */
export const listOtherTest = readOtherTestItems;

/**
 * Gets a single known other test item by id.
 */
export function readOtherTestItem<
  const Query extends Directus.Query<Schema, Collections.OtherTest>,
>(
  key: Collections.OtherTest extends { id: number | string }
    ? Collections.OtherTest["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readItem<Schema, "other_test", Query>> {
  return DirectusSDK.readItem<Schema, "other_test", Query>(
    "other_test",
    key,
    query,
  );
}

/**
 * Gets a single known other test item by id.
 */
export const readOtherTest = readOtherTestItem;

/**
 * Update many other test items.
 */
export function updateOtherTestItems<
  const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
>(
  keys: Collections.OtherTest extends { id: number | string }
    ? Collections.OtherTest["id"][]
    : string[] | number[],
  patch: Partial<Collections.OtherTest>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItems<Schema, "other_test", Query>> {
  return DirectusSDK.updateItems<Schema, "other_test", Query>(
    "other_test",
    keys,
    patch,
    query,
  );
}

/**
 * Update many other test items with batch
 */
export function updateOtherTestItemsBatch<
  const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
>(
  items: Partial<Directus.UnpackList<Collections.OtherTest>>[],
  query?: Query,
): ReturnType<
  typeof DirectusSDK.updateItemsBatch<Schema, "other_test", Query>
> {
  return DirectusSDK.updateItemsBatch<Schema, "other_test", Query>(
    "other_test",
    items,
    query,
  );
}

/**
 * Update a single known other test item by id.
 */
export function updateOtherTestItem<
  const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
>(
  key: Collections.OtherTest extends { id: number | string }
    ? Collections.OtherTest["id"]
    : string | number,
  patch: Partial<Collections.OtherTest>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItem<Schema, "other_test", Query>> {
  return DirectusSDK.updateItem<Schema, "other_test", Query>(
    "other_test",
    key,
    patch,
    query,
  );
}

/**
 * Deletes many other test items.
 */
export function deleteOtherTestItems<
  const Query extends Directus.Query<Schema, Collections.OtherTest[]>,
>(
  keys: Collections.OtherTest extends { id: number | string }
    ? Collections.OtherTest["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteItems<Schema, "other_test", Query>> {
  return DirectusSDK.deleteItems<Schema, "other_test", Query>(
    "other_test",
    keys,
  );
}

/**
 * Deletes a single known other test item by id.
 */
export function deleteOtherTestItem(
  key: Collections.OtherTest extends { id: number | string }
    ? Collections.OtherTest["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteItem<Schema, "other_test">> {
  return DirectusSDK.deleteItem<Schema, "other_test">("other_test", key);
}

/**
 * Aggregates other test items.
 */
export function aggregateOtherTestItems<
  Options extends Directus.AggregationOptions<Schema, "other_test">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "other_test", Options>> {
  return DirectusSDK.aggregate<Schema, "other_test", Options>(
    "other_test",
    option,
  );
}
