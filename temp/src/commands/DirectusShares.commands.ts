import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus shares items.
 */
export function readDirectusSharesItems<
  Query extends Directus.Query<Schema, Collections.DirectusShare>,
>(query?: Query): ReturnType<typeof DirectusSDK.readShares<Schema, Query>> {
  let toReturn = DirectusSDK.readShares<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus shares items.
 */
export const listDirectusShares = readDirectusSharesItems;
/**
 * Gets a single known directus shares item by id.
 */
export function readDirectusSharesItem<
  Query extends Directus.Query<Schema, Collections.DirectusShare>,
>(
  key: Collections.DirectusShare extends { id: number | string }
    ? Collections.DirectusShare["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readShare<Schema, Query>> {
  let toReturn = DirectusSDK.readShare<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus shares item by id.
 */
export const readDirectusShares = readDirectusSharesItem;
/**
 * Create a single directus shares item.
 */
export function createDirectusSharesItem<
  Query extends Directus.Query<Schema, Collections.DirectusShare>,
>(
  item: Partial<Collections.DirectusShare>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createShare<Schema, Query>> {
  let toReturn = DirectusSDK.createShare<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus shares items.
 */
export function createDirectusSharesItems<
  Query extends Directus.Query<Schema, Collections.DirectusShare>,
>(
  items: Partial<Collections.DirectusShare>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createShares<Schema, Query>> {
  let toReturn = DirectusSDK.createShares<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus shares item by id.
 */
export function updateDirectusSharesItem<
  Query extends Directus.Query<Schema, Collections.DirectusShare>,
>(
  key: Collections.DirectusShare extends { id: number | string }
    ? Collections.DirectusShare["id"]
    : string | number,
  patch: Partial<Collections.DirectusShare>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateShare<Schema, Query>> {
  let toReturn = DirectusSDK.updateShare<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus shares items by id.
 */
export function updateDirectusSharesItems<
  Query extends Directus.Query<Schema, Collections.DirectusShare>,
>(
  keys: Collections.DirectusShare extends { id: number | string }
    ? Collections.DirectusShare["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusShare>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateShares<Schema, Query>> {
  let toReturn = DirectusSDK.updateShares<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus shares item by id.
 */
export function deleteDirectusSharesItem(
  key: Collections.DirectusShare extends { id: number | string }
    ? Collections.DirectusShare["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteShare<Schema>> {
  let toReturn = DirectusSDK.deleteShare<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus shares items by id.
 */
export function deleteDirectusSharesItems(
  keys: Collections.DirectusShare extends { id: number | string }
    ? Collections.DirectusShare["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteShares<Schema>> {
  let toReturn = DirectusSDK.deleteShares<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus shares items.
 */
export function aggregateDirectusSharesItems<
  Options extends Directus.AggregationOptions<Schema, "directus_shares">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_shares", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_shares", Options>(
    "directus_shares",
    option,
  );
  return toReturn;
}
