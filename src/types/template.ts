import * as njk from "nunjucks";
import { type TemplateFile, TemplateLoader } from "./template-loader";
import type { Registry } from "./registry";
import type { Schema } from "./schema";

export interface TemplateRenderer {
    (file: string, context: any): string;
    files: TemplateFile[];
    fromString: (string: string, context: any) => string;
    loader: TemplateLoader;
}

export type TemplateContext<T extends {} = Record<string, any>> = T & {
    schema: Schema;
    registry: Registry;
    addons: Record<string, any>;
};

export async function createRenderer(
    basePath: string,
    versionUsed: `${number}.${number}.${number}`,
): Promise<TemplateRenderer> {
    const loader = new TemplateLoader(basePath, versionUsed);
    const files = await loader.getFiles();

    function render(file: string, context: any) {
        const filters = loader.getFilters();

        const renderer = new njk.Environment(loader, {
            autoescape: false,
        });

        Object.entries(filters).forEach(([name, filter]) => {
            renderer.addFilter(name, (...args: any[]) => {
                return filter(context, ...args);
            });
        });

        return renderer.render(file, context);

        // return new Promise<string>((resolve, reject) => {
        //   renderer.render(file, context, (err, result) => {
        //     if (err) {
        //       return reject(err);
        //     }
        //     resolve(result ?? "");
        //   });
        // });
    }

    function renderFromString(string: string, context: any) {
        const filters = loader.getFilters();

        const renderer = new njk.Environment(loader, {
            autoescape: false,
        });

        Object.entries(filters).forEach(([name, filter]) => {
            renderer.addFilter(name, (...args: any[]) => {
                return filter(context, ...args);
            });
        });

        return renderer.renderString(string, context);
        // return new Promise<string>((resolve, reject) => {
        //   renderer.renderString(string, context, (err, result) => {
        //     if (err) {
        //       return reject(err);
        //     }
        //     resolve(result ?? "");
        //   });
        // });
    }

    return Object.assign(render, {
        files,
        fromString: renderFromString,
        loader,
    });

    /*
  const renderer = new Liquid({
    root: templates,
    partials: partials,
    dynamicPartials: true,
    strictFilters: true,
    extname: ".liquid",
    ownPropertyOnly: false,
  });

  // String cases

  // TODO: move watcher + prettier here
  // TODO: turn to events

  return {
    renderer,
    directories: templates,
    files: await fetchTemplates(templates),
  };
  */
}
