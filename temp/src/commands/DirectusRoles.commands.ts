import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus roles items.
 */
export function readDirectusRolesItems<
  Query extends Directus.Query<Schema, Collections.DirectusRole>,
>(query?: Query): ReturnType<typeof DirectusSDK.readRoles<Schema, Query>> {
  let toReturn = DirectusSDK.readRoles<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus roles items.
 */
export const listDirectusRoles = readDirectusRolesItems;
/**
 * Gets a single known directus roles item by id.
 */
export function readDirectusRolesItem<
  Query extends Directus.Query<Schema, Collections.DirectusRole>,
>(
  key: Collections.DirectusRole extends { id: number | string }
    ? Collections.DirectusRole["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readRole<Schema, Query>> {
  let toReturn = DirectusSDK.readRole<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus roles item by id.
 */
export const readDirectusRoles = readDirectusRolesItem;
/**
 * Create a single directus roles item.
 */
export function createDirectusRolesItem<
  Query extends Directus.Query<Schema, Collections.DirectusRole>,
>(
  item: Partial<Collections.DirectusRole>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createRole<Schema, Query>> {
  let toReturn = DirectusSDK.createRole<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus roles items.
 */
export function createDirectusRolesItems<
  Query extends Directus.Query<Schema, Collections.DirectusRole>,
>(
  items: Partial<Collections.DirectusRole>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createRoles<Schema, Query>> {
  let toReturn = DirectusSDK.createRoles<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus roles item by id.
 */
export function updateDirectusRolesItem<
  Query extends Directus.Query<Schema, Collections.DirectusRole>,
>(
  key: Collections.DirectusRole extends { id: number | string }
    ? Collections.DirectusRole["id"]
    : string | number,
  patch: Partial<Collections.DirectusRole>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateRole<Schema, Query>> {
  let toReturn = DirectusSDK.updateRole<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus roles items by id.
 */
export function updateDirectusRolesItems<
  Query extends Directus.Query<Schema, Collections.DirectusRole>,
>(
  keys: Collections.DirectusRole extends { id: number | string }
    ? Collections.DirectusRole["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusRole>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateRoles<Schema, Query>> {
  let toReturn = DirectusSDK.updateRoles<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus roles item by id.
 */
export function deleteDirectusRolesItem(
  key: Collections.DirectusRole extends { id: number | string }
    ? Collections.DirectusRole["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteRole<Schema>> {
  let toReturn = DirectusSDK.deleteRole<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus roles items by id.
 */
export function deleteDirectusRolesItems(
  keys: Collections.DirectusRole extends { id: number | string }
    ? Collections.DirectusRole["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteRoles<Schema>> {
  let toReturn = DirectusSDK.deleteRoles<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus roles items.
 */
export function aggregateDirectusRolesItems<
  Options extends Directus.AggregationOptions<Schema, "directus_roles">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "directus_roles", Options>> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_roles", Options>(
    "directus_roles",
    option,
  );
  return toReturn;
}
