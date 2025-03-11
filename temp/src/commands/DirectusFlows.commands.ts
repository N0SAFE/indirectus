import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus flows items.
 */
export function readDirectusFlowsItems<
  Query extends Directus.Query<Schema, Collections.DirectusFlow>,
>(query?: Query): ReturnType<typeof DirectusSDK.readFlows<Schema, Query>> {
  let toReturn = DirectusSDK.readFlows<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus flows items.
 */
export const listDirectusFlows = readDirectusFlowsItems;
/**
 * Gets a single known directus flows item by id.
 */
export function readDirectusFlowsItem<
  Query extends Directus.Query<Schema, Collections.DirectusFlow>,
>(
  key: Collections.DirectusFlow extends { id: number | string }
    ? Collections.DirectusFlow["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readFlow<Schema, Query>> {
  let toReturn = DirectusSDK.readFlow<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus flows item by id.
 */
export const readDirectusFlows = readDirectusFlowsItem;
/**
 * Create a single directus flows item.
 */
export function createDirectusFlowsItem<
  Query extends Directus.Query<Schema, Collections.DirectusFlow>,
>(
  item: Partial<Collections.DirectusFlow>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createFlow<Schema, Query>> {
  let toReturn = DirectusSDK.createFlow<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus flows items.
 */
export function createDirectusFlowsItems<
  Query extends Directus.Query<Schema, Collections.DirectusFlow>,
>(
  items: Partial<Collections.DirectusFlow>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createFlows<Schema, Query>> {
  let toReturn = DirectusSDK.createFlows<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus flows item by id.
 */
export function updateDirectusFlowsItem<
  Query extends Directus.Query<Schema, Collections.DirectusFlow>,
>(
  key: Collections.DirectusFlow extends { id: number | string }
    ? Collections.DirectusFlow["id"]
    : string | number,
  patch: Partial<Collections.DirectusFlow>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateFlow<Schema, Query>> {
  let toReturn = DirectusSDK.updateFlow<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus flows items by id.
 */
export function updateDirectusFlowsItems<
  Query extends Directus.Query<Schema, Collections.DirectusFlow>,
>(
  keys: Collections.DirectusFlow extends { id: number | string }
    ? Collections.DirectusFlow["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusFlow>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateFlows<Schema, Query>> {
  let toReturn = DirectusSDK.updateFlows<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus flows item by id.
 */
export function deleteDirectusFlowsItem(
  key: Collections.DirectusFlow extends { id: number | string }
    ? Collections.DirectusFlow["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteFlow<Schema>> {
  let toReturn = DirectusSDK.deleteFlow<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus flows items by id.
 */
export function deleteDirectusFlowsItems(
  keys: Collections.DirectusFlow extends { id: number | string }
    ? Collections.DirectusFlow["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteFlows<Schema>> {
  let toReturn = DirectusSDK.deleteFlows<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus flows items.
 */
export function aggregateDirectusFlowsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_flows">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "directus_flows", Options>> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_flows", Options>(
    "directus_flows",
    option,
  );
  return toReturn;
}
