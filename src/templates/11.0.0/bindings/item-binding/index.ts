import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import { Registry } from "@/types/registry";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import { snakeToPascal } from "../../commands/system/generics";
import itemBindingGenerator from "./index.collection.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import typesItemBindingGenerator from "./types.generator";

export default (
    registry: Registry,
    {
        ctx,
        renderer,
    }: {
        ctx: TemplateContext;
        renderer: TemplateRenderer;
    },
) =>
    DirectoryGenerator.create({
        ["index.ts"]: IdentifierGenerator.create(
            "Bindings.Item.Index",
            MultiLineGenerator.create(
                registry.collections
                    .filter((collection) => !collection.is_system)
                    .map(
                        (collection) =>
                            `export * from './${snakeToPascal(collection.name.raw)}.commands';`,
                    ),
            ),
        ),
        ["types.ts"]: typesItemBindingGenerator(registry, {
            ctx,
            renderer,
        }),
        ...(Object.fromEntries(
            registry.collections
                .filter((collection) => !collection.is_system)
                .map((collection) => [
                    `${snakeToPascal(collection.name.raw)}.commands.ts`,
                    itemBindingGenerator(registry, collection, {
                        ctx,
                        renderer,
                    }),
                ]),
        ) as Record<string, ReturnType<typeof itemBindingGenerator>>),
    });
