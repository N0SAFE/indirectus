import type * as Directus from "@directus/sdk";

import * as DirectusSDK from "@directus/sdk";

import { Collections, Schema } from "../client";

/**
 * Create many test items.
 */
export function createTestItems<
  const Query extends Directus.Query<Schema, Collections.Test[]>,
>(
  items: Partial<Collections.Test>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createItems<Schema, "test", Query>> {
  return DirectusSDK.createItems<Schema, "test", Query>("test", items, query);
}

/**
 * Create a single test item.
 */
export function createTestItem<
  const Query extends DirectusSDK.Query<Schema, Collections.Test[]>, // Is this a mistake? Why []?
>(
  item: Partial<Collections.Test>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createItem<Schema, "test", Query>> {
  return DirectusSDK.createItem<Schema, "test", Query>("test", item, query);
}

/**
 * Read many test items.
 */
export function readTestItems<
  const Query extends Directus.Query<Schema, Collections.Test>,
>(
  query?: Query,
): ReturnType<typeof DirectusSDK.readItems<Schema, "test", Query>> {
  return DirectusSDK.readItems<Schema, "test", Query>("test", query);
}

/**
 * Read many test items.
 */
export const listTest = readTestItems;

/**
 * Gets a single known test item by id.
 */
export function readTestItem<
  const Query extends Directus.Query<Schema, Collections.Test>,
>(
  key: Collections.Test extends { id: number | string }
    ? Collections.Test["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readItem<Schema, "test", Query>> {
  return DirectusSDK.readItem<Schema, "test", Query>("test", key, query);
}

/**
 * Gets a single known test item by id.
 */
export const readTest = readTestItem;

/**
 * Update many test items.
 */
export function updateTestItems<
  const Query extends Directus.Query<Schema, Collections.Test[]>,
>(
  keys: Collections.Test extends { id: number | string }
    ? Collections.Test["id"][]
    : string[] | number[],
  patch: Partial<Collections.Test>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItems<Schema, "test", Query>> {
  return DirectusSDK.updateItems<Schema, "test", Query>(
    "test",
    keys,
    patch,
    query,
  );
}

/**
 * Update many test items with batch
 */
export function updateTestItemsBatch<
  const Query extends Directus.Query<Schema, Collections.Test[]>,
>(
  items: Partial<Directus.UnpackList<Collections.Test>>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItemsBatch<Schema, "test", Query>> {
  return DirectusSDK.updateItemsBatch<Schema, "test", Query>(
    "test",
    items,
    query,
  );
}

/**
 * Update a single known test item by id.
 */
export function updateTestItem<
  const Query extends Directus.Query<Schema, Collections.Test[]>,
>(
  key: Collections.Test extends { id: number | string }
    ? Collections.Test["id"]
    : string | number,
  patch: Partial<Collections.Test>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItem<Schema, "test", Query>> {
  return DirectusSDK.updateItem<Schema, "test", Query>(
    "test",
    key,
    patch,
    query,
  );
}

/**
 * Deletes many test items.
 */
export function deleteTestItems<
  const Query extends Directus.Query<Schema, Collections.Test[]>,
>(
  keys: Collections.Test extends { id: number | string }
    ? Collections.Test["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteItems<Schema, "test", Query>> {
  return DirectusSDK.deleteItems<Schema, "test", Query>("test", keys);
}

/**
 * Deletes a single known test item by id.
 */
export function deleteTestItem(
  key: Collections.Test extends { id: number | string }
    ? Collections.Test["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteItem<Schema, "test">> {
  return DirectusSDK.deleteItem<Schema, "test">("test", key);
}

/**
 * Aggregates test items.
 */
export function aggregateTestItems<
  Options extends Directus.AggregationOptions<Schema, "test">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "test", Options>> {
  return DirectusSDK.aggregate<Schema, "test", Options>("test", option);
}
