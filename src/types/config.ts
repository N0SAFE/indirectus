import * as fs from "node:fs";
import { Plugin } from "./plugin/types";

export interface Config {
  url: string;
  plugins?: Plugin[];
}

export class ConfigLoader {
  static defaultConfigName = "directus-sdk.config.ts";
  constructor(private config: Config) {}
  static async loadConfig(
    path: string,
    defaultConfig: Config,
  ): Promise<ConfigLoader> {
    if (!fs.existsSync(path)) {
      // throw new Error(`Config file not found at ${path}`);
      return new ConfigLoader({
        url: "http://localhost:8055",
        plugins: [],
      });
    }
    try {
      return new ConfigLoader(await import(path));
    } catch (e) {
      throw new Error(`Error loading config file at ${path}: ${e}`);
    }
  }

  getConfig() {
    return this.config;
  }

  setConfig(config: Config) {
    this.config = config;
  }

  getPlugins() {
    return this.config.plugins;
  }
}
