import type { Registry } from "./registry";
import type { Schema } from "./schema";

export type Context<T extends {} = {}> = T & {
    schema: Schema;
    registry: Registry;
    addons: Record<string, any>;
} 