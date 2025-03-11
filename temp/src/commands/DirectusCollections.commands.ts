import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus collections items.
 */
export function readDirectusCollectionsItems(): ReturnType<
  typeof DirectusSDK.readCollections<Schema>
> {
  let toReturn = DirectusSDK.readCollections<Schema>();
  return toReturn;
}
/**
 * Read many directus collections items.
 */
export const listDirectusCollections = readDirectusCollectionsItems;
/**
 * Gets a single known directus collections item by id.
 */
export function readDirectusCollectionsItem(
  key: Collections.DirectusCollection extends { collection: number | string }
    ? Collections.DirectusCollection["collection"]
    : string | number,
): ReturnType<typeof DirectusSDK.readCollection<Schema>> {
  let toReturn = DirectusSDK.readCollection<Schema>(key);
  return toReturn;
}
/**
 * Gets a single known directus collections item by id.
 */
export const readDirectusCollections = readDirectusCollectionsItem;
/**
 * Updates a single known directus collections item by id.
 */
export function updateDirectusCollectionsItem<
  Query extends Directus.Query<Schema, Collections.DirectusCollection>,
>(
  collection: keyof Schema,
  patch: Partial<Collections.DirectusCollection>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateCollection<Schema, Query>> {
  let toReturn = DirectusSDK.updateCollection<Schema, Query>(
    collection,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Updates batch many directus collections items.
 */
export function updateBatchDirectusCollectionsItems<
  Query extends Directus.Query<Schema, Collections.DirectusCollection>,
>(
  items: Directus.NestedPartial<Collections.DirectusCollection>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.updateCollectionsBatch<Schema, Query>> {
  let toReturn = DirectusSDK.updateCollectionsBatch<Schema, Query>(
    items,
    query,
  );
  return toReturn;
}
/**
 * Deletes a single known directus collections item by id.
 */
export function deleteDirectusCollectionsItem(
  key: Collections.DirectusCollection extends { collection: number | string }
    ? Collections.DirectusCollection["collection"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteCollection<Schema>> {
  let toReturn = DirectusSDK.deleteCollection<Schema>(key);
  return toReturn;
}
/**
 * Aggregates directus collections items.
 */
export function aggregateDirectusCollectionsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_collections">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_collections", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_collections", Options>(
    "directus_collections",
    option,
  );
  return toReturn;
}
