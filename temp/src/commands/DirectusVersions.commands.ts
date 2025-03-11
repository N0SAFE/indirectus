import type * as Directus from "@directus/sdk";
import * as DirectusSDK from "@directus/sdk";
import type { Collections, Schema } from "../client";
/**
 * Aggregates directus versions items.
 */
export function aggregateDirectusVersionsItems<
  Options extends Directus.AggregationOptions<Schema, "directus_versions">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_versions", Options>
> {
  let toReturn = DirectusSDK.aggregate<Schema, "directus_versions", Options>(
    "directus_versions",
    option,
  );
  return toReturn;
}
