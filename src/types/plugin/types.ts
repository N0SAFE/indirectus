import { CommandPluginConfig } from "@/templates/default/dynamic/commands.dir";
import { Collection, Registry } from "../registry";

export interface Plugin {
  commands: CommandPluginConfig;
  binders: {
    addProperty: (collection: Collection, registry: Registry) => string;
    create: (collection: Collection, registry: Registry) => string;
    copy: (collection: Collection, registry: Registry) => string;
  }
  schema: {
    add: (collection: Collection, registry: Registry) => string;
  }
  id: string;
}
