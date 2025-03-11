import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus operations items.
 */
export function readDirectusOperationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusOperation>,
>(query?: Query): ReturnType<typeof DirectusSDK.readOperations<Schema, Query>> {
  let toReturn = DirectusSDK.readOperations<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus operations items.
 */
export const listDirectusOperations = readDirectusOperationsItems;
/**
 * Gets a single known directus operations item by id.
 */
export function readDirectusOperationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusOperation>,
>(
  key: Collections.DirectusOperation extends { id: number | string }
    ? Collections.DirectusOperation["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readOperation<Schema, Query>> {
  let toReturn = DirectusSDK.readOperation<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus operations item by id.
 */
export const readDirectusOperations = readDirectusOperationsItem;
/**
 * Create a single directus operations item.
 */
export function createDirectusOperationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusOperation>,
>(
  item: Partial<Collections.DirectusOperation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createOperation<Schema, Query>> {
  let toReturn = DirectusSDK.createOperation<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus operations items.
 */
export function createDirectusOperationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusOperation>,
>(
  items: Partial<Collections.DirectusOperation>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createOperations<Schema, Query>> {
  let toReturn = DirectusSDK.createOperations<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus operations item by id.
 */
export function updateDirectusOperationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusOperation>,
>(
  key: Collections.DirectusOperation extends { id: number | string }
    ? Collections.DirectusOperation["id"]
    : string | number,
  patch: Partial<Collections.DirectusOperation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateOperation<Schema, Query>> {
  let toReturn = DirectusSDK.updateOperation<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus operations items by id.
 */
export function updateDirectusOperationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusOperation>,
>(
  keys: Collections.DirectusOperation extends { id: number | string }
    ? Collections.DirectusOperation["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusOperation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateOperations<Schema, Query>> {
  let toReturn = DirectusSDK.updateOperations<Schema, Query>(
    keys,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Delete a single known directus operations item by id.
 */
export function deleteDirectusOperationsItem(
  key: Collections.DirectusOperation extends { id: number | string }
    ? Collections.DirectusOperation["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteOperation<Schema>> {
  let toReturn = DirectusSDK.deleteOperation<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus operations items by id.
 */
export function deleteDirectusOperationsItems(
  keys: Collections.DirectusOperation extends { id: number | string }
    ? Collections.DirectusOperation["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteOperations<Schema>> {
  let toReturn = DirectusSDK.deleteOperations<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus operations items.
 */
export function aggregateDirectusOperationsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_operations">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_operations", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_operations", Options>(
    "directus_operations",
    option,
  );
  return toReturn;
}
