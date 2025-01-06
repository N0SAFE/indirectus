import * as fs from "fs";
import * as path from "path";
import jiti from "jiti";
import semver from "semver";

const load = jiti(__filename, {
    //debug: true,
});

import {
    type Callback,
    FileSystemLoader,
    FileSystemLoaderOptions,
    ILoader,
    type ILoaderAsync,
    Loader,
    type LoaderSource,
} from "nunjucks";
import { grob } from "@wolfpkgs/core/grob";
import { Version, Versionner } from "./version";

export type TemplateFile =
    | {
          input: string;
          output: string;
      }
    | {
          output: string;
          template: string;
      };

export class TemplateLoader extends Loader implements ILoaderAsync {
    public "async": true = true;
    public static "async"?: true | undefined = true;

    private macrosDir: string;
    private templatesDir: string;

    constructor(
        private projectDir: string,
        private version: `${number}.${number}.${number}`,
    ) {
        super();

        (this as any).setMaxListeners(1000);

        this.macrosDir = path.join(projectDir, "macros");
        this.templatesDir = path.join(projectDir, "templates");
    }

    public static getTemplatesDirs(projectDir: string) {
        return path.join(projectDir, "templates");
    }

    public getTemplatesDir() {
        const dirs = fs.readdirSync(this.templatesDir) as Version[];

        const closest = Versionner.getCLosestVersion(dirs, this.version);
        if (closest) {
            return path.join(this.templatesDir, closest);
        }
        return path.join(
            this.templatesDir,
            Versionner.getSmallestVersion(dirs)!,
        );
    }

    public getPLuginTemplateDir(plugin: string) {
        return path.join(this.templatesDir, "plugins", plugin);
    }

    public getMacrosDir() {
        return this.macrosDir;
    }

    public getFiltersDir() {
        return path.join(this.projectDir, "extensions/filters");
    }

    public getTagsDir() {
        return path.join(this.projectDir, "extensions/tags");
    }

    public getStaticTemplatesDir() {
        return path.join(this.getTemplatesDir(), "static");
    }

    public getDynamicTemplatesDir() {
        return path.join(this.getTemplatesDir(), "dynamic");
    }

    async getFiles(): Promise<TemplateFile[]> {
        const root = this.getStaticTemplatesDir();

        const discovered = await grob.glob("**/*.njk", {
            cwd: root,
            absolute: true,
        });

        const files: TemplateFile[] = discovered
            .map((file) => path.relative(root, file))
            .map((file) => ({
                input: file,
                output: file.replace(/.njk$/i, ""),
            }))
            .filter((file) => {
                return file.input != file.output;
            })
            .map((file) => ({
                input: path.join(root, file.input),
                output: file.output,
            }));

        return files.map((file) => {
            if ("template" in file) {
                return file;
            }
            return {
                input: path.resolve(file.input),
                output: file.output,
            };
        });
    }

    getFilterFiles(): string[] {
        const root = this.getFiltersDir();

        const files: string[] = grob
            .globSync("**/*.{ts,mts,cts,js,mjs,cjs}", {
                cwd: root,
                ignore: ["**/*.d.ts"],
            })
            .filter((name, _, files) => {
                if (name.endsWith("js")) {
                    return files.indexOf(name.replace(/js$/i, "ts")) < 0;
                }
                return true;
            })
            .map((name) => path.join(root, name));

        return files;
    }

    getFilters(): Record<string, (...args: any[]) => any> {
        const files: string[] = this.getFilterFiles();
        const filters: Record<string, (...args: any[]) => any> = {};

        for (const file of files) {
            const filter: any = load(file);
            if (typeof filter === "object") {
                Object.assign(filters, filter);
            }
        }

        return filters;
    }

    public async getSource(
        name: string,
        callback: Callback<Error, LoaderSource>,
    ): Promise<void> {
        let type = "template";
        let request: string = name;

        if (name.indexOf(":") > 0) {
            if (!fs.existsSync(name)) {
                const parts = name.split(":", 2);
                type = parts[0]!;
                request = parts.slice(1)[0]!;
            }
        }

        let searchPath: string | null = null;
        let fullpath: string | null = null;

        if (type == "default") {
            searchPath = this.getTemplatesDir();
        } else if (type == "template") {
            searchPath = this.getTemplatesDir();
        } else if (type == "macro") {
            searchPath = this.macrosDir;
        } else if (type == "module") {
            try {
                fullpath = require.resolve(request);
            } catch (err) {
                try {
                    fullpath = await import(request);
                } catch (err) {
                    fullpath = null;
                }
            }
        }

        if (!fullpath && searchPath) {
            const searchDir = searchPath;
            const basePath = path.resolve(searchDir);
            const candidates = [
                path.resolve(searchDir, request),
                path.resolve(searchDir, `${request}.njk`),
            ];
            for (const candidate of candidates) {
                if (
                    candidate.indexOf(basePath) === 0 &&
                    fs.existsSync(candidate)
                ) {
                    fullpath = candidate;
                    break;
                }
            }
        }

        if (!fullpath) {
            try {
            } catch (err) {}
        }

        if (!fullpath) {
            callback(new Error("Template not found"), null);
            return;
        }

        const source = {
            src: fs.readFileSync(fullpath, "utf-8"),
            path: fullpath,
            noCache: true,
        };

        this.emit("load", name, source);

        callback(null, source);
    }
}
