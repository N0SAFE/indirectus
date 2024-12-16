import { to_collection_name } from "@/extensions/filters/directus";
import { dirConfigurator } from "@/types/generators/generator.dir";
import { Collection, Registry } from "@/types/registry";
import * as itemTemplates from "./commands.templates/item.commands";
import * as fs from "node:fs";
import { ImportGenerator } from "@/lib/templating/generator/import.generator";
import { TemplateGenerator } from "@/lib/templating/generator/utils";
import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import NunjuksVariable from "@/lib/templating/string/nunjuksVariable";
import path from "node:path";

export type ToGetSingleton = keyof typeof itemTemplates.is_singleton;

export type ToGetNotSingleton = keyof typeof itemTemplates.not_singleton;

export type ToGet = ToGetSingleton | ToGetNotSingleton;

export type CommandPluginConfig = {
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

    const commandsPlugins = plugin.getFromAllByProperty("commands");

    const systemTemplates = new Map(
      fs.readdirSync(path.resolve(__dirname, "./commands.templates/system")).map((template) => {
        return [
          template.replaceAll(".ts.njk", ""),
          fs.readFileSync(path.resolve(__dirname, `./commands.templates/system/${template}`)).toString(),
        ];
      }),
    );

    return {
      files: [
        {
          path: "./index.ts",
          template: context.registry.collections.reduce((acc, collection) => {
            return `${acc}export * from './${to_collection_name(context, collection.name.toString())}.commands';\n`;
          }, ""),
        },
        ...context.registry.collections
          .filter((collection) => {
            return !collection.is_system;
          })
          .map((collection) => {
            const toAdds = commandsPlugins.map((commandPlugin) =>
              commandPlugin.value.add({
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
                      itemTemplates.not_singleton[prop as ToGetNotSingleton]
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
                  MultiLineGenerator.create([item.comment, item.export]),
                ),
                { seperationSize: 2 },
              )}
              `,
              variables: {
                collection,
              },
            };
          }),
        ...context.registry.collections
          .filter((collection) => collection.is_system)
          .map((collection) => {
            const template = systemTemplates.get(collection.name.toString());
            if (!template) {
              return null; // there is no file for this system collection
            }
            return {
              path: `./${to_collection_name(context, collection.name.toString())}.commands.ts`,
              template,
              variables: {
                collection,
              },
            };
          })
          .filter((collection) => collection !== null),
      ],
    };
  },
});
