import * as path from "node:path";
import type { Registry } from "../registry";
import type { Schema } from "../schema";
import * as fs from "node:fs";
import { fsDeepTree, Tree } from "../utils/tree";

export class PluginGenerator {
  public readonly basePluginPath = path.join(
    __dirname,
    `../../default/templates/plugins`,
  );
  constructor(
    public readonly schema: Schema,
    public readonly registry: Registry,
  ) {}

  public getPath(plugin: string) {
    return path.join(this.basePluginPath, plugin);
  }

  public generateAddonTree(plugin: string) {
    if (!fs.existsSync(this.getPath(plugin))) {
      throw new Error(`Plugin ${plugin} does not exist`);
    }
    return fsDeepTree(this.getPath(plugin));
  }

  public async getAddonMap(plugin: string) {
    const addonTree = this.generateAddonTree(plugin);

    const addonArray = addonTree
      .filter((value, p, isEnd) => {
        return value.endsWith(".addons.js");
      })
      .toArrayWithMeta();

    return Promise.all(
      addonArray.map(async (item) => {
        return await import(item.value);
      }),
    ).then((res) => {
      return res.reduce(
        (acc, pack) => {
          Object.entries(pack).forEach(([key, value]) => {
            acc[key] = value;
          });
          return acc;
        },
        {} as Record<string, any>,
      );
    });
  }
}
