import { CommandPluginConfig } from "@/templates/11.0.0/dynamic/commands/index.dir";
import { Collection, Registry } from "../registry";
import { BinderPluginConfig } from "@/templates/11.0.0/dynamic/bindings/item-binding/index.dir";
import { Methods, Variables } from "../shape/Bindings/ItemBindings";
import {
    ClassGenerator,
    ClassMethodGenerator,
} from "@/lib/templating/generator/ts/class.generator";
import { MultiLineGenerator } from "@/lib/templating/generator/arrangement.generator";
import { BindingType, Classes } from "../shape/Bindings";

type AllNamspace<T extends `${string}.${string}`> =
    T extends `${infer A}.${infer B}` ? A : never;
type PropertyByNamespace<
    T extends `${string}.${string}`,
    N extends string,
> = T extends `${N}.${infer B}` ? B : never;

function bindingsClassGetter(
    keys: [keyof Methods, Methods[keyof Methods]],
    classes: Classes,
) {
    const [className, propName] = keys;
    const classGenerator = classes[className];
    if (!classGenerator) {
        return null;
    }
    if (!propName) {
        return classGenerator();
    }
    const method = (() => {
        const generator = classGenerator()
            .getMethods()
            .find((method) => {
                if (method instanceof ClassMethodGenerator) {
                    return method.getName() === propName;
                } else if (method instanceof MultiLineGenerator) {
                    return method.some((item) => {
                        if (item instanceof ClassMethodGenerator) {
                            return item.getName() === propName;
                        }
                        return false;
                    });
                }
                throw new Error("not all use cases are covered");
            });
        if (!generator) {
            return null;
        }
        if (generator instanceof MultiLineGenerator) {
            return generator.find((item) => {
                if (item instanceof ClassMethodGenerator) {
                    return item.getName() === propName;
                }
                return false;
            }) as ClassMethodGenerator;
        }
        return generator;
    })();
    return method;
}

function get<Key extends `Bindings.${BindingType}.Class.${keyof Methods}`>(
    key: Key,
    options: {
        bindings: {
            classes: Classes;
        };
    },
): ClassGenerator;
function get<
    Key extends
        `Bindings.${BindingType}.Class.${keyof Methods}.${Methods[keyof Methods]}`,
>(
    key: Key,
    options: {
        bindings: {
            classes: Classes;
        };
    },
): ClassMethodGenerator;
function get<Key extends `Bindings.${BindingType}.Variable.${keyof Variables}`>(
    key: Key,
    options: {
        bindings: {
            variables: Variables;
        };
    },
): string;
function get<Key extends `${"Class" | "Variable"}.${string}`>(
    key: Key,
    options: {
        bindings?: {
            classes?: Classes;
            variables?: Variables;
        };
    },
) {
    const [namespace, ...rest] = key.split(".") as [
        AllNamspace<typeof key>,
        ...string[],
    ];
    if (namespace === "Class") {
        return bindingsClassGetter(
            rest as [keyof Methods, Methods[keyof Methods]],
            options?.bindings?.classes!,
        );
    } else if (namespace === "Variable") {
        const variables = options?.bindings?.variables!;
        return variables[rest.join(".") as keyof typeof variables];
    }
    return null;
}

export type PluginOptions = {
    registry: Registry;
    generator: {
        commands: CommandPluginConfig;
    };
};

export interface Plugin {
    (options: {});
    commands: CommandPluginConfig;
    binders: BinderPluginConfig;
    schema: {
        add: (collection: Collection, registry: Registry) => string;
    };
    generate: (registry: Registry, plugin: Plugin, _get: typeof get) => string;
    id: string;
}
