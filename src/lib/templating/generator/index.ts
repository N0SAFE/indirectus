import {
    ConditionGenerator,
    SwitchConditionGenerator,
} from "./ts/condition.generator";
import {
    FunctionGenerator,
} from "./ts/function.generator";
import { ImportGenerator, NamedImportGenerator } from "./ts/import.generator";

function ln() {
    return console.log("\n");
}

// console.log(wrapInParentheses("return 1;"));
// ln();
// console.log(wrapInBrackets("return 1;"));
// ln();
// console.log(wrapInBraces("return 1;"));
// ln();
// console.log(ObjectGenerator.generate({ a: "1", b: "2" }));
// ln();
// console.log(ArrayGenerator.generate(["1", "2", "3"]));
// ln();
// console.log(StringGenerator.generate("hello", { quote: "single" }));
// ln();
// console.log(StringGenerator.generate("hello", { quote: "double" }));
// ln();
// console.log(StringGenerator.generate("hello", { quote: "backtick" }));
// ln();
// console.log(
//   GenericTypeGenerator.generate({
//     name: "T",
//     extends: "string",
//     default: StringGenerator.generate("number", { asConst: true }),
//   }),
// );
// console.log(
//   GenericsTypeGenerator.generate([
//     { name: "T" },
//     { name: "U", extends: "string" },
//     { name: "V", default: "number" },
//   ]),
// );
// ln();
// console.log(
//   FunctionParamGenerator.generate({
//     name: "a",
//     type: "string",
//     optional: true,
//     defaultValue: "1",
//   }),
// );
// ln();
// console.log(
//   FunctionParamsGenerator.generate([
//     { name: "b", type: "number" },
//     { name: "a", type: "string", optional: true, defaultValue: "1" },
//   ]),
// );
// ln();
// console.log(FunctionGenerator.generate({ body: "return 1;" }));
// ln();
// console.log(FunctionGenerator.generate({ body: "return 1;", isArrow: true }));
// ln();
// console.log(FunctionGenerator.generate({ body: "return 1;", isAsync: true }));
// ln();
// console.log(
//   FunctionGenerator.generate({ body: "return 1;", isGenerator: true }),
// );
// ln();
// console.log(
//   FunctionGenerator.generate({
//     body: "return 1;",
//     isAsync: true,
//     isGenerator: true,
//   }),
// );
// ln();
// console.log(
//   FunctionGenerator.generate({
//     body: "return 1;",
//     isArrow: true,
//     isAsync: true,
//     isGenerator: true,
//   }),
// );
// ln();
// console.log(
//   FunctionGenerator.generate({
//     body: "return 1;",
//     generics: [
//       { name: "T" },
//       { name: "U", extends: "string" },
//       { name: "V", default: "number" },
//     ],
//   }),
// );
// ln();
// console.log(
//   FunctionGenerator.generate({
//     body: "return 1;",
//     params: [
//       { name: "a", type: "string", optional: true, defaultValue: "1" },
//       { name: "b", type: "number" },
//     ],
//   }),
// );
// ln();
// console.log(
//   FunctionGenerator.generate({
//     body: "return 1;",
//     generics: [
//       { name: "T" },
//       { name: "U", extends: "string" },
//       { name: "V", default: "number" },
//     ],
//   }),
// );
// ln();
// console.log(
//   FunctionGenerator.generate({
//     body: "return 1;",
//     params: [
//       { name: "a", type: "string", optional: true, defaultValue: "1" },
//       { name: "b", type: "number" },
//     ],
//   }),
// );
// ln();
// console.log(
//   ClassMethodGenerator.generate({
//     name: "method",
//     generics: [
//       { name: "T" },
//       { name: "U", extends: "string" },
//       { name: "V", default: "number" },
//     ],
//     params: [
//       { name: "a", type: "string", optional: true, defaultValue: "1" },
//       { name: "b", type: "number" },
//     ],
//     body: "return 1;",
//     isAsync: true,
//   }),
// );
// console.log(
//   ClassMethodGenerator.generate({
//     name: "method",
//     generics: [
//       { name: "T" },
//       { name: "U", extends: "string" },
//       { name: "V", default: "number" },
//     ],
//     params: [
//       { name: "a", type: "string", optional: true, defaultValue: "1" },
//       { name: "b", type: "number" },
//     ],
//     body: "return 1;",
//     isAsync: true,
//   }),
// );
// ln();
// console.log(
//   ClassMethodGenerator.generate({
//     name: "method",
//     generics: [
//       { name: "T" },
//       { name: "U", extends: "string" },
//       { name: "V", default: "number" },
//     ],
//     params: [
//       { name: "a", type: "string" },
//       { name: "b", type: "number" },
//     ],
//     body: "return 1;",
//     isAsync: true,
//     isArrow: true,
//   }),
// );
// ln();
// console.log(
//   ClassPropertyGenerator.generate({
//     name: "prop",
//     type: "string",
//     optional: true,
//     defaultValue: "1",
//   }),
// );
// ln();
// console.log(
//   ClassGenerator.generate("Class", {
//     generics: [
//       { name: "T" },
//       { name: "U", extends: "string" },
//       { name: "V", default: "number" },
//     ],
//     properties: [
//       {
//         name: "prop",
//         type: "string",
//         optional: true,
//         defaultValue: StringGenerator.generate("1"),
//       },
//     ],
//     methods: [
//       {
//         name: "asyncMethod",
//         generics: [
//           { name: "T" },
//           { name: "U", extends: "string" },
//           { name: "V", default: "number" },
//         ],
//         params: [
//           { name: "b", type: "number" },
//           { name: "a", type: "string", optional: true },
//         ],
//         body: "return 1;",
//         isAsync: true,
//       },
//       {
//         name: "method",
//         generics: [
//           { name: "T" },
//           { name: "U", extends: "string" },
//           { name: "V", default: "number" },
//         ],
//         params: [
//           { name: "b", type: "number" },
//           { name: "a", type: "string", optional: true },
//         ],
//         body: "return 1;",
//         isArrow: true,
//       },
//       {
//         name: "methodAsyncGenerator",
//         generics: [
//           { name: "T" },
//           { name: "U", extends: "string" },
//           { name: "V", default: "number" },
//         ],
//         params: [
//           { name: "b", type: "number" },
//           { name: "a", type: "string", optional: true },
//         ],
//         body: "return 1;",
//         isAsync: true,
//         isGenerator: true,
//       },
//     ],
//   }),
// );
ln();
console.log(
    ConditionGenerator.generate(
        {
            body: "return 1;",
            condition: "a === 1",
        },
        {
            ifElseConditions: [
                {
                    condition: "a === 2",
                    body: "return 2;",
                },
                {
                    condition: "a === 3",
                    body: "return 3;",
                },
            ],
            elseCondition: {
                body: "return 2;",
            },
        },
    ),
);

