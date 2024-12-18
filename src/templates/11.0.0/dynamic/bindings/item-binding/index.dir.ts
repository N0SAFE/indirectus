import { to_collection_name } from "@/extensions/filters/directus";
import { dirConfigurator } from "@/types/generators/generator.dir";
import { Collection, Registry } from "@/types/registry";
import * as ItemTemplates from "./item.collection";
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
import { CommentGenerator } from "@/lib/templating/generator/comment.generator";
import {
  ClassMethodGenerator,
  ClassPropertyGenerator,
} from "@/lib/templating/generator/class.generator";

export type BinderPluginConfig = {
  add: <C extends Collection>(options: {
    collection: C;
    registry: Registry;
    get: (
      key: `${keyof ItemTemplates.Methods}.${ItemTemplates.Methods[keyof ItemTemplates.Methods]}`,
    ) => string | TemplateGenerator | null;
  }) => {
    imports:
      | (ImportGenerator | string)[]
      | MultiLineGenerator<ImportGenerator | string>;
    nunjuksVariables: Record<string, NunjuksVariable>;
    classes: {
      Singleton: Record<
        ItemTemplates.SingletonMethods,
        (
          | string
          | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
          | ClassMethodGenerator
          | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
          | ClassPropertyGenerator
        )[]
      >;
      Items: Record<
        ItemTemplates.ItemsMethods,
        (
          | string
          | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
          | ClassMethodGenerator
          | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
          | ClassPropertyGenerator
        )[]
      >;
      Item: Record<
        ItemTemplates.ItemMethods,
        (
          | string
          | MultiLineGenerator<CommentGenerator | ClassMethodGenerator>
          | ClassMethodGenerator
          | MultiLineGenerator<CommentGenerator | ClassPropertyGenerator>
          | ClassPropertyGenerator
        )[]
      >;
    };
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
                get: function (key) {
                  const [className, propName] = key.split(".") as [
                    keyof ItemTemplates.Methods,
                    ItemTemplates.Methods[keyof ItemTemplates.Methods],
                  ];
                  const classGenerator = ItemTemplates.classes[className];
                  if (!classGenerator) {
                    return null;
                  }
                  const method = (() => {
                    const generator = classGenerator
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
                },
              }),
            );

            return {
              path: `./${to_collection_name(context, collection.name.toString())}.commands.ts`,
              template: `
              ${[ItemTemplates.imports, ...toAdds.map((toAdd) => toAdd.imports)]}
              ${[MultiLineGenerator.create(Object.values(ItemTemplates.variables)), ...toAdds.map((toAdd) => toAdd.nunjuksVariables)]}
              {% if collection.is_singleton %}
              ${ItemTemplates.classes.Singleton}
              {% else %}
              ${MultiLineGenerator.create(
                [ItemTemplates.classes.Items, ItemTemplates.classes.Item],
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
