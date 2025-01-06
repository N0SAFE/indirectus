import { MultiLineGenerator } from "@/lib/templating/generator/struct/arrangement.generator";
import {
    ClassGenerator,
    ClassMethodGenerator,
} from "@/lib/templating/generator/ts/class.generator";
import { CommentGenerator } from "@/lib/templating/generator/ts/comment.generator";
import { FileGenerator } from "@/lib/templating/generator/struct/file.generator";
import {
    FunctionParamGenerator,
    FunctionParamsGenerator,
} from "@/lib/templating/generator/ts/function.generator";
import {
    GenericTypeGenerator,
    GenericsTypeGenerator,
} from "@/lib/templating/generator/type/generic.generator";
import { IdentifierGenerator } from "@/lib/templating/generator/struct/identifier.generate";
import {
    ImportGenerator,
    NamedImportGenerator,
} from "@/lib/templating/generator/ts/import.generator";
import {
    NunjucksConditionGenerator,
    NunjucksElseConditionGenerator,
    NunjucksIfConditionGenerator,
} from "@/lib/templating/generator/nunjucks/condition.generator";
import { NunjucksRendererGenerator } from "@/lib/templating/generator/nunjucks/renderer.generator";
import { NunjucksVariableGenerator } from "@/lib/templating/generator/nunjucks/variables.generator";
import { Collection, Registry } from "@/types/registry";
import {
    ItemMethods,
    ItemsMethods,
    SingletonMethods,
} from "@/types/shape/Bindings/ItemBindings";
import { TemplateRenderer } from "@/types/template";

