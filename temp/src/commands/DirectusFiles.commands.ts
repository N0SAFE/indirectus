import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus files items.
 */
export function readDirectusFilesItems<
  Query extends Directus.Query<Schema, Collections.DirectusFile>,
>(query?: Query): ReturnType<typeof DirectusSDK.readFiles<Schema, Query>> {
  let toReturn = DirectusSDK.readFiles<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus files items.
 */
export const listDirectusFiles = readDirectusFilesItems;
/**
 * Gets a single known directus files item by id.
 */
export function readDirectusFilesItem<
  Query extends Directus.Query<Schema, Collections.DirectusFile>,
>(
  key: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readFile<Schema, Query>> {
  let toReturn = DirectusSDK.readFile<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus files item by id.
 */
export const readDirectusFiles = readDirectusFilesItem;
/**
 * Gets a single known directus files item by id as array buffer.
 */
export function readDirectusFilesArrayBuffer<
  AssetsQuery extends Directus.AssetsQuery,
>(
  key: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"]
    : string | number,
  assetQuery: Directus.AssetsQuery,
): ReturnType<typeof DirectusSDK.readAssetArrayBuffer<Schema>> {
  let toReturn = DirectusSDK.readAssetArrayBuffer<Schema>(key, assetQuery);
  return toReturn;
}
/**
 * Gets a single known directus files item by id as blob.
 */
export function readDirectusFilesBlob<AssetsQuery extends Directus.AssetsQuery>(
  key: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"]
    : string | number,
  assetQuery: Directus.AssetsQuery,
): ReturnType<typeof DirectusSDK.readAssetBlob<Schema>> {
  let toReturn = DirectusSDK.readAssetBlob<Schema>(key, assetQuery);
  return toReturn;
}
/**
 * Gets a single known directus files item by id as readable stream.
 */
export function readDirectusFilesStream<
  AssetsQuery extends Directus.AssetsQuery,
>(
  key: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"]
    : string | number,
  assetQuery: Directus.AssetsQuery,
): ReturnType<typeof DirectusSDK.readAssetRaw<Schema>> {
  let toReturn = DirectusSDK.readAssetRaw<Schema>(key, assetQuery);
  return toReturn;
}
/**
 * Update a single known directus files item by id.
 */
export function updateDirectusFilesItem<
  Query extends Directus.Query<Schema, Collections.DirectusFile>,
>(
  key: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"]
    : string | number,
  patch: Partial<Collections.DirectusFile>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateFile<Schema, Query>> {
  let toReturn = DirectusSDK.updateFile<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus files items by id.
 */
export function updateDirectusFilesItems<
  Query extends Directus.Query<Schema, Collections.DirectusFile>,
>(
  keys: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusFile>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateFiles<Schema, Query>> {
  let toReturn = DirectusSDK.updateFiles<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus files item by id.
 */
export function deleteDirectusFilesItem(
  key: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteFile<Schema>> {
  let toReturn = DirectusSDK.deleteFile<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus files items by id.
 */
export function deleteDirectusFilesItems(
  keys: Collections.DirectusFile extends { id: number | string }
    ? Collections.DirectusFile["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteFiles<Schema>> {
  let toReturn = DirectusSDK.deleteFiles<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus files items.
 */
export function aggregateDirectusFilesItems<
  Options extends Directus.AggregationOptions<Schema, "directus_files">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "directus_files", Options>> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_files", Options>(
    "directus_files",
    option,
  );
  return toReturn;
}
