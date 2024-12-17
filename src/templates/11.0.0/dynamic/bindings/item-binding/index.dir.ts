import { to_collection_name } from "@/extensions/filters/directus";
import { dirConfigurator } from "@/types/generators/generator.dir";
import { Collection, Registry } from "@/types/registry";
import * as itemTemplates from "./item.collection";
import * as fs from "node:fs";
import { ImportGenerator } from "@/lib/templating/generator/import.generator";
import { TemplateGenerator } from "@/lib/templating/generator/utils";
import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import NunjuksVariable from "@/lib/templating/string/nunjuksVariable";
import path from "node:path";
import { ExportGenerator } from "@/lib/templating/generator/export.generator";
import { toPascal } from "@wolfpkgs/core/strings";
import { pascal_case } from "@/extensions/filters/string_cases";
import $ from "pluralize";

export type ToGetSingleton = keyof typeof itemTemplates.is_singleton;

export type ToGetNotSingleton = keyof typeof itemTemplates.is_not_singleton;

export type ToGet = ToGetSingleton | ToGetNotSingleton;

export type BinderPluginConfig = {
  add: <C extends Collection>(options: {
    collection: C;
    registry: Registry;
    get: (prop: ToGet) => string | TemplateGenerator | null;
  }) => {
    imports:
      | (ImportGenerator | string)[]
      | MultiLineGenerator<ImportGenerator | string>;
    nunjuksVariables: Record<string, NunjuksVariable>;
    variables: Record<string, any>;
    exports: (TemplateGenerator | string)[];
  };
};

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
                get: (prop: ToGet) => {
                  if (collection.is_singleton) {
                    return (
                      itemTemplates.is_singleton[prop as ToGetSingleton]
                        .export ?? null
                    );
                  } else {
                    return (
                      itemTemplates.is_not_singleton[prop as ToGetNotSingleton]
                        .export ?? null
                    );
                  }
                },
              }),
            );

            return {
              path: `./${to_collection_name(context, collection.name.toString())}.commands.ts`,
              template: `
              ${[itemTemplates.imports, ...toAdds.map((toAdd) => toAdd.imports)]}
              ${[MultiLineGenerator.create(Object.values(itemTemplates.variables)), ...toAdds.map((toAdd) => toAdd.nunjuksVariables)]}
              {% if collection.is_singleton %}
              ${MultiLineGenerator.create(
                Object.values(itemTemplates.is_singleton).map((item) =>
                  MultiLineGenerator.create([
                    item.comment,
                    ExportGenerator.create(item.export),
                  ]),
                ),
                { seperationSize: 2 },
              )}
              {% else %}
              ${MultiLineGenerator.create(
                Object.values(itemTemplates.not_singleton).map((item) =>
                  MultiLineGenerator.create([
                    item.comment,
                    ExportGenerator.create(item.export),
                  ]),
                ),
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
