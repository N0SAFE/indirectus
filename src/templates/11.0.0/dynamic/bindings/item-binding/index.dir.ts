import { to_collection_name } from "@/extensions/filters/directus";
import { dirConfigurator } from "@/types/generators/generator.dir";
import { Collection, Registry } from "@/types/registry";
import * as ItemTemplates from "./item.collection";
import * as fs from "node:fs";
import { ImportGenerator } from "@/lib/templating/generator/ts/import.generator";
import { TemplateGenerator } from "@/lib/templating/generator/utils";
import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import NunjuksVariable from "@/lib/templating/string/nunjuksVariable";
import path from "node:path";
import { ExportGenerator } from "@/lib/templating/generator/ts/export.generator";
import { toPascal } from "@wolfpkgs/core/strings";
import { pascal_case } from "@/extensions/filters/string_cases";
import $ from "pluralize";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import {
    ClassGenerator,
    ClassMethodGenerator,
    ClassPropertyGenerator,
} from "@/lib/templating/generator/ts/class.generator";
import { Methods } from "@/types/shape/Bindings/ItemBindings";

function classGetter(keys: [keyof Methods, Methods[keyof Methods]]) {
    const [className, propName] = keys;
    const classGenerator = ItemTemplates.classes[className];
    if (!classGenerator) {
        return null;
    }
    if (!propName) {
        return classGenerator();
    }
    const method = (() => {
        const generator = classGenerator()
            .getMethods()
            .find((method) => {
                if (method instanceof ClassMethodGenerator) {
                    return method.getName() === propName;
                } else if (method instanceof MultiLineGenerator) {
                    return method.some((item) => {
                        if (item instanceof ClassMethodGenerator) {
                            return item.getName() === propName;
                        }
                        return false;
                    });
                }
                throw new Error("not all use cases are covered");
            });
        if (!generator) {
            return null;
        }
        if (generator instanceof MultiLineGenerator) {
            return generator.find((item) => {
                if (item instanceof ClassMethodGenerator) {
                    return item.getName() === propName;
                }
                return false;
            }) as ClassMethodGenerator;
        }
        return generator;
    })();
    return method;
}

function get(key: `Class.${keyof Methods}`): ClassGenerator;
function get(
    key: `Class.${keyof Methods}.${Methods[keyof Methods]}`,
): ClassMethodGenerator;
function get(key: `Variable.${keyof typeof ItemTemplates.variables}`): string;
function get(key: `${"Class" | "Variable"}.${string}`) {
    const [namespace, ...rest] = key.split(".") as [
        AllNamspace<typeof key>,
        ...string[],
    ];
    if (namespace === "Class") {
        return classGetter(rest as [keyof Methods, Methods[keyof Methods]]);
    } else if (namespace === "Variable") {
        return ItemTemplates.variables[
            rest.join(".") as keyof typeof ItemTemplates.variables
        ];
    }
    return null;
}

export type BinderPluginConfig = {
    add: <C extends Collection>(options: {
        collection: C;
        registry: Registry;
        get: typeof get;
    }) => {
        imports:
            | (ImportGenerator | string)[]
            | MultiLineGenerator<ImportGenerator | string>;
        nunjuksVariables: Record<string, NunjuksVariable>;
        classes: {
            Singleton: ItemTemplates.ClassesOptions<"Singleton">;
            Items: ItemTemplates.ClassesOptions<"Items">;
            Item: ItemTemplates.ClassesOptions<"Item">;
        };
        variables: Record<string, any>;
        exports: (TemplateGenerator | string)[];
    };
};

type AllNamspace<T extends `${string}.${string}`> =
    T extends `${infer A}.${infer B}` ? A : never;
type PropertyByNamespace<
    T extends `${string}.${string}`,
    N extends string,
> = T extends `${N}.${infer B}` ? B : never;

