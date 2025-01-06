import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import { Registry } from "@/types/registry";
import { TemplateRenderer } from "@/types/template";
import { snakeToPascal } from "../commands/system/generics";
import itemBindingGenerator from "./item-binding/index.collection.generator";

const systemBindingGenerator = {
    // DirectusActivity: () => {},
    // DirectusCollection: () => {},
    // DirectusDashboard: () => {},
    // DirectusExtension: () => {},
    // DirectusField: () => {},
    // DirectusFile: () => {},
    // DirectusFlow: () => {},
    // DirectusFolder: () => {},
    // DirectusNotification: () => {},
    // DirectusOperation: () => {},
    // DirectusPanel: () => {},
    // DirectusPermission: () => {},
    // DirectusPolicy: () => {},
    // DirectusPreset: () => {},
    // DirectusRelation: () => {},
    // DirectusRevision: () => {},
    // DirectusRole: () => {},
    // DirectusSettings: () => {},
    // DirectusShare: () => {},
    // DirectusTranslation: () => {},
    // DirectusUser: () => {},
    // DirectusVersion: () => {},
    // DirectusWebhook: () => {},
};

export default (
    registry: Registry,
    {
        ctx,
        renderer,
    }: {
        ctx: Record<string, unknown>;
        renderer: TemplateRenderer;
    },
) =>
    DirectoryGenerator.create({
        ["item-binding"]: DirectoryGenerator.create(
            Object.fromEntries(
                registry.collections
                    .filter((collection) => !collection.is_system)
                    .map((collection) => [
                        `${snakeToPascal(collection.name.raw)}.commands.ts`,
                        itemBindingGenerator(registry, collection, {
                            ctx,
                            renderer,
                        }),
                    ]),
            ) as Record<string, ReturnType<typeof itemBindingGenerator>>,
        ),
        ["system-binding"]: DirectoryGenerator.create(
            Object.fromEntries(
                Object.entries(systemBindingGenerator).map(
                    ([name, content]) => [`${name}.commands.ts`, content],
                ),
            ) as {
                [Key in keyof typeof systemBindingGenerator as `${Key}.commands.ts`]: (typeof systemBindingGenerator)[Key];
            },
        ),
    });
