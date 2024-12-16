import { Plugin } from "./types";

export class PluginHandler {
  constructor(private readonly plugins: Plugin[]) {}

  public add(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  public find(id: string) {
    return this.plugins.find((plugin) => plugin.id === id);
  }

  public remove(id: string) {
    const index = this.plugins.findIndex((plugin) => plugin.id === id);
    if (index !== -1) {
      this.plugins.splice(index, 1);
    }
  }

  public getAll() {
    return this.plugins;
  }

  public getFromAll(
    fn: (plugin: Plugin) => string | undefined,
  ): string | undefined {
    for (const plugin of this.plugins) {
      const result = fn(plugin);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  public getFromAllByProperty<Prop extends Exclude<keyof Plugin, 'id'>>(property: Prop) {
    return this.plugins.map((plugin) => ({
      id: plugin.id,
      value: plugin[property],
    }));
  }
}
