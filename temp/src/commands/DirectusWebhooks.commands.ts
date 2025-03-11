import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus webhooks items.
 */
export function readDirectusWebhooksItems<
  Query extends Directus.Query<Schema, Collections.DirectusWebhook>,
>(query?: Query): ReturnType<typeof DirectusSDK.readWebhooks<Schema, Query>> {
  let toReturn = DirectusSDK.readWebhooks<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus webhooks items.
 */
export const listDirectusWebhooks = readDirectusWebhooksItems;
/**
 * Gets a single known directus webhooks item by id.
 */
export function readDirectusWebhooksItem<
  Query extends Directus.Query<Schema, Collections.DirectusWebhook>,
>(
  key: Collections.DirectusWebhook extends { id: number | string }
    ? Collections.DirectusWebhook["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readWebhook<Schema, Query>> {
  let toReturn = DirectusSDK.readWebhook<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus webhooks item by id.
 */
export const readDirectusWebhooks = readDirectusWebhooksItem;
/**
 * Create a single directus webhooks item.
 */
export function createDirectusWebhooksItem<
  Query extends Directus.Query<Schema, Collections.DirectusWebhook>,
>(
  item: Partial<Collections.DirectusWebhook>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createWebhook<Schema, Query>> {
  let toReturn = DirectusSDK.createWebhook<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus webhooks items.
 */
export function createDirectusWebhooksItems<
  Query extends Directus.Query<Schema, Collections.DirectusWebhook>,
>(
  items: Partial<Collections.DirectusWebhook>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createWebhooks<Schema, Query>> {
  let toReturn = DirectusSDK.createWebhooks<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus webhooks item by id.
 */
export function updateDirectusWebhooksItem<
  Query extends Directus.Query<Schema, Collections.DirectusWebhook>,
>(
  key: Collections.DirectusWebhook extends { id: number | string }
    ? Collections.DirectusWebhook["id"]
    : string | number,
  patch: Partial<Collections.DirectusWebhook>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateWebhook<Schema, Query>> {
  let toReturn = DirectusSDK.updateWebhook<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus webhooks items by id.
 */
export function updateDirectusWebhooksItems<
  Query extends Directus.Query<Schema, Collections.DirectusWebhook>,
>(
  keys: Collections.DirectusWebhook extends { id: number | string }
    ? Collections.DirectusWebhook["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusWebhook>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateWebhooks<Schema, Query>> {
  let toReturn = DirectusSDK.updateWebhooks<Schema, Query>(keys, patch, query);
  return toReturn;
}
/**
 * Delete a single known directus webhooks item by id.
 */
export function deleteDirectusWebhooksItem(
  key: Collections.DirectusWebhook extends { id: number | string }
    ? Collections.DirectusWebhook["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteWebhook<Schema>> {
  let toReturn = DirectusSDK.deleteWebhook<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus webhooks items by id.
 */
export function deleteDirectusWebhooksItems(
  keys: Collections.DirectusWebhook extends { id: number | string }
    ? Collections.DirectusWebhook["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteWebhooks<Schema>> {
  let toReturn = DirectusSDK.deleteWebhooks<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus webhooks items.
 */
export function aggregateDirectusWebhooksItems<
  Options extends Directus.AggregationOptions<Schema, "directus_webhooks">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_webhooks", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_webhooks", Options>(
    "directus_webhooks",
    option,
  );
  return toReturn;
}
