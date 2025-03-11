import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
// Gets a single known directus relations item by id.
export function readDirectusRelationsItem(
  key: Collections.DirectusRelation extends { collection: number | string }
    ? Collections.DirectusRelation["collection"]
    : string | number,
  field: Directus.DirectusRelation<Schema>["field"],
): Directus.RestCommand<Directus.ReadRelationOutput<Schema>, Schema> {
  let toReturn = DirectusSDK.readRelation(key, field);
  return toReturn;
}
// Gets a single known directus relations item by id.
export const readDirectusRelations = readDirectusRelationsItem;
// Read many directus relations items.
export function readDirectusRelationsItems(): ReturnType<
  typeof DirectusSDK.readRelations<Schema>
> {
  let toReturn = DirectusSDK.readRelations<Schema>();
  return toReturn;
}
// Read many directus relations items.
export const listDirectusRelations = readDirectusRelationsItems;
// Create a single directus relations item.
export function createDirectusRelationsItem(
  item: Partial<Collections.DirectusRelation>,
): ReturnType<typeof DirectusSDK.createRelation<Schema>> {
  let toReturn = DirectusSDK.createRelation<Schema>(item);
  return toReturn;
}
// Update a single known directus relations item by id.
export function updateDirectusRelationsItem<
  Query extends Directus.Query<Schema, Collections.DirectusRelation>,
>(
  collection: Directus.DirectusRelation<Schema>["collection"],
  field: Directus.DirectusRelation<Schema>["field"],
  patch: Partial<Collections.DirectusRelation>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateRelation<Schema, Query>> {
  let toReturn = DirectusSDK.updateRelation<Schema, Query>(
    collection,
    field,
    patch,
    query,
  );
  return toReturn;
}
// Deletes a single known directus relations item by id.
export function deleteDirectusRelationsItem(
  collection: Directus.DirectusRelation<Schema>["collection"],
  field: Directus.DirectusRelation<Schema>["field"],
): ReturnType<typeof DirectusSDK.deleteRelation<Schema>> {
  let toReturn = DirectusSDK.deleteRelation<Schema>(collection, field);
  return toReturn;
}
/**
 * Aggregates directus relations items.
 */
export function aggregateDirectusRelationsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_relations">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_relations", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_relations", Options>(
    "directus_relations",
    option,
  );
  return toReturn;
}
