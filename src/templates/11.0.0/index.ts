import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import commandsGenerator from "./commands/index";
import { Registry } from "@/types/registry";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import bindingsGenerator from "./bindings/index";
import { RecursiveGet } from "@/lib/templating/generator/utils";
import clientGenerator from './client'

const t = (
    registry: Registry,
    {
        ctx,
        renderer,
    }: {
        ctx: TemplateContext
        renderer: TemplateRenderer;
    },
) =>
    DirectoryGenerator.create({
        commands: commandsGenerator(registry, {
            ctx,
            renderer,
        }),
        bindings: bindingsGenerator(registry, {
            ctx,
            renderer,
        }),
        ['client.ts']: clientGenerator(registry, {
            ctx,
            renderer
        })
    });

export default t;

// const d = t({} as any, { ctx: {}, renderer: {} } as any);

// type z = keyof RecursiveGet<ReturnType<typeof t>>;
