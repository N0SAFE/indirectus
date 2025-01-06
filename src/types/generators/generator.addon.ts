import * as path from "node:path";
import type { Registry } from "@/types/registry";
import type { Schema } from "@/types/schema";
import * as fs from "node:fs";
import { fsDeepTree, Tree } from "@/types/utils/tree";

export class AddonGenerator {
    public readonly basePluginPath = path.join(
        __dirname,
        `../../templates/plugins`,
    );
    constructor(
        public readonly schema: Schema,
        public readonly registry: Registry,
    ) {}

    public getPath(addon: string) {
        return path.join(this.basePluginPath, addon);
    }

    public generateAddonTree(addon: string) {
        if (!fs.existsSync(this.getPath(addon))) {
            throw new Error(`Addon ${addon} does not exist`);
        }
        return fsDeepTree(this.getPath(addon));
    }

    public async getAddonMap(addon: string) {
        const addonTree = this.generateAddonTree(addon);

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
