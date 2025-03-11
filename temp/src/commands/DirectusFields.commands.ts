import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
// Read many DirectusFields items.
function readDirectusFieldsItems(): ReturnType<
  typeof DirectusSDK.readFields<Schema>
> {
  let toReturn = DirectusSDK.readFields<Schema>();
  return toReturn;
}
/**
 * Read many directus fields items.
 */
export const listDirectusFields = readDirectusFieldsItems;
// Read a single DirectusFields item.
function readDirectusFieldsItem(
  collection: keyof Schema,
  field: Directus.DirectusField<Schema>["field"],
): ReturnType<typeof DirectusSDK.readField<Schema>> {
  let toReturn = DirectusSDK.readField<Schema>(collection, field);
  return toReturn;
}
/**
 * Gets a single known directus fields item by id.
 */
export const readDirectusFields = readDirectusFieldsItem;
// Create a single DirectusFields item.
function createDirectusFieldsItem<
  Query extends Directus.Query<Schema, Collections.DirectusField>,
>(
  collection: keyof Schema,
  item: Partial<Collections.DirectusField>,
  query?: Query,
): ReturnType<typeof DirectusSDK.createField<Schema, Query>> {
  let toReturn = DirectusSDK.createField<Schema, Query>(
    collection,
    item,
    query,
  );
  return toReturn;
}
// Update a single DirectusFields item.
function updateDirectusFieldsItem<
  Query extends Directus.Query<Schema, Collections.DirectusField>,
>(
  key: Collections.DirectusField extends { collection: number | string }
    ? Collections.DirectusField["collection"]
    : string | number,
  field: Directus.DirectusField<Schema>["field"],
  patch: Partial<Collections.DirectusField>,
  query?: Query,
): ReturnType<typeof DirectusSDK.updateField<Schema, Query>> {
  let toReturn = DirectusSDK.updateField<Schema, Query>(
    key,
    field,
    patch,
    query,
  );
  return toReturn;
}
// Delete a single DirectusFields item.
function deleteDirectusFieldsItem(
  collection: Directus.DirectusField<Schema>["collection"],
  field: Directus.DirectusField<Schema>["field"],
): ReturnType<typeof DirectusSDK.deleteField<Schema>> {
  let toReturn = DirectusSDK.deleteField<Schema>(collection, field);
  return toReturn;
}
/**
 * Aggregates directus fields items.
 */
export function aggregateDirectusFieldsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_fields">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_fields", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_fields", Options>(
    "directus_fields",
    option,
  );
  return toReturn;
}
