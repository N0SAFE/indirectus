import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus folders items.
 */
export function readDirectusFoldersItems<
  Query extends Directus.Query<Schema, Collections.DirectusFolder>,
>(query?: Query): ReturnType<typeof DirectusSDK.readFolders<Schema, Query>> {
  let toReturn = DirectusSDK.readFolders<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus folders items.
 */
export const listDirectusFolders = readDirectusFoldersItems;
/**
 * Gets a single known directus folders item by id.
 */
export function readDirectusFoldersItem<
  Query extends Directus.Query<Schema, Collections.DirectusFolder>,
>(
  key: Collections.DirectusFolder extends { id: number | string }
    ? Collections.DirectusFolder["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readFolder<Schema, Query>> {
  let toReturn = DirectusSDK.readFolder<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus folders item by id.
 */
export const readDirectusFolders = readDirectusFoldersItem;
/**
 * Create a single directus folders item.
 */
export function createDirectusFoldersItem<
  Query extends Directus.Query<Schema, Collections.DirectusFolder>,
>(
  item: Partial<Collections.DirectusFolder>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createFolder<Schema, Query>> {
  let toReturn = DirectusSDK.createFolder<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus folders items.
 */
export function createDirectusFoldersItems<
  Query extends Directus.Query<Schema, Collections.DirectusFolder>,
>(
  items: Partial<Collections.DirectusFolder>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createFolders<Schema, Query>> {
  let toReturn = DirectusSDK.createFolders<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus folders item by id.
 */
export function updateDirectusFoldersItem<
  Query extends Directus.Query<Schema, Collections.DirectusFolder>,
>(
  key: Collections.DirectusFolder extends { id: number | string }
    ? Collections.DirectusFolder["id"]
    : string | number,
  patch: Partial<Collections.DirectusFolder>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateFolder<Schema, Query>> {
  let toReturn = DirectusSDK.updateFolder<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus folders items by id.
 */
export function updateDirectusFoldersItems<
  Query extends Directus.Query<Schema, Collections.DirectusFolder>,
>(
  keys: Collections.DirectusFolder extends { id: number | string }
    ? Collections.DirectusFolder["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusFolder>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateFolders<Schema, Query>> {
  let toReturn = DirectusSDK.updateFolders<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus folders item by id.
 */
export function deleteDirectusFoldersItem(
  key: Collections.DirectusFolder extends { id: number | string }
    ? Collections.DirectusFolder["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteFolder<Schema>> {
  let toReturn = DirectusSDK.deleteFolder<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus folders items by id.
 */
export function deleteDirectusFoldersItems(
  keys: Collections.DirectusFolder extends { id: number | string }
    ? Collections.DirectusFolder["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteFolders<Schema>> {
  let toReturn = DirectusSDK.deleteFolders<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus folders items.
 */
export function aggregateDirectusFoldersItems<
  Options extends Directus.AggregationOptions<Schema, "directus_folders">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_folders", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_folders", Options>(
    "directus_folders",
    option,
  );
  return toReturn;
}
