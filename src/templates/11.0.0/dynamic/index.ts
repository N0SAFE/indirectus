import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import commandsGenerator from "./commands/index";
import { Registry } from "@/types/registry";
import { TemplateRenderer } from "@/types/template";
import bindingsGenerator from "./bindings/index";
import { RecursiveGet } from "@/lib/templating/generator/utils";

const t = (
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
        commands: commandsGenerator(registry, {
            ctx,
            renderer,
        }),
        bindings: bindingsGenerator(registry, {
            ctx,
            renderer,
        }),
    });

export default t;

const d = t({} as any, { ctx: {}, renderer: {} } as any);

type z = keyof RecursiveGet<ReturnType<typeof t>>;
