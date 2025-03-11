import type * as Directus from "@directus/sdk";

import * as DirectusSDK from "@directus/sdk";

import { Collections, Schema } from "../client";

/**
 * Create many other items.
 */
export function createOtherItems<
  const Query extends Directus.Query<Schema, Collections.Other[]>,
>(
  items: Partial<Collections.Other>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createItems<Schema, "other", Query>> {
  return DirectusSDK.createItems<Schema, "other", Query>("other", items, query);
}

/**
 * Create a single other item.
 */
export function createOtherItem<
  const Query extends DirectusSDK.Query<Schema, Collections.Other[]>, // Is this a mistake? Why []?
>(
  item: Partial<Collections.Other>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createItem<Schema, "other", Query>> {
  return DirectusSDK.createItem<Schema, "other", Query>("other", item, query);
}

/**
 * Read many other items.
 */
export function readOtherItems<
  const Query extends Directus.Query<Schema, Collections.Other>,
>(
  query?: Query,
): ReturnType<typeof DirectusSDK.readItems<Schema, "other", Query>> {
  return DirectusSDK.readItems<Schema, "other", Query>("other", query);
}

/**
 * Read many other items.
 */
export const listOther = readOtherItems;

/**
 * Gets a single known other item by id.
 */
export function readOtherItem<
  const Query extends Directus.Query<Schema, Collections.Other>,
>(
  key: Collections.Other extends { id: number | string }
    ? Collections.Other["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readItem<Schema, "other", Query>> {
  return DirectusSDK.readItem<Schema, "other", Query>("other", key, query);
}

/**
 * Gets a single known other item by id.
 */
export const readOther = readOtherItem;

/**
 * Update many other items.
 */
export function updateOtherItems<
  const Query extends Directus.Query<Schema, Collections.Other[]>,
>(
  keys: Collections.Other extends { id: number | string }
    ? Collections.Other["id"][]
    : string[] | number[],
  patch: Partial<Collections.Other>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItems<Schema, "other", Query>> {
  return DirectusSDK.updateItems<Schema, "other", Query>(
    "other",
    keys,
    patch,
    query,
  );
}

/**
 * Update many other items with batch
 */
export function updateOtherItemsBatch<
  const Query extends Directus.Query<Schema, Collections.Other[]>,
>(
  items: Partial<Directus.UnpackList<Collections.Other>>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItemsBatch<Schema, "other", Query>> {
  return DirectusSDK.updateItemsBatch<Schema, "other", Query>(
    "other",
    items,
    query,
  );
}

/**
 * Update a single known other item by id.
 */
export function updateOtherItem<
  const Query extends Directus.Query<Schema, Collections.Other[]>,
>(
  key: Collections.Other extends { id: number | string }
    ? Collections.Other["id"]
    : string | number,
  patch: Partial<Collections.Other>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateItem<Schema, "other", Query>> {
  return DirectusSDK.updateItem<Schema, "other", Query>(
    "other",
    key,
    patch,
    query,
  );
}

/**
 * Deletes many other items.
 */
export function deleteOtherItems<
  const Query extends Directus.Query<Schema, Collections.Other[]>,
>(
  keys: Collections.Other extends { id: number | string }
    ? Collections.Other["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteItems<Schema, "other", Query>> {
  return DirectusSDK.deleteItems<Schema, "other", Query>("other", keys);
}

/**
 * Deletes a single known other item by id.
 */
export function deleteOtherItem(
  key: Collections.Other extends { id: number | string }
    ? Collections.Other["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteItem<Schema, "other">> {
  return DirectusSDK.deleteItem<Schema, "other">("other", key);
}

/**
 * Aggregates other items.
 */
export function aggregateOtherItems<
  Options extends Directus.AggregationOptions<Schema, "other">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "other", Options>> {
  return DirectusSDK.aggregate<Schema, "other", Options>("other", option);
}
