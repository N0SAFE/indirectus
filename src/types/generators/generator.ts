import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import * as path from "node:path";

import env from "@wolfpkgs/core/env";
import { Options } from "@wolfpkgs/core/options";
import type chokidar from "chokidar";
import { FSWatcher } from "chokidar";
import EventEmitter, { type Listener } from "eventemitter2";
import prettier from "prettier";
import { z } from "zod";

import { type Registry, createRegistry } from "../registry";
import type { Schema } from "@/types/schema";

import { fetchSchema } from "@/types/schema";
import { type TemplateRenderer, createRenderer } from "../template";
import type { TemplateFile } from "@/types/template-loader";
import { AddonGenerator } from "./generator.addon";
import { DirConfiguratorOptionsType, DirGenerator } from "./generator.dir";
import type { Context } from "@/types/types";
import { baseDynamicPath, baseStaticPath, basePluginPath } from "@/types/constant";
import { ConfigLoader } from "@/types/config";
import { PluginHandler } from "@/types/plugin/index";

export const GeneratorOptions = Options.for(() => {
  const e = env.loadSync(process.cwd(), {
    allParents: true,
    parents: true,
  });

  return {
    url: z
      .string()
      .optional()
      .default(e.DIRECTUS_URL ?? "http://localhost:8055"),
    token: z
      .string()
      .optional()
      .default(e.DIRECTUS_TOKEN ?? ""),
    template: z.string().optional().default("default"),
    cache: z.string().optional().default("./.directus"),
    config: z.string().optional().default(ConfigLoader.defaultConfigName),
    output: z
      .string()
      .optional()
      .default("./.directus/generated")
      .transform((value) => {
        if (!fs.existsSync(value)) {
          fs.mkdirSync(value, { recursive: true });
        }
        return value;
      }),
    useCache: z.boolean().default(false),
    watch: z.boolean().default(false),
    log: z.string().optional().default("info"),
    plugins: z
      .string()
      .transform((value) => {
        const arr = value.split(" ");
        if (arr.length === 1 && arr[0] === "") {
          return [];
        }
        return arr;
      })
      .pipe(
        z
          .string()
          .array()
          .optional()
          .default(
            e.PLUGINS
              ? e.PLUGINS.split(",").length === 1 &&
                e.PLUGINS.split(",")[0] === ""
                ? []
                : e.PLUGINS.split(",")
              : [],
          ),
      ),
  };
});

export type GeneratorOptions = Options.Input<typeof GeneratorOptions>;
export type CompleteGeneratorOptions = Options.Output<typeof GeneratorOptions>;

export type GeneratorError = Error & {
  message: string;
  context: string[];
};

export type TypedEvents = Record<string | symbol, (...args: any[]) => any>;

export declare interface TypedEventEmitter<Events extends TypedEvents> {
  on<Event extends keyof Events>(
    event: Event | Event[],
    listener: (
      ...args: Parameters<Events[Event]>
    ) => Promise<Awaited<ReturnType<Events[Event]>>>,
  ): this | Listener;

  on<Event extends keyof Events>(
    event: Event | Event[],
    listener: (...args: Parameters<Events[Event]>) => void,
  ): this | Listener;

  emitAsync<Event extends keyof Events>(
    event: Event | Event[],
    ...args: Parameters<Events[Event]>
  ): Promise<Awaited<ReturnType<Events[Event]>>[]>;
}

export class TypedEventEmitter<
  Events extends TypedEvents,
> extends EventEmitter {}

export type GeneratorEvents = {
  ["initialization.begin"]: () => void;
  ["initialization.end"]: () => void;

  ["schema.begin"]: () => void;
  ["schema.success"]: () => void;
  ["schema.failure"]: (err: GeneratorError) => void;
  ["schema.error"]: (err: GeneratorError) => void;
  ["schema.end"]: () => void;

  ["generation.begin"]: () => void;
  ["generation.success"]: () => void;
  ["generation.failure"]: (err: GeneratorError) => void;
  ["generation.error"]: (err: GeneratorError) => void;
  ["generation.end"]: () => void;

  ["generation.plugins.begin"]: () => void;
  ["generation.plugins.success"]: () => void;
  ["generation.plugins.failure"]: (err: GeneratorError) => void;
  ["generation.plugins.error"]: (err: GeneratorError) => void;
  ["generation.plugins.end"]: () => void;
  ["generation.plugins.generate"]: (pluginName: string) => void;

  ["file.begin"]: (file: TemplateFile) => void;
  ["file.format.error"]: (file: TemplateFile, err: GeneratorError) => void;
  ["file.error"]: (file: TemplateFile, err: GeneratorError) => void;
  ["file.output"]: (file: TemplateFile, output: string) => void;
  ["file.end"]: (file: TemplateFile) => void;
  ["error"]: (err: GeneratorError) => void;

  ["plugins"]: (plugins: string[]) => void;
};