export default (
    registry: Registry,
    collection: Collection,
    {
        renderer,
        ctx,
    }: {
        renderer: TemplateRenderer;
        ctx: Record<string, unknown>;
    },
) =>
    IdentifierGenerator.create(
        `Bindings<${collection.name}>.Item`,
        NunjucksRendererGenerator.create(
            FileGenerator.create([
                IdentifierGenerator.create(
                    `Bindings<${collection.name}>.Item.variables`,
                    MultiLineGenerator.create([
                        NunjucksVariableGenerator.create(
                            "collectionName",
                            `collection.name | to_collection_name`,
                        ),
                        NunjucksVariableGenerator.create(
                            "collectionString",
                            `collection.name | to_collection_string`,
                        ),
                        NunjucksVariableGenerator.create(
                            "collectionType",
                            `["Collections.", collection.name | to_collection_name] | join`,
                        ),
                        NunjucksVariableGenerator.create(
                            "genericQuery",
                            `["const Query extends Directus.Query<Schema, ", collectionType, ">"] | join`,
                        ),
                        NunjucksVariableGenerator.create(
                            "genericQueryArray",
                            `["const Query extends Directus.Query<Schema, ", collectionType, "[]>"] | join`,
                        ),
                        NunjucksVariableGenerator.create(
                            "genericOutput",
                            `["Output = ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>"] | join`,
                        ),
                        NunjucksVariableGenerator.create(
                            "genericOutputArray",
                            `["Output = ApplyQueryFields<Schema, ", collectionType, ", Query['fields']>[]"] | join`,
                        ),
                        NunjucksVariableGenerator.create(
                            "genericOutputVoid",
                            `"Output = void"`,
                        ),
                        NunjucksVariableGenerator.create(
                            "applyType",
                            `"Output"`,
                        ),
                    ]),
                ),
                IdentifierGenerator.create(
                    `Bindings<${collection.name}>.Item.imports`,
                    MultiLineGenerator.create([
                        ImportGenerator.create("@directus/sdk", {
                            all: true,
                            as: "Directus",
                            type: true,
                        }),
                        ImportGenerator.create("../../types/ApplyQueryFields", {
                            named: [
                                NamedImportGenerator.create("ApplyQueryFields"),
                            ],
                            type: true,
                        }),
                        ImportGenerator.create("../chainable-bindable", {
                            default: "ChainableBinding",
                        }),
                        ImportGenerator.create("../../client", {
                            named: [
                                NamedImportGenerator.create("Schema"),
                                NamedImportGenerator.create("Collections"),
                            ],
                            type: true,
                        }),
                        NunjucksConditionGenerator.create({
                            if: NunjucksIfConditionGenerator.create(
                                "collection.is_singleton",
                                MultiLineGenerator.create([
                                    ImportGenerator.create("./types", {
                                        named: [
                                            NamedImportGenerator.create(
                                                "TypedCollectionSingletonWrapper",
                                            ),
                                        ],
                                    }),
                                    ImportGenerator.create(
                                        "../../commands/{{ collectionName }}.commands",
                                        {
                                            named: [
                                                NamedImportGenerator.create(
                                                    "read{{collectionName}}",
                                                ),
                                                NamedImportGenerator.create(
                                                    "update{{collectionName}}",
                                                ),
                                            ],
                                        },
                                    ),
                                ]),
                            ),
                            else: NunjucksElseConditionGenerator.create(
                                MultiLineGenerator.create([
                                    ImportGenerator.create("./types", {
                                        named: [
                                            NamedImportGenerator.create(
                                                "TypedCollectionItemsWrapper",
                                            ),
                                            NamedImportGenerator.create(
                                                "TypedCollectionItemWrapper",
                                            ),
                                        ],
                                    }),
                                    ImportGenerator.create(
                                        "../../commands/{{ collectionName }}.commands",
                                        {
                                            named: [
                                                NamedImportGenerator.create(
                                                    "create{{collectionName}}Item",
                                                ),
                                                NamedImportGenerator.create(
                                                    "create{{collectionName}}Items",
                                                ),
                                                NamedImportGenerator.create(
                                                    "delete{{collectionName}}Item",
                                                ),
                                                NamedImportGenerator.create(
                                                    "delete{{collectionName}}Items",
                                                ),
                                                NamedImportGenerator.create(
                                                    "read{{collectionName}}Item",
                                                ),
                                                NamedImportGenerator.create(
                                                    "read{{collectionName}}Items",
                                                ),
                                                NamedImportGenerator.create(
                                                    "update{{collectionName}}Item",
                                                ),
                                                NamedImportGenerator.create(
                                                    "update{{collectionName}}Items",
                                                ),
                                                NamedImportGenerator.create(
                                                    "update{{collectionName}}ItemsBatch",
                                                ),
                                                NamedImportGenerator.create(
                                                    "aggregate{{collectionName}}Items",
                                                ),
                                            ],
                                        },
                                    ),
                                ]),
                            ),
                        }),
                    ]),
                ),
                IdentifierGenerator.create(
                    `Bindings<${collection.name}>.Item.exports`,
                    NunjucksConditionGenerator.create({
                        if: NunjucksIfConditionGenerator.create(
                            "collection.is_singleton",
                            IdentifierGenerator.create(
                                `Bindings<${collection.name}>.Item.exports.Singleton`,
                                ClassGenerator.create(
                                    "{{ collectionName }}Singleton",
                                    {
                                        extended: "ChainableBinding",
                                        implemented: [
                                            "TypedCollectionSingletonWrapper<{{ collectionType }}>",
                                        ],
                                        methods: [
                                            MultiLineGenerator.create([
                                                CommentGenerator.create(
                                                    [
                                                        "Reads the {{ collection.name | to_collection_text }} singleton.",
                                                    ],
                                                    {
                                                        forceMultiline: true,
                                                    },
                                                ),
                                                IdentifierGenerator.create(
                                                    `Bindings<${collection.name}>.Item.exports.Singleton.read`,
                                                    ClassMethodGenerator.create(
                                                        {
                                                            isAsync: true,
                                                            generics:
                                                                GenericsTypeGenerator.create(
                                                                    [
                                                                        GenericTypeGenerator.create(
                                                                            {
                                                                                name: "{{ genericQuery }}",
                                                                            },
                                                                        ),
                                                                        GenericTypeGenerator.create(
                                                                            {
                                                                                name: "{{ genericOutput }}",
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                            params: FunctionParamsGenerator.create(
                                                                [
                                                                    FunctionParamGenerator.create(
                                                                        {
                                                                            name: "query",
                                                                            type: "Query",
                                                                            optional:
                                                                                true,
                                                                        },
                                                                    ),
                                                                ],
                                                            ),
                                                            returnType:
                                                                "Promise<{{ applyType }}>",
                                                            body: [
                                                                "let toReturn = this.request(read{{ collectionName }}(query)) as unknown as Promise<{{ applyType }}>;",
                                                            ],
                                                            return: "return toReturn;",
                                                            name: "read" satisfies SingletonMethods,
                                                        },
                                                    ),
                                                ),
                                            ]),
                                            MultiLineGenerator.create([
                                                CommentGenerator.create(
                                                    [
                                                        "Updates the {{ collection.name | to_collection_text }} singleton.",
                                                    ],
                                                    {
                                                        forceMultiline: true,
                                                    },
                                                ),
                                                IdentifierGenerator.create(
                                                    `Bindings<${collection.name}>.Item.exports.Singleton.update`,
                                                    ClassMethodGenerator.create(
                                                        {
                                                            isAsync: true,
                                                            generics:
                                                                GenericsTypeGenerator.create(
                                                                    [
                                                                        GenericTypeGenerator.create(
                                                                            {
                                                                                name: "{{ genericQuery }}",
                                                                            },
                                                                        ),
                                                                        GenericTypeGenerator.create(
                                                                            {
                                                                                name: "{{ genericOutput }}",
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                            params: FunctionParamsGenerator.create(
                                                                [
                                                                    FunctionParamGenerator.create(
                                                                        {
                                                                            name: "patch",
                                                                            type: "Partial<{{ collectionType }}>",
                                                                        },
                                                                    ),
                                                                    FunctionParamGenerator.create(
                                                                        {
                                                                            name: "query",
                                                                            type: "Query",
                                                                            optional:
                                                                                true,
                                                                        },
                                                                    ),
                                                                ],
                                                            ),
                                                            returnType:
                                                                "Promise<{{ applyType }}>",
                                                            body: [
                                                                "let toReturn = this.request(update{{ collectionName }}(patch, query)) as unknown as Promise<{{ applyType }}>;",
                                                            ],
                                                            return: "return toReturn;",
                                                            name: "update" satisfies SingletonMethods,
                                                        },
                                                    ),
                                                ),
                                            ]),
                                        ],
                                    },
                                ),
                            ),
                        ),
                        else: NunjucksElseConditionGenerator.create(
                            MultiLineGenerator.create([
                                IdentifierGenerator.create(
                                    `Bindings<${collection.name}>.Item.exports.Items`,
                                    ClassGenerator.create(
                                        "{{ collectionName }}Items",
                                        {
                                            extended: "ChainableBinding",
                                            implemented: [
                                                "TypedCollectionItemsWrapper<{{ collectionType }}, {{ collectionString }}>",
                                            ],
                                            methods: [
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Creates many items in the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.create`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQueryArray }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutputArray }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "items",
                                                                                type: "Partial<{{ collectionType }}>[]",
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(create{{ collectionName }}Items(items, query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "create" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),

                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Read many items from the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.query`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQuery }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutputArray }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(read{{ collectionName }}Items(query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "query" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Read the first item from the collection matching the query.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.find`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQuery }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutput }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }} | undefined>",
                                                                body: [
                                                                    "let toReturn = this.request(read{{ collectionName }}Items({...query,limit: 1})).then(items => items?.[0]) as unknown as Promise<{{ applyType }} | undefined>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "find" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Update many items in the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.update`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQueryArray }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutputArray }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "keys",
                                                                                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]',
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "patch",
                                                                                type: "Partial<{{ collectionType }}>",
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(update{{ collectionName }}Items(keys, patch, query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "update" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "update many items in the collection with batch",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.updateBatch`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQueryArray }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutputArray }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "items",
                                                                                type: "Partial<Directus.UnpackList<Collections.{{collectionName}}>>[]",
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(update{{ collectionName }}ItemsBatch(items, query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "updateBatch" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Remove many items in the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.remove`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutputVoid }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "keys",
                                                                                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"][] : string[] | number[]',
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(delete{{ collectionName }}Items(keys)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "remove" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Aggregates the items in the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Items.aggregate`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "Options extends Directus.AggregationOptions<Schema, {{ collectionString }}>",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "Output = Directus.AggregationOutput<Schema, {{ collectionString }}, Options>[number]",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "options",
                                                                                type: "Options",
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<Output>",
                                                                body: [
                                                                    "let toReturn = this.request(aggregate{{ collectionName }}Items<Options>(options)).then((a) => a?.[0]) as unknown as Promise<Output>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "aggregate" satisfies ItemsMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                            ],
                                        },
                                    ),
                                ),
                                IdentifierGenerator.create(
                                    `Bindings<${collection.name}>.Item.exports.Item`,
                                    ClassGenerator.create(
                                        "{{ collectionName }}Item",
                                        {
                                            extended: "ChainableBinding",
                                            implemented: [
                                                "TypedCollectionItemWrapper<{{ collectionType }}>",
                                            ],
                                            methods: [
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Create a single item in the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Item.create`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQueryArray }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutput }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "item",
                                                                                type: "Partial<{{ collectionType }}>",
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(create{{ collectionName }}Item(item, query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "create" satisfies ItemMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Read a single item from the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Item.get`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQuery }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutput }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "key",
                                                                                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number',
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(read{{ collectionName }}Item(key, query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "get" satisfies ItemMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Update a single item from the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Item.update`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericQueryArray }}",
                                                                                },
                                                                            ),
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutput }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "key",
                                                                                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number',
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "patch",
                                                                                type: "Partial<{{ collectionType }}>",
                                                                            },
                                                                        ),
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "query",
                                                                                type: "Query",
                                                                                optional:
                                                                                    true,
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(update{{ collectionName }}Item(key, patch, query)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "update" satisfies ItemMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                                MultiLineGenerator.create([
                                                    CommentGenerator.create(
                                                        [
                                                            "Remove a single item in the collection.",
                                                        ],
                                                        {
                                                            forceMultiline:
                                                                true,
                                                        },
                                                    ),
                                                    IdentifierGenerator.create(
                                                        `Bindings<${collection.name}>.Item.exports.Item.remove`,
                                                        ClassMethodGenerator.create(
                                                            {
                                                                isAsync: true,
                                                                generics:
                                                                    GenericsTypeGenerator.create(
                                                                        [
                                                                            GenericTypeGenerator.create(
                                                                                {
                                                                                    name: "{{ genericOutputVoid }}",
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                params: FunctionParamsGenerator.create(
                                                                    [
                                                                        FunctionParamGenerator.create(
                                                                            {
                                                                                name: "key",
                                                                                type: 'Collections.{{collectionName}} extends {id: number | string} ? Collections.{{collectionName}}["id"] : string | number',
                                                                            },
                                                                        ),
                                                                    ],
                                                                ),
                                                                returnType:
                                                                    "Promise<{{ applyType }}>",
                                                                body: [
                                                                    "let toReturn = this.request(delete{{ collectionName }}Item(key)) as unknown as Promise<{{ applyType }}>;",
                                                                ],
                                                                return: "return toReturn;",
                                                                name: "remove" satisfies ItemMethods,
                                                            },
                                                        ),
                                                    ),
                                                ]),
                                            ],
                                        },
                                    ),
                                ),
                            ]),
                        ),
                    }),
                ),
            ]),
            renderer,
            { ...ctx, collection },
        ),
    );
