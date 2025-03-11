import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus dashboards items.
 */
export function readDirectusDashboardsItems<
  Query extends Directus.Query<Schema, Collections.DirectusDashboard>,
>(query?: Query): ReturnType<typeof DirectusSDK.readDashboards<Schema, Query>> {
  let toReturn = DirectusSDK.readDashboards<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus dashboards items.
 */
export const listDirectusDashboards = readDirectusDashboardsItems;
/**
 * Gets a single known directus dashboards item by id.
 */
export function readDirectusDashboardsItem<
  Query extends Directus.Query<Schema, Collections.DirectusDashboard>,
>(
  key: Collections.DirectusDashboard extends { id: number | string }
    ? Collections.DirectusDashboard["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readDashboard<Schema, Query>> {
  let toReturn = DirectusSDK.readDashboard<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus dashboards item by id.
 */
export const readDirectusDashboards = readDirectusDashboardsItem;
/**
 * Create a single directus dashboards item.
 */
export function createDirectusDashboardsItem<
  Query extends Directus.Query<Schema, Collections.DirectusDashboard>,
>(
  item: Partial<Collections.DirectusDashboard>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createDashboard<Schema, Query>> {
  let toReturn = DirectusSDK.createDashboard<Schema, Query>(item, query);
  return toReturn;
}
/**
 * Create many directus dashboards items.
 */
export function createDirectusDashboardsItems<
  Query extends Directus.Query<Schema, Collections.DirectusDashboard>,
>(
  items: Partial<Collections.DirectusDashboard>[],
  query?: Query,
): ReturnType<typeof DirectusSDK.createDashboards<Schema, Query>> {
  let toReturn = DirectusSDK.createDashboards<Schema, Query>(items, query);
  return toReturn;
}
/**
 * Update a single known directus dashboards item by id.
 */
export function updateDirectusDashboardsItem<
  Query extends Directus.Query<Schema, Collections.DirectusDashboard>,
>(
  key: Collections.DirectusDashboard extends { id: number | string }
    ? Collections.DirectusDashboard["id"]
    : string | number,
  patch: Partial<Collections.DirectusDashboard>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateDashboard<Schema, Query>> {
  let toReturn = DirectusSDK.updateDashboard<Schema, Query>(key, patch, query);
  return toReturn;
}
/**
 * Update many known directus dashboards items by id.
 */
export function updateDirectusDashboardsItems<
  Query extends Directus.Query<Schema, Collections.DirectusDashboard>,
>(
  keys: Collections.DirectusDashboard extends { id: number | string }
    ? Collections.DirectusDashboard["id"][]
    : string[] | number[],
  patch: Partial<Collections.DirectusDashboard>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateDashboards<Schema, Query>> {
  let toReturn = DirectusSDK.updateDashboards<Schema, Query>(
    keys,
    patch,
    query,
  );
  return toReturn;
}
/**
 * Delete a single known directus dashboards item by id.
 */
export function deleteDirectusDashboardsItem(
  key: Collections.DirectusDashboard extends { id: number | string }
    ? Collections.DirectusDashboard["id"]
    : string | number,
): ReturnType<typeof DirectusSDK.deleteDashboard<Schema>> {
  let toReturn = DirectusSDK.deleteDashboard<Schema>(key);
  return toReturn;
}
/**
 * Delete many known directus dashboards items by id.
 */
export function deleteDirectusDashboardsItems(
  keys: Collections.DirectusDashboard extends { id: number | string }
    ? Collections.DirectusDashboard["id"][]
    : string[] | number[],
): ReturnType<typeof DirectusSDK.deleteDashboards<Schema>> {
  let toReturn = DirectusSDK.deleteDashboards<Schema>(keys);
  return toReturn;
}
/**
 * Aggregates directus dashboards items.
 */
export function aggregateDirectusDashboardsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_dashboards">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_dashboards", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_dashboards", Options>(
    "directus_dashboards",
    option,
  );
  return toReturn;
}
