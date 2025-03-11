import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus presets items.
 */
export function readDirectusPresetsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPreset>,
>(query?: Query): ReturnType<typeof DirectusSDK.readPresets<Schema, Query>> {
  let toReturn = DirectusSDK.readPresets<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus presets items.
 */
export const listDirectusPresets = readDirectusPresetsItems;
/**
 * Gets a single known directus presets item by id.
 */
export function readDirectusPresetsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPreset>,
>(
  key: Collections.DirectusPreset extends { id: number | string }
    ? Collections.DirectusPreset["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readPreset<Schema, Query>> {
  let toReturn = DirectusSDK.readPreset<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus presets item by id.
 */
export const readDirectusPresets = readDirectusPresetsItem;
/**
 * Create a single directus presets item.
 */
export function createDirectusPresetsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPreset>,
>(
  item: Partial<Collections.DirectusPreset>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createPreset<Schema, Query>> {
  let toReturn = DirectusSDK.createPreset<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus presets items.
 */
export function createDirectusPresetsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPreset>,
>(
  items: Partial<Collections.DirectusPreset>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createPresets<Schema, Query>> {
  let toReturn = DirectusSDK.createPresets<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus presets item by id.
 */
export function updateDirectusPresetsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPreset>,
>(
  key: Collections.DirectusPreset extends { id: number | string }
    ? Collections.DirectusPreset["id"]
    : string | number,
  patch: Partial<Collections.DirectusPreset>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updatePreset<Schema, Query>> {
  let toReturn = DirectusSDK.updatePreset<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus presets items by id.
 */
export function updateDirectusPresetsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPreset>,
>(
  keys: Collections.DirectusPreset extends { id: number | string }
    ? Collections.DirectusPreset["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusPreset>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updatePresets<Schema, Query>> {
  let toReturn = DirectusSDK.updatePresets<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus presets item by id.
 */
export function deleteDirectusPresetsItem(
  key: Collections.DirectusPreset extends { id: number | string }
    ? Collections.DirectusPreset["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deletePreset<Schema>> {
  let toReturn = DirectusSDK.deletePreset<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus presets items by id.
 */
export function deleteDirectusPresetsItems(
  keys: Collections.DirectusPreset extends { id: number | string }
    ? Collections.DirectusPreset["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deletePresets<Schema>> {
  let toReturn = DirectusSDK.deletePresets<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus presets items.
 */
export function aggregateDirectusPresetsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_presets">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_presets", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_presets", Options>(
    "directus_presets",
    option,
  );
  return toReturn;
}
