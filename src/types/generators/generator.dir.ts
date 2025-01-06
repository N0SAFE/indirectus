import * as path from "node:path";
import type { Registry } from "@/types/registry";
import type { Schema } from "@/types/schema";
import { fsDeepTree, Tree } from "@/types/utils/tree";
import * as fs from "node:fs";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import { PluginHandler } from "@/types/plugin/index";

export class DirGenerator {
    constructor(
        public readonly schema: Schema,
        public readonly registry: Registry,
    ) {}

    public generateTree(src: string) {
        if (!fs.existsSync(src)) {
            return new Tree<string>();
        }
        return fsDeepTree(src);
    }

    public getDirPaths(src: string) {
        const tree = this.generateTree(src);
        return tree.filter((value, p, isEnd) => {
            return value.endsWith(".dir.js");
        });
    }
}

export type DirConfiguratorOptionsType = {
    generate?: (options: {
        context: TemplateContext;
        renderer: TemplateRenderer;
        plugin: PluginHandler;
    }) =>
        | Promise<{
              files: {
                  path: string;
                  template: string;
                  variables?: Record<string, any>;
              }[];
              variables?: Record<string, any>;
          }>
        | {
              files: {
                  path: string;
                  template: string;
                  variables?: Record<string, any>;
              }[];
              variables?: Record<string, any>;
          };
    name?: string;
};

export function dirConfigurator(options: DirConfiguratorOptionsType) {
    return options;
}
