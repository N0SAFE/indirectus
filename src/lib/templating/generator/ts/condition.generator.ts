import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class IfConditionGenerator<
    Condition extends string = string,
    Body extends string = string,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private condition = "" as Condition;
    private body = "" as Body;

    constructor(condition: Condition, body: Body) {
        super();
        this.condition = condition;
        this.body = body;
    }

    setCondition<NewCondition extends string = string>(
        condition: NewCondition,
    ) {
        const This = this as unknown as IfConditionGenerator<
            NewCondition,
            Body
        >;
        This.condition = condition;
        return This;
    }

    setBody<NewBody extends string = string>(body: NewBody) {
        const This = this as unknown as IfConditionGenerator<
            Condition,
            NewBody
        >;
        This.body = body;
        return This;
    }

    generate() {
        return `if (${this.condition}) {\n${this.body}\n}`;
    }

    clone() {
        return new IfConditionGenerator(this.condition, this.body) as this;
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<
        Condition extends string = string,
        Body extends string = string,
    >(condition: Condition, body: Body) {
        return new IfConditionGenerator(condition, body);
    }

    static generate<
        Condition extends string = string,
        Body extends string = string,
    >(condition: Condition, body: Body) {
        return IfConditionGenerator.create(condition, body).generate();
    }
}

export class ElseIfConditionGenerator<
    Condition extends string = string,
    Body extends string = string,