function mergeClassesOptions<N extends keyof Methods>(
    acc: ItemTemplates.ClassesOptions<N>,
    toAdd: ItemTemplates.ClassesOptions<N>,
): ItemTemplates.ClassesOptions<N> {
    const methodLinesKey = Object.keys({
        ...acc.methodLines,
        ...toAdd.methodLines,
    }) as unknown as (keyof NonNullable<
        ItemTemplates.ClassesOptions<N>["methodLines"]
    >)[];
    return {
        methods: [...(acc.methods ?? []), ...(toAdd.methods ?? [])],
        properties: [...(acc.properties ?? []), ...(toAdd.properties ?? [])],
        methodLines: {
            ...(methodLinesKey.reduce(
                (acc, key) => {
                    return {
                        ...acc,
                        [key]: [
                            ...(acc?.[key] ?? []),
                            ...(toAdd?.methodLines?.[key] ?? []),
                        ],
                    };
                },
                {} as NonNullable<
                    ItemTemplates.ClassesOptions<N>["methodLines"]
                >,
            ) as unknown as NonNullable<
                ItemTemplates.ClassesOptions<N>["methodLines"]
            >),
        },
    };
}

export default dirConfigurator({
    generate: async ({ context, plugin }) => {
        console.log("Generating command for Directus instance");

        const bindingPlugin = plugin.getFromAllByProperty("binders");

        return {
            files: [
                {
                    path: "./index.ts",
                    template: context.registry.collections
                        .filter((collection) => {
                            return !collection.is_system;
                        })
                        .reduce((acc, collection) => {
                            return `${acc}export * from './${to_collection_name(context, collection.name.toString())}.commands';\n`;
                        }, ""),
                },
                ...context.registry.collections
                    .filter((collection) => {
                        return !collection.is_system;
                    })
                    .map((collection) => {
                        const toAdds = bindingPlugin.map((bindingPlugin) =>
                            bindingPlugin.value.add({
                                collection,
                                registry: context.registry,
                                get,
                            }),
                        );

                        return {
                            path: `./${to_collection_name(context, collection.name.toString())}.commands.ts`,
                            template: `
              ${[MultiLineGenerator.create(Object.values(ItemTemplates.variables)), ...toAdds.map((toAdd) => toAdd.nunjuksVariables)]}
              ${[ItemTemplates.imports(collection), ...toAdds.map((toAdd) => toAdd.imports)]}
              {% if collection.is_singleton %}
              ${ExportGenerator.create(
                  ItemTemplates.classes.Singleton(
                      toAdds.reduce(
                          (acc, toAdd) => {
                              return mergeClassesOptions(
                                  acc,
                                  toAdd.classes.Singleton,
                              );
                          },
                          {
                              methods: [],
                              properties: [],
                              methodLines: {
                                  read: [],
                                  update: [],
                              },
                          } as ItemTemplates.ClassesOptions<"Singleton">,
                      ),
                  ),
              )}
              {% else %}
              ${MultiLineGenerator.create(
                  [
                      ExportGenerator.create(
                          ItemTemplates.classes.Items(
                              toAdds.reduce(
                                  (acc, toAdd) => {
                                      return mergeClassesOptions(
                                          acc,
                                          toAdd.classes.Items,
                                      );
                                  },
                                  {
                                      methods: [],
                                      properties: [],
                                      methodLines: {
                                          aggregate: [],
                                          create: [],
                                          find: [],
                                          query: [],
                                          remove: [],
                                          update: [],
                                          updateBatch: [],
                                      },
                                  } as ItemTemplates.ClassesOptions<"Items">,
                              ),
                          ),
                      ),
                      ExportGenerator.create(
                          ItemTemplates.classes.Item(
                              toAdds.reduce(
                                  (acc, toAdd) => {
                                      return mergeClassesOptions(
                                          acc,
                                          toAdd.classes.Item,
                                      );
                                  },
                                  {
                                      methods: [],
                                      properties: [],
                                      methodLines: {
                                          create: [],
                                          update: [],
                                          get: [],
                                          remove: [],
                                      },
                                  } as ItemTemplates.ClassesOptions<"Item">,
                              ),
                          ),
                      ),
                  ],
                  { seperationSize: 2 },
              )}
              {% endif %}
              `,
                            variables: {
                                collection,
                            },
                        };
                    }),
            ],
        };
    },
});
