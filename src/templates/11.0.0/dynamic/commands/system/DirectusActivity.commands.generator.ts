import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import { CommentGenerator } from "@/lib/templating/generator/comment.generator";
import { FunctionGenerator } from "@/lib/templating/generator/function.generator";
import { ImportGenerator } from "@/lib/templating/generator/import.generator";
import { TemplateGenerator } from "@/lib/templating/generator/utils";
import { VariableGenerator } from "@/lib/templating/generator/variable.generator";
import NunjuksVariable from "@/lib/templating/string/nunjuksVariable";
import { MethodsShape } from "../common/type";

const keyTemplate = {
  name: "key",
  type: "Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}['id'] : string | number",
};
const keysTemplate = {
  name: "keys",
  type: "Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}['id'][] : string[] | number[]",
};
const queryTemplate = {
  name: "query",
  type: "Query",
  optional: true,
};

export const imports = MultiLineGenerator.create([
  ImportGenerator.create("@directus/sdk", {
    all: true,
    type: true,
    as: "Directus",
  }),
  new ImportGenerator("@directus/sdk", {
    all: true,
    as: "DirectusSDK",
  }),
  new ImportGenerator("../client", {
    all: false,
    type: true,
    named: [
      {
        name: "Collections",
      },
      {
        name: "Schema",
      },
    ],
  }),
]);

export const variables = {} as const satisfies Record<string, NunjuksVariable>;

export const methods = {
  Singleton: {
    read: {
      comment: CommentGenerator.create(
        ["Gets a single known directus activity item by id."],
        {
          forceMultiline: true,
        },
      ),
      export: FunctionGenerator.create({
        name: "readDirectusActivityItem",
        params: [keyTemplate, queryTemplate],
        return: `ReturnType<typeof DirectusSDK.readActivity<Schema, Query>>`,
        content: `return DirectusSDK.readActivity<Schema, Query>(key, query);`,
      }),
    },
  },
} as const satisfies MethodsShape;

/**
 * Read munknown directus activity items.
 */
export function readDirectusActivityItems<
  const Query extends Directus.Query<
    Schema,
    DirectusSDK.DirectusActivity<Schema>
  >,
>(query?: Query): ReturnType<typeof DirectusSDK.readActivities<Schema, Query>> {
  return DirectusSDK.readActivities<Schema, Query>(query);
}

/**
 * Read munknown directus activity items.
 */
export const listDirectusActivity = readDirectusActivityItems;

/**
 * Gets a single known directus activity item by id.
 */
export function readDirectusActivityItem<
  const Query extends Directus.Query<
    Schema,
    DirectusSDK.DirectusActivity<Schema>
  >,
>(
  key: Collections.DirectusActivity extends { id: number | string }
    ? Collections.DirectusActivity["id"]
    : string | number,
  query?: Query,
): ReturnType<typeof DirectusSDK.readActivity<Schema, Query>> {
  return DirectusSDK.readActivity<Schema, Query>(key, query);
}

/**
 * Gets a single known directus activity item by id.
 */
export const readDirectusActivity = readDirectusActivityItem;

/**
 * Aggregates directus activity items.
 */
export function aggregateDirectusActivityItems<
  Options extends Directus.AggregationOptions<Schema, "directus_activity">,
>(
  option: Options,
): ReturnType<
  typeof DirectusSDK.aggregate<Schema, "directus_activity", Options>
> {
  return DirectusSDK.aggregate<Schema, "directus_activity", Options>(
    "directus_activity",
    option,
  );
}
