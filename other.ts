import { StructSuperGenerator } from "./src/lib/templating/generator/struct/struct.super";
import {
    getChildrenByIdentifier,
    TemplateGenerator,
} from "./src/lib/templating/generator/utils";

type InferElementType<T> =
    T extends StructSuperGenerator<infer Generate, infer Child>
        ? T extends LoopGenerator<infer U>
            ? InferElementType<U[number]>
            : InferElementType<Child>
        : T;

export class LoopGenerator<
    T extends unknown[] = unknown[],
    // @ts-expect-error
    NormalizedTo extends unknown[] = InferElementType<T[number]>[],
> {
    constructor(private source: T) {}

    loop<Callback extends (variable: T[number]) => unknown>(
        callback: Callback,
    ): LoopGenerator<ReturnType<Callback>[]> {
        return new LoopGenerator(this.source.map((v) => callback(v))) as any;
    }

    normalize(): NormalizedTo {
        return new LoopGenerator(this.flattenSource()).loop((v) => {
            if (v instanceof StructSuperGenerator) {
                const normalized = v.normalize();
                return normalized instanceof LoopGenerator
                    ? normalized.getSource()
                    : normalized;
            }
            return v;
        }) as unknown as NormalizedTo
    }

    private flattenSource(): InferElementType<T[number]>[] {
        return this.source.flatMap((v) =>
            v instanceof LoopGenerator
                ? v.flattenSource()
                : Array.isArray(v)
                  ? [v]
                  : v,
        ) as InferElementType<T[number]>[];
    }

    chain<
        R extends (variable: InferElementType<T[number]>) => unknown,
        NewR extends (variable: ReturnType<R>) => unknown,
    >(callback: NewR): LoopGenerator<ReturnType<NewR>[]> {
        return new LoopGenerator(
            this.flattenSource().map((v) => callback(v)),
        ) as any;
    }

    getSource(): InferElementType<T[number]>[] {
        return this.flattenSource();
    }
}

class CustomGenerator extends TemplateGenerator<string> {
    getChildrenByIdentifier = getChildrenByIdentifier;

    constructor(private value: string) {
        super();
    }

    clone(): this {
        return this;
    }

    generate() {
        return this.value;
    }

    getAllChildren(): never[] {
        return [];
    }
}

class CustomStruct<
    Child extends TemplateGenerator<string>,
> extends StructSuperGenerator<string, Child> {
    constructor(value: Child) {
        super(value);
    }

    generate() {
        return this.onlyChild.generate();
    }
}

// // Exemple avec un tableau simple
// const numbers = [1, 2, 3];
// const simple = new LoopGenerator(numbers, (n: number) => n * 2);

// // Exemple avec un LoopGenerator unique
// const single = new LoopGenerator(simple, (n: number) => n + 1);

// // Exemple avec un tableau de LoopGenerators
// const generator1 = new LoopGenerator([1, 2], (n: number) => n * 2);
// const generator2 = new LoopGenerator([3, 4], (n: number) => n * 2);
// const generators = [generator1, generator2];

// const combined = new LoopGenerator(generators, (n: number) => n + 1);
// console.log(combined.execute()); // [3, 5, 7, 9]

// // Exemple complexe avec imbrication
// const nestedGenerators = [
//     new LoopGenerator([1, 2] as const, (n) => n * 2),
//     new LoopGenerator(
//         [
//             new LoopGenerator([3, 4] as const, (n) => n * 2),
//             new LoopGenerator([5, 6] as const, (n) => n * 2),
//         ],
//         (n) => n,
//     ),
// ] as const;

// const complex = new LoopGenerator(nestedGenerators, (n) =>
//     typeof n === "number" ? n + 1 : n,
// )
//     .resolve()
//     .chain((n) => n.toString())
//     .chain((s) => `${s}!`);

// console.log(complex.execute());
// // ["3!", "5!", "7!", "9!", "11!", "13!"]

// const usersGen1 = new LoopGenerator(
//     [
//         { id: 1, name: "Alice" },
//         { id: 2, name: "Bob" },
//     ] as const,
//     (user) => user,
// );

// const usersGen2 = new LoopGenerator(
//     [
//         { id: 3, name: "Charlie" },
//         { id: 4, name: "David" },
//     ] as const,
//     (user) => user,
// );

// const allUsers = new LoopGenerator([usersGen1, usersGen2], (user) => user.name)
//     .resolve()
//     .chain((name) => name.toUpperCase() as Uppercase<typeof name>);

// console.log(allUsers.execute());
// // ["ALICE", "BOB", "CHARLIE", "DAVID"]

// const nestedStruct = new LoopGenerator([new CustomStruct(2)], (n) => n);

const gen1 = new LoopGenerator(["a", "b", "c"] as const).loop(
    (v) => v.toUpperCase() as Uppercase<typeof v>,
);

const gen2 = new LoopGenerator([new LoopGenerator(["a", "b", "c"])]);

const gen3 = new LoopGenerator([new LoopGenerator(["a", "b", "c"] as const)]);

const gen4 = new LoopGenerator([new CustomStruct(2)]);
console.log(gen4);

const z = gen4.loop((v) => v.normalize());

console.log(z, "z");

const gen5 = new LoopGenerator([
    new CustomStruct(new CustomGenerator(1)),
    new CustomStruct(new LoopGenerator(["a"])),
]);

console.log("gen5", gen5);

const gen6 = new LoopGenerator([1, "2"]);

console.log("gen6", gen6);

const gen7 = new LoopGenerator([
    new LoopGenerator([new LoopGenerator([1, 2, 3] as const)]),
    new LoopGenerator(["a", "b", "c", ["a", "b"]] as const),
]); // after the normalize i want LoopGenerator<(1, 2, 3, "a", "b", "c", ['a', 'b'])[]>

console.log("gen7", gen7);

const inputs = {
    1: gen1,
    2: gen2,
    3: gen3,
    4: gen4,
    5: gen5,
    6: gen6,
    7: gen7,
};

const outputs = {
    1: gen1.normalize(),
    2: gen2.normalize(),
    3: gen3.normalize(),
    4: gen4.normalize(),
    5: gen5.normalize(),
    6: gen6.normalize(),
    7: gen7.normalize(),
};

console.log(inputs);

console.log(outputs);

console.log(new LoopGenerator(["a", "b", "c", ["a", "b"]] as const));
console.log(
    new LoopGenerator([
        "a",
        "b",
        "c",
        new CustomStruct(new LoopGenerator(["naha", "nahb"] as const)),
        // ["a", "b", new LoopGenerator(["no good"] as const)],
        // new LoopGenerator([
        //     "other",
        //     new LoopGenerator(["next"] as const),
        //     new CustomStruct(2 as const),
        // ] as const),
    ] as const).normalize(),
);
