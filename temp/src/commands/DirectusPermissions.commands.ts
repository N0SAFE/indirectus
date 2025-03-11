import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus permissions items.
 */
export function readDirectusPermissionsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPermission>,
>(
  query?: Query,
): ReturnType<typeof DirectusSDK.readPermissions<Schema, Query>> {
  let toReturn = DirectusSDK.readPermissions<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus permissions items.
 */
export const listDirectusPermissions = readDirectusPermissionsItems;
/**
 * Gets a single known directus permissions item by id.
 */
export function readDirectusPermissionsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPermission>,
>(
  key: Collections.DirectusPermission extends { id: number | string }
    ? Collections.DirectusPermission["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readPermission<Schema, Query>> {
  let toReturn = DirectusSDK.readPermission<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus permissions item by id.
 */
export const readDirectusPermissions = readDirectusPermissionsItem;
/**
 * Create a single directus permissions item.
 */
export function createDirectusPermissionsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPermission>,
>(
  item: Partial<Collections.DirectusPermission>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createPermission<Schema, Query>> {
  let toReturn = DirectusSDK.createPermission<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus permissions items.
 */
export function createDirectusPermissionsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPermission>,
>(
  items: Partial<Collections.DirectusPermission>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createPermissions<Schema, Query>> {
  let toReturn = DirectusSDK.createPermissions<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus permissions item by id.
 */
export function updateDirectusPermissionsItem<
  Query extends Directus.Query<Schema, Collections.DirectusPermission>,
>(
  key: Collections.DirectusPermission extends { id: number | string }
    ? Collections.DirectusPermission["id"]
    : string | number,
  patch: Partial<Collections.DirectusPermission>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updatePermission<Schema, Query>> {
  let toReturn = DirectusSDK.updatePermission<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus permissions items by id.
 */
export function updateDirectusPermissionsItems<
  Query extends Directus.Query<Schema, Collections.DirectusPermission>,
>(
  keys: Collections.DirectusPermission extends { id: number | string }
    ? Collections.DirectusPermission["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusPermission>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updatePermissions<Schema, Query>> {
  let toReturn = DirectusSDK.updatePermissions<Schema, Query>(
    keys,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Delete a single known directus permissions item by id.
 */
export function deleteDirectusPermissionsItem(
  key: Collections.DirectusPermission extends { id: number | string }
    ? Collections.DirectusPermission["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deletePermission<Schema>> {
  let toReturn = DirectusSDK.deletePermission<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus permissions items by id.
 */
export function deleteDirectusPermissionsItems(
  keys: Collections.DirectusPermission extends { id: number | string }
    ? Collections.DirectusPermission["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deletePermissions<Schema>> {
  let toReturn = DirectusSDK.deletePermissions<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus permissions items.
 */
export function aggregateDirectusPermissionsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_permissions">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_permissions", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_permissions", Options>(
    "directus_permissions",
    option,
  );
  return toReturn;
}
