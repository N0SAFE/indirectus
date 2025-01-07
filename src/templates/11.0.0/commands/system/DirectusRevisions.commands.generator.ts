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

const collectionName = "DirectusRevisions";

export default () =>
    IdentifierGenerator.create(
        `Commands<${collectionName}>.System`,
        FileGenerator.create([
            defaultImports(collectionName),
            IdentifierGenerator.create(
                `Commands<${collectionName}>.System.exports`,
                MultiLineGenerator.create([
                    defaultReadsFunction(collectionName, "readRevisions"),
                    defaultReadsVariable(collectionName),
                    defaultReadFunction(collectionName, "readRevision"),
                    defaultReadVariable(collectionName),
                    defaultAggregateFunction(collectionName),
                ]),
            ),
        ]),
    );

// import type * as Directus from "@directus/sdk";

// import * as DirectusSDK from "@directus/sdk";

// import type { Collections, Schema } from "../client";

// /**
//  * Read many directus revisions items.
//  */
// export function readDirectusRevisionItems<
//   const Query extends Directus.Query<
//     Schema,
//     DirectusSDK.DirectusRevision<Schema>
//   >,
// >(query?: Query): ReturnType<typeof DirectusSDK.readRevisions<Schema, Query>> {
//   return DirectusSDK.readRevisions<Schema, Query>(query);
// }

// /**
//  * Read many directus revisions items.
//  */
// export const listDirectusRevision = readDirectusRevisionItems;

// /**
//  * Gets a single known directus revisions item by id.
//  */
// export function readDirectusRevisionItem<
//   const Query extends Directus.Query<
//     Schema,
//     DirectusSDK.DirectusRevision<Schema>
//   >,
// >(
//   key: Collections.DirectusRevision extends { id: number | string }
//     ? Collections.DirectusRevision["id"]
//     : string | number,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.readRevision<Schema, Query>> {
//   return DirectusSDK.readRevision<Schema, Query>(key, query);
// }

// /**
//  * Gets a single known directus revisions item by id.
//  */
// export const readDirectusRevision = readDirectusRevisionItem;

// /**
//  * Aggregates directus revisions items.
//  */
// export function aggregateDirectusRevisionItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_revisions">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_revisions", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_revisions", Options>(
//     "directus_revisions",
//     option,
//   );
// }
