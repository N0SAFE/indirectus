import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Read many directus extensions items.
 */
export function readDirectusExtensionsItems(): ReturnType<
  typeof DirectusSDK.readExtensions<Schema>
> {
  let toReturn = DirectusSDK.readExtensions<Schema>();
  return toReturn;
}
/**
 * Read many directus extensions items.
 */
export const listDirectusExtensions = readDirectusExtensionsItems;
// Update a single known directus extensions item by id.
export function updateDirectusExtensionsItem(
  bundle: string | null,
  name: string,
  data: Directus.NestedPartial<Directus.DirectusExtension<Schema>>,
): ReturnType<typeof DirectusSDK.updateExtension<Schema>> {
  let toReturn = DirectusSDK.updateExtension<Schema>(bundle, name, data);
  return toReturn;
}
/**
 * Aggregates directus extensions items.
 */
export function aggregateDirectusExtensionsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_extensions">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_extensions", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_extensions", Options>(
    "directus_extensions",
    option,
  );
  return toReturn;
}
