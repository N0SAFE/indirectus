import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { FunctionGenerator } from "@/lib/templating/generator/ts/function.generator";
import { ImportGenerator } from "@/lib/templating/generator/ts/import.generator";
import { VariableDeclaratorGenerator } from "@/lib/templating/generator/ts/declarator.generator";
import { Collection, Identifier, Registry } from "@/types/registry";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import {
    defaultAggregateFunction,
    defaultImports,
    defaultReadFunction,
    defaultReadsFunction,
    defaultReadsVariable,
    defaultReadVariable,
} from "./generics";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";

const collectionName = "DirectusActivity";

const t = () =>
    IdentifierGenerator.create(
        `Commands<${collectionName}>.System`,
        FileGenerator.create([
            defaultImports(collectionName),
            IdentifierGenerator.create(
                `Commands<${collectionName}>.System.exports`,
                MultiLineGenerator.create([
                    defaultReadsFunction(collectionName, "readActivities"),
                    defaultReadsVariable(collectionName),
                    defaultReadFunction(collectionName, "readActivity"),
                    defaultReadVariable(collectionName),
                    defaultAggregateFunction(collectionName),
                ]),
            ),
        ]),
    );

export default t;

// /**
//  * Read munknown directus activity items.
//  */
// export function readDirectusActivityItems<
//   const Query extends Directus.Query<
//     Schema,
//     DirectusSDK.DirectusActivity<Schema>
//   >,
// >(query?: Query): ReturnType<typeof DirectusSDK.readActivities<Schema, Query>> {
//   return DirectusSDK.readActivities<Schema, Query>(query);
// }

// /**
//  * Read munknown directus activity items.
//  */
// export const listDirectusActivity = readDirectusActivityItems;

// /**
//  * Gets a single known directus activity item by id.
//  */
// export function readDirectusActivityItem<
//   const Query extends Directus.Query<
//     Schema,
//     DirectusSDK.DirectusActivity<Schema>
//   >,
// >(
//   key: Collections.DirectusActivity extends { id: number | string }
//     ? Collections.DirectusActivity["id"]
//     : string | number,
//   query?: Query,
// ): ReturnType<typeof DirectusSDK.readActivity<Schema, Query>> {
//   return DirectusSDK.readActivity<Schema, Query>(key, query);
// }

// /**
//  * Gets a single known directus activity item by id.
//  */
// export const readDirectusActivity = readDirectusActivityItem;

// /**
//  * Aggregates directus activity items.
//  */
// export function aggregateDirectusActivityItems<
//   Options extends Directus.AggregationOptions<Schema, "directus_activity">,
// >(
//   option: Options,
// ): ReturnType<
//   typeof DirectusSDK.aggregate<Schema, "directus_activity", Options>
// > {
//   return DirectusSDK.aggregate<Schema, "directus_activity", Options>(
//     "directus_activity",
//     option,
//   );
// }
