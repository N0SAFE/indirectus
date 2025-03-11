import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus revisions items.
 */
export function readDirectusRevisionsItems<
  Query extends Directus.Query<Schema, Collections.DirectusRevision>,
>(query?: Query): ReturnType<typeof DirectusSDK.readRevisions<Schema, Query>> {
  let toReturn = DirectusSDK.readRevisions<Schema, Query>(query);
  return toReturn;
}
/**
 * Read many directus revisions items.
 */
export const listDirectusRevisions = readDirectusRevisionsItems;
/**
 * Gets a single known directus revisions item by id.
 */
export function readDirectusRevisionsItem<
  Query extends Directus.Query<Schema, Collections.DirectusRevision>,
>(
  key: Collections.DirectusRevision extends { id: number | string }
    ? Collections.DirectusRevision["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readRevision<Schema, Query>> {
  let toReturn = DirectusSDK.readRevision<Schema, Query>(key, query);
  return toReturn;
}
/**
 * Gets a single known directus revisions item by id.
 */
export const readDirectusRevisions = readDirectusRevisionsItem;
/**
 * Aggregates directus revisions items.
 */
export function aggregateDirectusRevisionsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_revisions">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_revisions", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_revisions", Options>(
    "directus_revisions",
    option,
  );
  return toReturn;
}
