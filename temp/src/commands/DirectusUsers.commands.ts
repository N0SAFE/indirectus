import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * read current user.
 */
export function readMeItem<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(query?: Query): ReturnType<typeof DirectusSDK.readMe<Schema, Query>> {
  let toReturn = DirectusSDK.readMe<Schema, Query>(query);
  return toReturn;
}
/**
 * update current user.
 */
export function updateMeItem<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(
  patch: Partial<Collections.DirectusUser>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateMe<Schema, Query>> {
  let toReturn = DirectusSDK.updateMe<Schema, Query>(patch, query);
  return toReturn;
}
/**
 * Read many directus users items.
 */
export function readDirectusUsersItems<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(query?: Query): ReturnType<typeof DirectusSDK.readUsers<Schema, Query>> {
  let toReturn = DirectusSDK.readUsers<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus users items.
 */
export const listDirectusUsers = readDirectusUsersItems;
/**
 * Gets a single known directus users item by id.
 */
export function readDirectusUsersItem<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(
  key: Collections.DirectusUser extends { id: number | string }
    ? Collections.DirectusUser["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readUser<Schema, Query>> {
  let toReturn = DirectusSDK.readUser<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus users item by id.
 */
export const readDirectusUsers = readDirectusUsersItem;
/**
 * Create a single directus users item.
 */
export function createDirectusUsersItem<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(
  item: Partial<Collections.DirectusUser>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createUser<Schema, Query>> {
  let toReturn = DirectusSDK.createUser<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus users items.
 */
export function createDirectusUsersItems<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(
  items: Partial<Collections.DirectusUser>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createUsers<Schema, Query>> {
  let toReturn = DirectusSDK.createUsers<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus users item by id.
 */
export function updateDirectusUsersItem<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(
  key: Collections.DirectusUser extends { id: number | string }
    ? Collections.DirectusUser["id"]
    : string | number,
  patch: Partial<Collections.DirectusUser>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateUser<Schema, Query>> {
  let toReturn = DirectusSDK.updateUser<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus users items by id.
 */
export function updateDirectusUsersItems<
  Query extends Directus.Query<Schema, Collections.DirectusUser>,
>(
  keys: Collections.DirectusUser extends { id: number | string }
    ? Collections.DirectusUser["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusUser>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateUsers<Schema, Query>> {
  let toReturn = DirectusSDK.updateUsers<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus users item by id.
 */
export function deleteDirectusUsersItem(
  key: Collections.DirectusUser extends { id: number | string }
    ? Collections.DirectusUser["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteUser<Schema>> {
  let toReturn = DirectusSDK.deleteUser<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus users items by id.
 */
export function deleteDirectusUsersItems(
  keys: Collections.DirectusUser extends { id: number | string }
    ? Collections.DirectusUser["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteUsers<Schema>> {
  let toReturn = DirectusSDK.deleteUsers<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus users items.
 */
export function aggregateDirectusUsersItems<
  Options extends Directus.AggregationOptions<Schema, "directus_users">,
>(
  option: Options,
): ReturnType<typeof DirectusSDK.aggregate<Schema, "directus_users", Options>> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_users", Options>(
    "directus_users",
    option,
  );
  return toReturn;
}