ln();
console.log(
    SwitchConditionGenerator.generate("1 === 1", {
        cases: [
            { condition: "1 === 2", body: "return 2;" },
            { condition: "1 === 3", body: "return 3;" },
        ],
    }),
);
ln();
console.log(
    `export ${FunctionGenerator.generate({
        name: "read{{ collectionName }}",
        generics: [
            {
                name: "{{ genericQuery }}",
            },
        ],
        return: "ReturnType<typeof DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>>",
        body: 'return DirectusSDK.readSingleton<Schema, {{ collectionString }}, Query>("{{ collection.name }}", query);',
    })}`,
);
ln();
console.log(
    `${ImportGenerator.create("DirectusSDK", {
        all: true,
        as: "DirectusSDK",
    })}`,
);
ln();
console.log(
    `${ImportGenerator.create("DirectusSDK", {
        all: false,
        default: "DirectusSDK",
        named: [
            NamedImportGenerator.create("readSingleton"),
            NamedImportGenerator.create("Query"),
        ],
    })}`,
);
ln();
console.log(
    `${ImportGenerator.create("DirectusSDK", {
        all: false,
        default: "DirectusSDK",
        named: [
            {
                name: "readSingleton",
                as: "readSingleton",
            },
            {
                name: "Query",
                as: "Query",
            },
        ],
    })}`,
);
ln();
console.log(
    `${ImportGenerator.create("DirectusSDK", {
        all: false,
        default: "DirectusSDK",
        named: [
            {
                name: "readSingleton",
                as: "readSingleton",
            },
            {
                name: "Query",
                as: "Query",
            },
        ],
    })}`,
);
