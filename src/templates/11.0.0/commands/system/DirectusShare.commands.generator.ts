import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { Registry, Collection } from "@/types/registry";
import {
    defaultImports,
    defaultReadsFunction,
    defaultReadsVariable,
    defaultReadFunction,
    defaultReadVariable,
    defaultCreateFunction,
    defaultCreatesFunction,
    defaultUpdateFunction,
    defaultUpdatesFunction,
    defaultDeleteFunction,
    defaultDeletesFunction,
    defaultAggregateFunction,
} from "./generics";

const collectionName = "DirectusShare";

export default () =>
    IdentifierGenerator.create(
        `Commands<${collectionName}>.System`,
        FileGenerator.create([
            defaultImports(collectionName),
            IdentifierGenerator.create(
                `Commands<${collectionName}>.System.exports`,
                MultiLineGenerator.create([
                    defaultReadsFunction(collectionName, "readShares"),
                    defaultReadsVariable(collectionName),
                    defaultReadFunction(collectionName, "readShare"),
                    defaultReadVariable(collectionName),
                    defaultCreateFunction(collectionName, "createShare"),
                    defaultCreatesFunction(collectionName, "createShares"),
                    defaultUpdateFunction(collectionName, "updateShare"),
                    defaultUpdatesFunction(collectionName, "updateShares"),
                    defaultDeleteFunction(collectionName, "deleteShare"),
                    defaultDeletesFunction(collectionName, "deleteShares"),
                    defaultAggregateFunction(collectionName),
                ]),
            ),
        ]),
    );

// import type * as Directus from "@directus/sdk";

// import * as DirectusSDK from "@directus/sdk";

// import type { Collections, Schema } from "../client";

// /**
//  * Create many directus shares items.
//  */
// export function createDirectusShareItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusShare>,
// >(
//   items: Partial<Collections.DirectusShare>[],
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.createShares<Schema, Query>> {
//   return DirectusSDK.createShares<Schema, Query>(items, query);
// }

// /**
//  * Create a single directus shares item.
//  */
// export function createDirectusShareItem<
//   const Query extends DirectusSDK.Query<Schema, Directus.DirectusShare<Schema>>, // Is this a mistake? Why []?
// >(
//   item: Partial<Collections.DirectusShare>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.createShare<Schema, Query>> {
//   return DirectusSDK.createShare<Schema, Query>(item, query);
// }

// /**
//  * Read many directus shares items.
//  */
// export function readDirectusShareItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusShare>,
// >(query?: Query): ReturnType<typeof DirectusSDK.readShares<Schema, Query>> {
//   return DirectusSDK.readShares<Schema, Query>(query);
// }

// /**
//  * Read many directus shares items.
//  */
// export const listDirectusShare = readDirectusShareItems;

// /**
//  * Gets a single known directus shares item by id.
//  */
// export function readDirectusShareItem<
//   const Query extends Directus.Query<Schema, Collections.DirectusShare>,
// >(
//   key: Collections.DirectusShare extends { id: number | string }
//     ? Collections.DirectusShare["id"]
//     : string | number,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.readShare<Schema, Query>> {
//   return DirectusSDK.readShare<Schema, Query>(key, query);
// }

// /**
//  * Gets a single known directus shares item by id.
//  */
// export const readDirectusShare = readDirectusShareItem;

// /**
//  * Read many directus shares items.
//  */
// export function updateDirectusShareItems<
//   const Query extends Directus.Query<Schema, Collections.DirectusShare>,
// >(
//   keys: Collections.DirectusShare extends { id: number | string }
//     ? Collections.DirectusShare["id"][]
//     : string[] | number[],
//   patch: Partial<Collections.DirectusShare>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateShares<Schema, Query>> {
//   return DirectusSDK.updateShares<Schema, Query>(keys, patch, query);
// }

// /**
//  * Gets a single known directus shares item by id.
//  */
// export function updateDirectusShareItem<
//   const Query extends Directus.Query<Schema, Collections.DirectusShare>,
// >(
//   key: Collections.DirectusShare extends { id: number | string }
//     ? Collections.DirectusShare["id"]
//     : string | number,
//   patch: Partial<Collections.DirectusShare>,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.updateShare<Schema, Query>> {
//   return DirectusSDK.updateShare<Schema, Query>(key, patch, query);
// }

// /**
//  * Deletes many directus shares items.
//  */
// export function deleteDirectusShareItems(
//   keys: Collections.DirectusShare extends { id: number | string }
//     ? Collections.DirectusShare["id"][]
//     : string[] | number[],
// ): ReturnType<typeof DirectusSDK.deleteShares<Schema>> {
//   return DirectusSDK.deleteShares<Schema>(keys);
// }

// /**
//  * Deletes a single known directus shares item by id.
//  */
// export function deleteDirectusShareItem(
//   key: Collections.DirectusShare extends { id: number | string }
//     ? Collections.DirectusShare["id"]
//     : string | number,
// ): ReturnType<typeof DirectusSDK.deleteShare<Schema>> {
//   return DirectusSDK.deleteShare<Schema>(key);
// }

// /**
//  * Aggregates directus shares items.
//  */
// export function aggregateDirectusShareItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_shares">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_shares", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_shares", Options>(
//     "directus_shares",
//     option,
//   );
// }
