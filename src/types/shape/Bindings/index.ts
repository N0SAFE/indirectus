import { ClassGenerator } from "@/lib/templating/generator/class.generator";
import { ClassesOptions } from "./ItemBindings";

export interface Classes {
    Singleton?: (options?:ClassesOptions<"Singleton">) => ClassGenerator;
    Items?: (options?:ClassesOptions<"Items">) => ClassGenerator;
    Item?: (options?:ClassesOptions<"Item">) => ClassGenerator;
}

export type BindingType = 'Item' | 'System'