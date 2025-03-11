import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus notifications items.
 */
export function readDirectusNotificationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusNotification>,
>(
  query?: Query,
): ReturnType<typeof DirectusSDK.readNotifications<Schema, Query>> {
  let toReturn = DirectusSDK.readNotifications<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus notifications items.
 */
export const listDirectusNotifications = readDirectusNotificationsItems;
/**
 * Gets a single known directus notifications item by id.
 */
export function readDirectusNotificationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusNotification>,
>(
  key: Collections.DirectusNotification extends { id: number | string }
    ? Collections.DirectusNotification["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readNotification<Schema, Query>> {
  let toReturn = DirectusSDK.readNotification<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus notifications item by id.
 */
export const readDirectusNotifications = readDirectusNotificationsItem;
/**
 * Create a single directus notifications item.
 */
export function createDirectusNotificationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusNotification>,
>(
  item: Partial<Collections.DirectusNotification>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createNotification<Schema, Query>> {
  let toReturn = DirectusSDK.createNotification<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus notifications items.
 */
export function createDirectusNotificationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusNotification>,
>(
  items: Partial<Collections.DirectusNotification>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createNotifications<Schema, Query>> {
  let toReturn = DirectusSDK.createNotifications<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus notifications item by id.
 */
export function updateDirectusNotificationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusNotification>,
>(
  key: Collections.DirectusNotification extends { id: number | string }
    ? Collections.DirectusNotification["id"]
    : string | number,
  patch: Partial<Collections.DirectusNotification>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateNotification<Schema, Query>> {
  let toReturn = DirectusSDK.updateNotification<Schema, Query>(
    key,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Update many known directus notifications items by id.
 */
export function updateDirectusNotificationsItems<
  Query extends Directus.Query<Schema, Collections.DirectusNotification>,
>(
  keys: Collections.DirectusNotification extends { id: number | string }
    ? Collections.DirectusNotification["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusNotification>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateNotifications<Schema, Query>> {
  let toReturn = DirectusSDK.updateNotifications<Schema, Query>(
    keys,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Delete a single known directus notifications item by id.
 */
export function deleteDirectusNotificationsItem(
  key: Collections.DirectusNotification extends { id: number | string }
    ? Collections.DirectusNotification["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteNotification<Schema>> {
  let toReturn = DirectusSDK.deleteNotification<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus notifications items by id.
 */
export function deleteDirectusNotificationsItems(
  keys: Collections.DirectusNotification extends { id: number | string }
    ? Collections.DirectusNotification["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteNotifications<Schema>> {
  let toReturn = DirectusSDK.deleteNotifications<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus notifications items.
 */
export function aggregateDirectusNotificationsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_notifications">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_notifications", Options>
> {
  let toReturn = DirectusSDK.aggregate<
    Schema,
    "directus_notifications",
    Options
  >("directus_notifications", option);
  return toReturn;
}
