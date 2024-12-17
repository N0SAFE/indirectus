import { CommandPluginConfig } from "@/templates/11.0.0/dynamic/commands/index.dir";
import { Collection, Registry } from "../registry";
import { BinderPluginConfig } from "@/templates/11.0.0/dynamic/bindings/item-binding/index.dir";

export interface Plugin {
  commands: CommandPluginConfig;
  binders: BinderPluginConfig;
  schema: {
    add: (collection: Collection, registry: Registry) => string;
  }
  id: string;
}
