import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import { Registry } from "@/types/registry";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import { snakeToPascal } from "../commands/system/generics";
import itemBindingDirectoryGenerator from "./item-binding";
import chainableBindableClassGenerator from "./chainable-bindable.generator";

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
        ctx: TemplateContext;
        renderer: TemplateRenderer;
    },
) =>
    DirectoryGenerator.create({
        ['chainable-bindable.ts']: chainableBindableClassGenerator(registry, {
            ctx,
            renderer
        }),
        ["item-binding"]: itemBindingDirectoryGenerator(registry, {
            ctx,
            renderer,
        }),
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
