import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus panels items.
 */
export function readDirectusPanelsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPanel>,
>(query?: Query): ReturnType<typeof DirectusSDK.readPanels<Schema, Query>> {
  let toReturn = DirectusSDK.readPanels<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus panels items.
 */
export const listDirectusPanels = readDirectusPanelsItems;
/**
 * Gets a single known directus panels item by id.
 */
export function readDirectusPanelsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPanel>,
>(
  key: Collections.DirectusPanel extends { id: number | string }
    ? Collections.DirectusPanel["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readPanel<Schema, Query>> {
  let toReturn = DirectusSDK.readPanel<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus panels item by id.
 */
export const readDirectusPanels = readDirectusPanelsItem;
/**
 * Create a single directus panels item.
 */
export function createDirectusPanelsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPanel>,
>(
  item: Partial<Collections.DirectusPanel>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createPanel<Schema, Query>> {
  let toReturn = DirectusSDK.createPanel<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus panels items.
 */
export function createDirectusPanelsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPanel>,
>(
  items: Partial<Collections.DirectusPanel>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createPanels<Schema, Query>> {
  let toReturn = DirectusSDK.createPanels<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus panels item by id.
 */
export function updateDirectusPanelsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPanel>,
>(
  key: Collections.DirectusPanel extends { id: number | string }
    ? Collections.DirectusPanel["id"]
    : string | number,
  patch: Partial<Collections.DirectusPanel>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updatePanel<Schema, Query>> {
  let toReturn = DirectusSDK.updatePanel<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus panels items by id.
 */
export function updateDirectusPanelsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPanel>,
>(
  keys: Collections.DirectusPanel extends { id: number | string }
    ? Collections.DirectusPanel["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusPanel>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updatePanels<Schema, Query>> {
  let toReturn = DirectusSDK.updatePanels<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus panels item by id.
 */
export function deleteDirectusPanelsItem(
  key: Collections.DirectusPanel extends { id: number | string }
    ? Collections.DirectusPanel["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deletePanel<Schema>> {
  let toReturn = DirectusSDK.deletePanel<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus panels items by id.
 */
export function deleteDirectusPanelsItems(
  keys: Collections.DirectusPanel extends { id: number | string }
    ? Collections.DirectusPanel["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deletePanels<Schema>> {
  let toReturn = DirectusSDK.deletePanels<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus panels items.
 */
export function aggregateDirectusPanelsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_panels">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_panels", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_panels", Options>(
    "directus_panels",
    option,
  );
  return toReturn;
}