> extends TemplateStringGenerator {
    private condition = "" as Condition;
    private body = "" as Body;

    constructor(condition: Condition, body: Body) {
        super();
        this.condition = condition;
        this.body = body;
    }

    setCondition<NewCondition extends string = string>(
        condition: NewCondition,
    ) {
        const This = this as unknown as ElseIfConditionGenerator<
            NewCondition,
            Body
        >;
        This.condition = condition;
        return This;
    }

    setBody<NewBody extends string = string>(body: NewBody) {
        const This = this as unknown as ElseIfConditionGenerator<
            Condition,
            NewBody
        >;
        This.body = body;
        return This;
    }

    generate() {
        return `else if (${this.condition}) {\n${this.body}\n}`;
    }

    clone() {
        return new ElseIfConditionGenerator(this.condition, this.body) as this;
    }

    override getChildrenByIdentifier<
        Identifier extends keyof RecursiveGet<
            Extract<
                ReturnType<this["getAllChildren"]>[number],
                TemplateGenerator
            >
        >,
    >(identifier: Identifier) {
        return this.getAllChildren() as unknown as RecursiveGet<
            ReturnType<this["getAllChildren"]>[number] extends TemplateGenerator
                ? ReturnType<this["getAllChildren"]>[number]
                : never
        >[Identifier][];
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<
        Condition extends string = string,
        Body extends string = string,
    >(condition: Condition, body: Body) {
        return new ElseIfConditionGenerator(condition, body);
    }

    static generate<
        Condition extends string = string,
        Body extends string = string,
    >(condition: Condition, body: Body) {
        return ElseIfConditionGenerator.create(condition, body).generate();
    }
}

export class ElseConditionGenerator<
    Body extends string = string,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private body = "" as Body;

    constructor(body: Body) {
        super();
        this.body = body;
    }

    setBody<NewBody extends string = string>(body: NewBody) {
        const This = this as unknown as ElseConditionGenerator<NewBody>;
        This.body = body;
        return This;
    }

    generate() {
        return `else {\n${this.body}\n}`;
    }

    clone() {
        return new ElseConditionGenerator(this.body) as this;
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<Body extends string = string>(body: Body) {
        return new ElseConditionGenerator(body);
    }

    static generate<Body extends string = string>(body: Body) {
        return ElseConditionGenerator.create(body).generate();
    }
}

export class SwitchConditionGenerator<
    Condition extends string = string,
    Case extends { condition: string; body: string } = {
        condition: string;
        body: string;
    },
    Default extends string = string,
> extends TemplateStringGenerator {
    private condition = "" as Condition;
    private cases: {
        condition: string;
        body: string;
    }[] = [] as Case[];
    private defaultCase? = "" as Default;

    constructor(
        condition: Condition,
        options?: {
            cases?: Case[];
            defaultCase?: Default;
        },
    ) {
        super();
        this.condition = condition;
        this.cases = options?.cases ?? [];
        this.defaultCase = options?.defaultCase;
    }

    setCondition<NewCondition extends string = string>(
        condition: NewCondition,
    ) {
        const This = this as unknown as SwitchConditionGenerator<
            NewCondition,
            Case,
            Default
        >;
        This.condition = condition;
        return This;
    }

    addCase<
        NewCase extends { condition: string; body: string } = {
            condition: string;
            body: string;
        },
    >(newCase: NewCase) {
        const This = this as unknown as SwitchConditionGenerator<
            Condition,
            Case | NewCase,
            Default
        >;
        This.cases.push(newCase);
        return This;
    }

    setDefaultCase<NewDefault extends string = string>(body: NewDefault) {
        const This = this as unknown as SwitchConditionGenerator<
            Condition,
            Case,
            NewDefault
        >;
        This.defaultCase = body;
        return This;
    }

    generate() {
        return `switch (${this.condition}) {\n${this.cases
            .map(
                ({ condition, body }) =>
                    `case ${condition}: \n${body};\nbreak;\n`,
            )
            .join(
                "\n",
            )}\n${this.defaultCase ? `default: {\n${this.defaultCase}\n` : ""}\n`;
    }

    clone() {
        return new SwitchConditionGenerator(this.condition, {
            cases: this.cases.map(({ condition, body }) => ({
                condition,
                body,
            })),
            defaultCase: this.defaultCase,
        }) as this;
    }

    override getChildrenByIdentifier<
        Identifier extends keyof RecursiveGet<
            Extract<
                ReturnType<this["getAllChildren"]>[number],
                TemplateGenerator
            >
        >,
    >(identifier: Identifier) {
        return this.getAllChildren() as unknown as RecursiveGet<
            ReturnType<this["getAllChildren"]>[number] extends TemplateGenerator
                ? ReturnType<this["getAllChildren"]>[number]
                : never
        >[Identifier][];
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<
        Condition extends string = string,
        Case extends { condition: string; body: string } = {
            condition: string;
            body: string;
        },
        Default extends string = string,
    >(
        condition: Condition,
        options?: {
            cases?: Case[];
            defaultCase?: Default;
        },
    ) {
        return new SwitchConditionGenerator(condition, options);
    }

    static generate<
        Condition extends string = string,
        Case extends { condition: string; body: string } = {
            condition: string;
            body: string;
        },
        Default extends string = string,
    >(
        condition: Condition,
        options?: {
            cases?: Case[];
            defaultCase?: Default;
        },
    ) {
        return SwitchConditionGenerator.create(condition, options).generate();
    }
}

export class ConditionGenerator<
    IfCondition extends IfConditionGenerator = IfConditionGenerator,
    ElseIfCondition extends ElseIfConditionGenerator = ElseIfConditionGenerator,
    ElseCondition extends ElseConditionGenerator = ElseConditionGenerator,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private ifCondition: IfCondition;
    private ifElseConditions?: ElseIfCondition[];
    private elseCondition?: ElseCondition;

    constructor(
        ifCondition: IfCondition | { condition: string; body: string },
        options?: {
            ifElseConditions?:
                | ElseIfCondition[]
                | { condition: string; body: string }[];
            elseCondition?:
                | ElseCondition
                | {
                      body: string;
                  };
        },
    ) {
        super();
        this.ifCondition =
            ifCondition instanceof IfConditionGenerator
                ? ifCondition
                : (new IfConditionGenerator(
                      ifCondition.condition,
                      ifCondition.body,
                  ) as IfCondition);
        this.ifElseConditions = (options?.ifElseConditions?.map((condition) =>
            condition instanceof ElseIfConditionGenerator
                ? condition
                : new ElseIfConditionGenerator(
                      condition.condition,
                      condition.body,
                  ),
        ) ?? []) as ElseIfCondition[];
        this.elseCondition = options?.elseCondition
            ? options?.elseCondition instanceof ElseConditionGenerator
                ? options?.elseCondition
                : (new ElseConditionGenerator(
                      options?.elseCondition?.body || "",
                  ) as ElseCondition)
            : undefined;
    }

    setIfCondition<
        NewIfCondition extends IfConditionGenerator = IfConditionGenerator,
    >(condition: NewIfCondition | { condition: string; body: string }) {
        const This = this as unknown as ConditionGenerator<
            NewIfCondition,
            ElseIfCondition,
            ElseCondition
        >;
        This.ifCondition =
            condition instanceof IfConditionGenerator
                ? condition
                : (new IfConditionGenerator(
                      condition.condition,
                      condition.body,
                  ) as NewIfCondition);
        return this;
    }

    setIfElseConditions<
        NewElseIfCondition extends
            ElseIfConditionGenerator = ElseIfConditionGenerator,
    >(
        conditions: (
            | NewElseIfCondition
            | { condition: string; body: string }
        )[],
    ) {
        const This = this as unknown as ConditionGenerator<
            IfCondition,
            NewElseIfCondition,
            ElseCondition
        >;
        This.ifElseConditions = conditions.map((condition) =>
            condition instanceof ElseIfConditionGenerator
                ? condition
                : new ElseIfConditionGenerator(
                      condition.condition,
                      condition.body,
                  ),
        ) as NewElseIfCondition[];
        return This;
    }

    setElseCondition<
        NewElseCondition extends
            ElseConditionGenerator = ElseConditionGenerator,
    >(body: NewElseCondition | { body: string }) {
        const This = this as unknown as ConditionGenerator<
            IfCondition,
            ElseIfCondition,
            NewElseCondition
        >;
        This.elseCondition =
            body instanceof ElseConditionGenerator
                ? body
                : (new ElseConditionGenerator(body.body) as NewElseCondition);
        return This;
    }

    addIfElseCondition<
        NewElseIfCondition extends
            ElseIfConditionGenerator = ElseIfConditionGenerator,
    >(condition: NewElseIfCondition | { condition: string; body: string }) {
        const This = this as unknown as ConditionGenerator<
            IfCondition,
            NewElseIfCondition | ElseIfCondition,
            ElseCondition
        >;
        if (!This.ifElseConditions) {
            This.ifElseConditions = [];
        }
        This.ifElseConditions.push(
            condition instanceof ElseIfConditionGenerator
                ? condition
                : (new ElseIfConditionGenerator(
                      condition.condition,
                      condition.body,
                  ) as NewElseIfCondition),
        );
        return This;
    }

    generate() {
        return `${this.ifCondition.generate()}${this.ifElseConditions?.map((condition) => condition.generate() || []).join("")}${this.elseCondition?.generate() ?? ""}`;
    }

    clone() {
        return new ConditionGenerator(this.ifCondition.clone(), {
            ifElseConditions: this.ifElseConditions?.map((condition) =>
                condition.clone(),
            ),
            elseCondition: this.elseCondition?.clone(),
        }) as this;
    }

    override getAllChildren() {
        return [
            this.ifCondition,
            ...(this.ifElseConditions ?? []),
            ...(this.elseCondition ? [this.elseCondition] : []),
        ] as (IfCondition | ElseIfCondition | ElseCondition)[];
    }

    static create<
        IfCondition extends IfConditionGenerator = IfConditionGenerator,
        ElseIfCondition extends
            ElseIfConditionGenerator = ElseIfConditionGenerator,
        ElseCondition extends ElseConditionGenerator = ElseConditionGenerator,
    >(
        ifCondition: IfCondition | { condition: string; body: string },
        options?: {
            ifElseConditions?:
                | ElseIfCondition[]
                | { condition: string; body: string }[];
            elseCondition?:
                | ElseCondition
                | {
                      body: string;
                  };
        },
    ) {
        return new ConditionGenerator(ifCondition, options);
    }

    static generate<
        IfCondition extends IfConditionGenerator = IfConditionGenerator,
        ElseIfCondition extends
            ElseIfConditionGenerator = ElseIfConditionGenerator,
        ElseCondition extends ElseConditionGenerator = ElseConditionGenerator,
    >(
        ifCondition: IfCondition | { condition: string; body: string },
        options?: {
            ifElseConditions?:
                | ElseIfCondition[]
                | { condition: string; body: string }[];
            elseCondition?:
                | ElseCondition
                | {
                      body: string;
                  };
        },
    ) {
        return ConditionGenerator.create(ifCondition, options).generate();
    }
}