export class Generator extends TypedEventEmitter<GeneratorEvents> {
  private watcher: chokidar.FSWatcher;
  private watching = false;
  private schema: Schema = {
    version: 0,
    collections: [],
    fields: [],
    directus: "",
    relations: [],
    vendor: "",
  };
  private engines: Record<string, TemplateRenderer> = {};

  private registry!: Registry;
  private addons!: Record<string, any>;
  private addonGenerator!: AddonGenerator;
  private dirGenerator!: DirGenerator;
  private config!: ConfigLoader;
  private pluginHandler!: PluginHandler;

  private initialized = false;

  constructor(private options: CompleteGeneratorOptions) {
    super();

    this.watcher = new FSWatcher({
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: true,
      ignorePermissionErrors: true,
    });

    this.setMaxListeners(1000);
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    await this.runTask("initialization", async () => {
      if (this.schema.version) {
        return;
      }

      const [config, addons] = await Promise.all([
        ConfigLoader.loadConfig(this.options.config, {
          url: this.options.url,
          plugins: [],
        }),
        this.options.plugins.reduce(
          async (acc, plugin) =>
            Object.assign(acc, await this.addonGenerator.getAddonMap(plugin)),
          {},
        ),
      ]);

      console.log(config);

      this.registry = createRegistry(this.schema);
      this.addonGenerator = new AddonGenerator(this.schema, this.registry);
      this.dirGenerator = new DirGenerator(this.schema, this.registry);
      this.addons = addons;
      this.config = config;
      this.pluginHandler = new PluginHandler(this.config.getPlugins() ?? []);

      this.emit("plugins", this.options.plugins); // this as to be deprecated

      await this.runTask("schema", async () => {
        this.schema = await fetchSchema(
          {
            url: this.options.url,
            token: this.options.token,
          },
          {
            cache: path.join(this.options.cache, "cache/schema.json"),
            useCache: this.options.useCache,
          },
        );

        this.initialized = true;
      });
    });
  }

  watch() {
    this.watching = true;
    this.watcher.on("all", async (event, path) => {
      await this.generate();
    });
    return this;
  }

  async createContext<T extends {}>(
    render: TemplateRenderer,
    addedOptions: any = {},
  ): Promise<Context<T>> {
    return {
      ...addedOptions,
      schema: this.schema,
      registry: this.registry,
      addons: Object.fromEntries(
        await Promise.all(
          Object.entries(this.addons).map(async ([name, string]) => [
            name,
            await render.fromString(string, {
              schema: this.schema,
              registry: this.registry,
            }),
          ]),
        ),
      ),
    };
  }

  async generateDir(
    basePath: string,
    dir: string,
    renderer: TemplateRenderer,
    addedOptions: any = {},
  ) {
    console.log("load " + dir);
    console.log(await require(dir));
    const { generate } = ((await require(dir))?.default ?? {}) as DirConfiguratorOptionsType;
    const dirName = dir.replace(".dir.js", "");
    await this.runTask("dir", async (emit) => {
      if (!generate) {
        return;
      }
      const { files, variables } = (await generate({
        context: await this.createContext(renderer, addedOptions),
        renderer,
        plugin: this.pluginHandler,
      })) as {
        files: {
          path: string;
          template: string;
          variables: Record<string, any>;
        }[];
        variables: Record<string, any>;
      };
      for (const file of files) {
        await this.generateFile(
          {
            ...file,
            output: path.isAbsolute(file.path)
              ? file.path
              : path.join(path.relative(basePath, dirName), file.path),
          },
          renderer,
          {
            ...file.variables,
            ...variables,
            ...addedOptions,
          },
        );
      }
    });
  }

