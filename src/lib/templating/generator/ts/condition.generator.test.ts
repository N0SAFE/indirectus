import {
    ConditionGenerator,
    ElseConditionGenerator,
    ElseIfConditionGenerator,
    IfConditionGenerator,
    SwitchConditionGenerator,
} from "./condition.generator";
import { describe, expect, it } from "vitest";

describe("Condition Generators", () => {
    describe("IfConditionGenerator", () => {
        it("should generate if condition", () => {
            const generator = new IfConditionGenerator("x > 0", "return true");
            expect(generator.generate()).toBe("if (x > 0) {\nreturn true\n}");
        });

        it("should set new condition", () => {
            const generator = new IfConditionGenerator(
                "x > 0",
                "return true",
            ).setCondition("y < 10");
            expect(generator.generate()).toBe("if (y < 10) {\nreturn true\n}");
        });

        it("should set new body", () => {
            const generator = new IfConditionGenerator(
                "x > 0",
                "return true",
            ).setBody("return false");
            expect(generator.generate()).toBe("if (x > 0) {\nreturn false\n}");
        });
    });

    describe("ElseIfConditionGenerator", () => {
        it("should generate else if condition", () => {
            const generator = new ElseIfConditionGenerator(
                "x < 0",
                "return false",
            );
            expect(generator.generate()).toBe(
                "else if (x < 0) {\nreturn false\n}",
            );
        });
    });

    describe("ElseConditionGenerator", () => {
        it("should generate else condition", () => {
            const generator = new ElseConditionGenerator("return null");
            expect(generator.generate()).toBe("else {\nreturn null\n}");
        });
    });

    describe("SwitchConditionGenerator", () => {
        it("should generate switch statement", () => {
            const generator = new SwitchConditionGenerator("value", {
                cases: [
                    { condition: '"A"', body: "return 1" },
                    { condition: '"B"', body: "return 2" },
                ],
                defaultCase: "return 0",
            });

            expect(generator.generate()).toBe(
                'switch (value) {\ncase "A": \nreturn 1;\nbreak;\n\ncase "B": \nreturn 2;\nbreak;\n\ndefault: {\nreturn 0\n\n',
            );
        });

        it("should add cases", () => {
            const generator = new SwitchConditionGenerator("value")
                .addCase({ condition: '"A"', body: "return 1" })
                .addCase({ condition: '"B"', body: "return 2" });

            expect(generator.generate()).toBe(
                'switch (value) {\ncase "A": \nreturn 1;\nbreak;\n\ncase "B": \nreturn 2;\nbreak;\n\n\n',
            );
        });
    });

    describe("ConditionGenerator", () => {
        it("should generate complete if-else chain", () => {
            const generator = new ConditionGenerator(
                { condition: "x > 0", body: 'return "positive"' },
                {
                    ifElseConditions: [
                        { condition: "x < 0", body: 'return "negative"' },
                    ],
                    elseCondition: { body: 'return "zero"' },
                },
            );

            expect(generator.generate()).toBe(
                'if (x > 0) {\nreturn "positive"\n}else if (x < 0) {\nreturn "negative"\n}else {\nreturn "zero"\n}',
            );
        });

        it("should allow adding else-if conditions", () => {
            const generator = new ConditionGenerator({
                condition: "x > 10",
                body: 'return "big"',
            })
                .addIfElseCondition({
                    condition: "x > 5",
                    body: 'return "medium"',
                })
                .setElseCondition({ body: 'return "small"' });

            expect(generator.generate()).toBe(
                'if (x > 10) {\nreturn "big"\n}else if (x > 5) {\nreturn "medium"\n}else {\nreturn "small"\n}',
            );
        });


    });
});
