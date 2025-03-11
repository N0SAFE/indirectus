import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus translations items.
 */
export function readDirectusTranslationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusTranslation>,
>(
  query?: Query,
): ReturnType<typeof DirectusSDK.readTranslations<Schema, Query>> {
  let toReturn = DirectusSDK.readTranslations<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus translations items.
 */
export const listDirectusTranslations = readDirectusTranslationsItems;
/**
 * Gets a single known directus translations item by id.
 */
export function readDirectusTranslationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusTranslation>,
>(
  key: Collections.DirectusTranslation extends { id: number | string }
    ? Collections.DirectusTranslation["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readTranslation<Schema, Query>> {
  let toReturn = DirectusSDK.readTranslation<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus translations item by id.
 */
export const readDirectusTranslations = readDirectusTranslationsItem;
/**
 * Create a single directus translations item.
 */
export function createDirectusTranslationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusTranslation>,
>(
  item: Partial<Collections.DirectusTranslation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createTranslation<Schema, Query>> {
  let toReturn = DirectusSDK.createTranslation<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus translations items.
 */
export function createDirectusTranslationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusTranslation>,
>(
  items: Partial<Collections.DirectusTranslation>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createTranslations<Schema, Query>> {
  let toReturn = DirectusSDK.createTranslations<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus translations item by id.
 */
export function updateDirectusTranslationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusTranslation>,
>(
  key: Collections.DirectusTranslation extends { id: number | string }
    ? Collections.DirectusTranslation["id"]
    : string | number,
  patch: Partial<Collections.DirectusTranslation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateTranslation<Schema, Query>> {
  let toReturn = DirectusSDK.updateTranslation<Schema, Query>(
    key,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Update many known directus translations items by id.
 */
export function updateDirectusTranslationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusTranslation>,
>(
  keys: Collections.DirectusTranslation extends { id: number | string }
    ? Collections.DirectusTranslation["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusTranslation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateTranslations<Schema, Query>> {
  let toReturn = DirectusSDK.updateTranslations<Schema, Query>(
    keys,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Delete a single known directus translations item by id.
 */
export function deleteDirectusTranslationsItem(
  key: Collections.DirectusTranslation extends { id: number | string }
    ? Collections.DirectusTranslation["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteTranslation<Schema>> {
  let toReturn = DirectusSDK.deleteTranslation<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus translations items by id.
 */
export function deleteDirectusTranslationsItems(
  keys: Collections.DirectusTranslation extends { id: number | string }
    ? Collections.DirectusTranslation["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteTranslations<Schema>> {
  let toReturn = DirectusSDK.deleteTranslations<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus translations items.
 */
export function aggregateDirectusTranslationsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_translations">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_translations", Options>
> {
  let toReturn = DirectusSDK.aggregate<
    Schema,
    "directus_translations",
    Options
  >("directus_translations", option);
  return toReturn;
}