  async generateFile(
    file: TemplateFile | { output: string; template: string },
    renderer: TemplateRenderer,
    addedOptions: any = {},
  ) {
    await this.runTask("file", async (emit) => {
      let result: string;

      await emit("render", file);

      if ("template" in file) {
        result = await renderer.fromString(
          file.template,
          await this.createContext(renderer, addedOptions),
        );
      } else {
        result = await renderer(
          file.input,
          await this.createContext(renderer, addedOptions),
        );
      }

      const info = await prettier.getFileInfo(file.output);
      if (info.inferredParser) {
        try {
          result = await prettier.format(result, {
            parser: info.inferredParser,
          });
        } catch (err) {
          await this.emitAsync("file.format.error", file, this.makeError(err));
          await this.emitAsync("generation.error", this.makeError(err));
        }
      }

      const dir = path.dirname(
        path.isAbsolute(file.output)
          ? file.output
          : path.join(this.options.output, file.output),
      );
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await fsp.writeFile(
        path.isAbsolute(file.output)
          ? file.output
          : path.join(this.options.output, file.output),
        result,
        {
          encoding: "utf-8",
        },
      );
      await this.emitAsync("file.output", file, result);
    });
  }

  async generate() {
    await this.initialize();

    const templateName = this.options.template;
    const templateDirs = [
      path.join(__dirname, "../../"),
      path.join(__dirname, "../../../"),
      this.options.output, // this is used for the plugin system in the future
    ].filter((dir) => fs.existsSync(dir));

    const key = JSON.stringify({
      templateName,
      templateDirs,
    });

    console.log(templateDirs);

    const renderer =
      this.engines[key] ?? (await createRenderer(templateName, templateDirs));
    if (!(key in this.engines)) {
      this.engines[key] = renderer;
    }

    await this.runTask("generation", async () => {
      if (this.watching) {
        // this.watcher.add([
        //   ...engine.directories.map((dir) => path.join(dir, "**/*.njk")),
        // ]);
      }

      for (const file of renderer.files) {
        const targetPath = path.join(this.options.output, file.output);
        if (fs.existsSync(targetPath)) {
          await fsp.rm(targetPath);
        }
      }

      for (const file of renderer.files) {
        await this.generateFile(file, renderer);
      }

      const dirsLocation = this.dirGenerator.getDirPaths(baseDynamicPath);
      await Promise.all(
        dirsLocation
          .map(async (dir) => {
            return this.generateDir(baseDynamicPath, dir, renderer);
          })
          .toArray(),
      );

      console.log("no");

      console.log(this.options.plugins);
    });

    await this.runTask("generation.plugins", async (emit) => {
      for (const plugin of this.options.plugins) {
        await emit("generate", plugin);
        const addonFileTree = this.addonGenerator.generateAddonTree(plugin);

        const list = addonFileTree
          .filter((file, p, isEnd) => {
            return path.extname(file) === ".njk" || !isEnd;
          })
          .reduce<[string, string[]][]>((acc, file, p) => {
            acc.push([file, p]);
            return acc;
          }, []);
        for (const [file, p] of list) {
          const templateFile = {
            input: file,
            output: path.join(...p).replace(/.njk$/i, ""),
          } as TemplateFile;

          await this.generateFile(templateFile, renderer);
        }

        const dirsLocation = this.dirGenerator.getDirPaths(
          path.resolve(basePluginPath, plugin),
        );
        await Promise.all(
          dirsLocation
            .map(async (dir) => {
              return this.generateDir(
                path.resolve(basePluginPath, plugin),
                dir,
                renderer,
              );
            })
            .toArray(),
        );
      }
    });

    return this;
  }

  private async runTask<T, Params extends any[], Result>(
    name: string,
    task: (
      emit: (event: string, ...args: Params) => Promise<Result[]>,
    ) => Promise<T>,
  ): Promise<T> {
    try {
      await this.emitAsync(`${name}.begin` as any);
      const result = await task(async (event, ...args) =>
        this.emitAsync(`${name}.${event}` as any, ...args),
      );
      await this.emitAsync(`${name}.success` as any, result);
      return result;
    } catch (err) {
      const wrapped = this.makeError(err);
      await this.emitAsync(`${name}.error` as any, wrapped);
      throw err;
    } finally {
      await this.emitAsync(`${name}.end` as any);
    }
  }

  private makeError(
    err: (Error & { context?: string }) | string,
  ): GeneratorError {
    let message: string;
    let context: string[] = [];

    if (typeof err != "string" && err != null) {
      message = (err?.message ?? "")
        .replace(/, file:/g, "\n")
        .replace(/, line:/g, ":")
        .replace(/, col:/g, ":");
      if (err?.context) {
        if (typeof err?.context == "string") {
          context = err?.context?.split("\n") ?? [];
        }
      }
    } else {
      message = err ?? "Unknown error";
    }

    if (typeof err == "string") {
      err = new Error(message);
    }

    return Object.assign(err, { message, context });
  }
}

export async function createGenerator(options: GeneratorOptions) {
  const opts: CompleteGeneratorOptions = await GeneratorOptions.get(options);
  return new Generator(opts);
}
