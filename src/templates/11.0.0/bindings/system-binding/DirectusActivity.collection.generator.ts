import { NunjucksRendererGenerator } from "@/lib/templating/generator/nunjucks/renderer.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { Registry } from "@/types/registry";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import { defaultImports, defaultItemsQuery } from "./generics";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import { ClassGenerator } from "@/lib/templating/generator/ts/class.generator";

const collectionName = "DirectusActivity";

export default (
    registry: Registry,
    {
        renderer,
        ctx,
    }: {
        renderer: TemplateRenderer;
        ctx: Record<string, unknown>;
    },
) =>
    IdentifierGenerator.create(
        `Bindings<${collectionName}>.System`,
        NunjucksRendererGenerator.create(
            FileGenerator.create([
                defaultImports(collectionName, [
                    "aggregateDirectusActivityItems",
                    "readDirectusActivityItem",
                    "readDirectusActivityItems",
                ]),
                IdentifierGenerator.create(
                    `Bindings<${collectionName}>.System.exports`,
                    MultiLineGenerator.create([
                        ClassGenerator.create(`${collectionName}Items`, {
                            extended: "ChainableBinding",
                            methods: [
                                defaultItemsQuery(collectionName),
                            ],
                        }),
                    ]),
                ),
            ]),
            renderer,
            ctx,
        ),
    );

// import type * as Directus from "@directus/sdk";

// import type { ApplyQueryFields } from "../../types/ApplyQueryFields";

// import type { Collections, Schema } from "../../client";
// import {
//   aggregateDirectusActivityItems,
//   readDirectusActivityItem,
//   readDirectusActivityItems,
// } from "../../commands/DirectusActivity.commands";
// import ChainableBinding from "../chainable-bindable";

// export class DirectusActivityItems extends ChainableBinding {

//   /**
//    * Read munknown items from the collection.
//    */
//   async query<
//     const Query extends Directus.Query<Schema, Collections.DirectusActivity>,
//     Output = ApplyQueryFields<
//       Schema,
//       Collections.DirectusActivity,
//       Query["fields"]
//     >[],
//   >(query?: Query): Promise<Output> {
//     return this.request(
//       readDirectusActivityItems(query),
//     ) as unknown as Promise<Output>;
//   }

//   /**
//    * Read the first item from the collection matching the query.
//    */
//   async find<
//     const Query extends Directus.Query<Schema, Collections.DirectusActivity>,
//     Output = ApplyQueryFields<
//       Schema,
//       Collections.DirectusActivity,
//       Query["fields"]
//     >,
//   >(query?: Query): Promise<Output | undefined> {
//     return this.request(
//       readDirectusActivityItems({
//         ...query,
//         limit: 1,
//       }),
//     ).then((items) => items?.[0]) as unknown as Promise<Output | undefined>;
//   }

//   /**
//    * Aggregates the items in the collection.
//    */
//   async aggregate<
//     Options extends Directus.AggregationOptions<Schema, "directus_activity">,
//     Output = Directus.AggregationOutput<
//       Schema,
//       "directus_activity",
//       Options
//     >[number],
//   >(options: Options): Promise<Output> {
//     return this.request(aggregateDirectusActivityItems<Options>(options)).then(
//       (a) => a?.[0],
//     ) as unknown as Promise<Output>;
//   }
// }

// export class DirectusActivityItem extends ChainableBinding {

//   /**
//    * Read a single item from the collection.
//    */
//   async get<
//     const Query extends Directus.Query<Schema, Collections.DirectusActivity>,
//     Output = ApplyQueryFields<
//       Schema,
//       Collections.DirectusActivity,
//       Query["fields"]
//     >,
//   >(
//     key: Collections.DirectusActivity extends { id: number | string }
//       ? Collections.DirectusActivity["id"]
//       : string | number,
//     query?: Query,
//   ): Promise<Output> {
//     return this.request(
//       readDirectusActivityItem(key, query),
//     ) as unknown as Promise<Output>;
//   }
// }
