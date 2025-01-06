import { ArrayGenerator } from "../ts/array.generator";
import { IdentifierGenerator } from "../struct/identifier.generate";
import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class NunjucksIfConditionGenerator<
    Condition extends string = string,
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
    AutoEnd extends boolean = boolean,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private condition: Condition;
    private content: Content;
    private autoEnd: AutoEnd;

    constructor(condition: Condition, content: Content, autoEnd?: AutoEnd) {
        super();
        this.condition = condition;
        this.content = content;
        this.autoEnd = autoEnd ?? (false as AutoEnd);
    }

    setCondition<NewCondition extends string>(condition: NewCondition) {
        const This = this as unknown as NunjucksIfConditionGenerator<
            NewCondition,
            Content,
            AutoEnd
        >;
        This.condition = condition;
        return This;
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as NunjucksIfConditionGenerator<
            Condition,
            NewContent,
            AutoEnd
        >;
        This.content = content;
        return This;
    }

    setAutoEnd<NewAutoEnd extends boolean>(autoEnd: NewAutoEnd) {
        const This = this as unknown as NunjucksIfConditionGenerator<
            Condition,
            Content,
            NewAutoEnd
        >;
        This.autoEnd = autoEnd;
        return This;
    }

    generate() {
        return `{% if ${this.condition} %}${this.content}${this.autoEnd ? "{% endif %}" : ""}`;
    }

    clone() {
        return new NunjucksIfConditionGenerator(
            this.condition,
            this.content,
            this.autoEnd,
        ) as this;
    }

    override getAllChildren() {
        return (this.content instanceof TemplateGenerator
            ? [this.content]
            : []) as unknown as [
            Content extends TemplateGenerator ? Content : never,
        ];
    }

    static create<
        Condition extends string = string,
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AutoEnd extends boolean = false,
    >(condition: Condition, content: Content, autoEnd?: AutoEnd) {
        return new NunjucksIfConditionGenerator(condition, content, autoEnd);
    }

    static generate<
        Condition extends string = string,
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AutoEnd extends boolean = false,
    >(condition: Condition, content: Content, autoEnd?: AutoEnd) {
        return NunjucksIfConditionGenerator.create(
            condition,
            content,
            autoEnd,
        ).generate();
    }
}

export class NunjucksElseIfConditionGenerator<
    Condition extends string = string,
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
    AutoEnd extends boolean = boolean,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private condition: Condition;
    private content: Content;
    private autoEnd: AutoEnd;

    constructor(condition: Condition, content: Content, autoEnd?: AutoEnd) {
        super();
        this.condition = condition;
        this.content = content;
        this.autoEnd = autoEnd ?? (false as AutoEnd);
    }

    setCondition<NewCondition extends string>(condition: NewCondition) {
        const This = this as unknown as NunjucksElseIfConditionGenerator<
            NewCondition,
            Content,
            AutoEnd
        >;
        This.condition = condition;
        return This;
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as NunjucksElseIfConditionGenerator<
            Condition,
            NewContent,
            AutoEnd
        >;
        This.content = content;
        return This;
    }

    setAutoEnd<NewAutoEnd extends boolean>(autoEnd: NewAutoEnd) {
        const This = this as unknown as NunjucksElseIfConditionGenerator<
            Condition,
            Content,
            NewAutoEnd
        >;
        This.autoEnd = autoEnd;
        return This;
    }

    generate() {
        return `{% elseif ${this.condition} %}${this.content}${this.autoEnd ? "{% endif %}" : ""}`;
    }

    clone() {
        return new NunjucksElseIfConditionGenerator(
            this.condition,
            this.content,
            this.autoEnd,
        ) as this;
    }

    override getAllChildren() {
        return (this.content instanceof TemplateGenerator
            ? [this.content]
            : []) as unknown as [
            Content extends TemplateGenerator ? Content : never,
        ];
    }

    static create<
        Condition extends string = string,
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AutoEnd extends boolean = false,
    >(condition: Condition, content: Content, autoEnd?: AutoEnd) {
        return new NunjucksElseIfConditionGenerator(
            condition,
            content,
            autoEnd,
        );
    }

    static generate<
        Condition extends string = string,
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AutoEnd extends boolean = false,
    >(condition: Condition, content: Content, autoEnd?: AutoEnd) {
        return NunjucksElseIfConditionGenerator.create(
            condition,
            content,
            autoEnd,
        ).generate();
    }
}

export class NunjucksElseConditionGenerator<
    Content extends string | TemplateStringGenerator =
        | string
        | TemplateStringGenerator,
    AutoEnd extends boolean = boolean,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private content: Content;
    private autoEnd: AutoEnd;

    constructor(content: Content, autoEnd?: AutoEnd) {
        super();
        this.content = content;
        this.autoEnd = autoEnd ?? (false as AutoEnd);
    }

    setContent<NewContent extends string | TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as NunjucksElseConditionGenerator<
            NewContent,
            AutoEnd
        >;
        This.content = content;
        return This;
    }

    setAutoEnd<NewAutoEnd extends boolean>(autoEnd: NewAutoEnd) {
        const This = this as unknown as NunjucksElseConditionGenerator<
            Content,
            NewAutoEnd
        >;
        This.autoEnd = autoEnd;
        return This;
    }

    generate() {
        return `{% else %}${this.content}${this.autoEnd ? "{% endif %}" : ""}`;
    }

    clone() {
        return new NunjucksElseConditionGenerator(
            this.content,
            this.autoEnd,
        ) as this;
    }

    override getAllChildren() {
        return (this.content instanceof TemplateGenerator
            ? [this.content]
            : []) as unknown as [
            Content extends TemplateGenerator ? Content : never,
        ];
    }

    static create<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AutoEnd extends boolean = false,
    >(content: Content, autoEnd?: AutoEnd) {
        return new NunjucksElseConditionGenerator(content, autoEnd);
    }

    static generate<
        Content extends string | TemplateStringGenerator =
            | string
            | TemplateStringGenerator,
        AutoEnd extends boolean = false,
    >(content: Content, autoEnd?: AutoEnd) {
        return NunjucksElseConditionGenerator.create(
            content,
            autoEnd,
        ).generate();
    }
}

export class NunjucksConditionGenerator<
    IfCondition extends
        NunjucksIfConditionGenerator = NunjucksIfConditionGenerator,
    ElseIfCondition extends
        NunjucksElseIfConditionGenerator = NunjucksElseIfConditionGenerator,
    ElseCondition extends
        NunjucksElseConditionGenerator = NunjucksElseConditionGenerator,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private ifCondition: IfCondition;
    private elseIfConditions?: ElseIfCondition[];
    private elseCondition?: ElseCondition;

    constructor(options: {
        if: IfCondition;
        elseIf?: ElseIfCondition[];
        else?: ElseCondition;
    }) {
        super();
        this.ifCondition = options.if;
        this.elseIfConditions = options.elseIf;
        this.elseCondition = options.else;
    }

    setIfCondition<NewIfCondition extends NunjucksIfConditionGenerator>(
        ifCondition: NewIfCondition,
    ) {
        const This = this as unknown as NunjucksConditionGenerator<
            NewIfCondition,
            ElseIfCondition,
            ElseCondition
        >;
        This.ifCondition = ifCondition;
        return This;
    }

    setElseIfConditions<
        NewElseIfConditions extends NunjucksElseIfConditionGenerator,
    >(elseIfConditions: NewElseIfConditions[]) {
        const This = this as unknown as NunjucksConditionGenerator<
            IfCondition,
            NewElseIfConditions,
            ElseCondition
        >;
        This.elseIfConditions = elseIfConditions;
        return This;
    }

    addElseIfCondition<
        NewElseIfCondition extends NunjucksElseIfConditionGenerator,
    >(elseIfCondition: NewElseIfCondition) {
        if (!this.elseIfConditions) {
            this.elseIfConditions = [];
        }
        const This = this as unknown as NunjucksConditionGenerator<
            IfCondition,
            ElseIfCondition | NewElseIfCondition,
            ElseCondition
        >;
        This.elseIfConditions?.push(
            elseIfCondition as unknown as NewElseIfCondition,
        );
        return This;
    }

    setElseCondition<NewElseCondition extends NunjucksElseConditionGenerator>(
        elseCondition: NewElseCondition,
    ) {
        const This = this as unknown as NunjucksConditionGenerator<
            IfCondition,
            ElseIfCondition,
            NewElseCondition
        >;
        This.elseCondition = elseCondition;
        return This;
    }

    generate() {
        return `${this.ifCondition.setAutoEnd(false)}${this.elseIfConditions?.map((condition) => condition.setAutoEnd(false))?.join("") ?? ""}${this.elseCondition?.setAutoEnd(false) ?? ""}{% endif %}`;
    }

    clone() {
        return new NunjucksConditionGenerator({
            if: this.ifCondition.clone(),
            elseIf: this.elseIfConditions?.map((condition) =>
                condition.clone(),
            ),
            else: this.elseCondition?.clone(),
        }) as this;
    }

    override getAllChildren() {
        return [
            this.ifCondition,
            ...(this.elseIfConditions ?? []),
            ...(this.elseCondition ? [this.elseCondition] : []),
        ];
    }

    static create<
        IfCondition extends
            NunjucksIfConditionGenerator = NunjucksIfConditionGenerator,
        ElseIfCondition extends
            NunjucksElseIfConditionGenerator = NunjucksElseIfConditionGenerator,
        ElseCondition extends
            NunjucksElseConditionGenerator = NunjucksElseConditionGenerator,
    >(options: {
        if: IfCondition;
        elseIf?: ElseIfCondition[];
        else?: ElseCondition;
    }) {
        return new NunjucksConditionGenerator(options);
    }

    static generate<
        IfCondition extends
            NunjucksIfConditionGenerator = NunjucksIfConditionGenerator,
        ElseIfCondition extends
            NunjucksElseIfConditionGenerator = NunjucksElseIfConditionGenerator,
        ElseCondition extends
            NunjucksElseConditionGenerator = NunjucksElseConditionGenerator,
    >(options: {
        if: IfCondition;
        elseIf?: ElseIfCondition[];
        else?: ElseCondition;
    }) {
        return NunjucksConditionGenerator.create(options).generate();
    }
}

const condition = NunjucksConditionGenerator.create({
    if: NunjucksIfConditionGenerator.create(
        "true",
        IdentifierGenerator.create(
            "test",
            ArrayGenerator.create(["1", "2", "3"] as const),
        ),
    ),
    elseIf: [
        NunjucksElseIfConditionGenerator.create(
            "false",
            IdentifierGenerator.create(
                "a",
                ArrayGenerator.create(["4", "5", "6"] as const),
            ),
        ),
    ],
    else: NunjucksElseConditionGenerator.create(
        IdentifierGenerator.create(
            "other",
            ArrayGenerator.create(["7", "8", "9"] as const),
        ),
    ),
});

const a = NunjucksIfConditionGenerator.create(
    "true",
    IdentifierGenerator.create(
        "test",
        ArrayGenerator.create(["1", "2", "3"] as const),
    ),
);
const zzz = a.getAllChildren();

type z = RecursiveGet<ReturnType<(typeof a)["getAllChildren"]>[number]>;

const t = condition.getChildrenByIdentifier("a");
const te = condition.getAllChildren();

const array = ArrayGenerator.create([
    "1",
    "2",
    "3",
    IdentifierGenerator.create(
        "a",
        ArrayGenerator.create(["1", "2", "3"] as const),
    ),
] as const);

const z = array.getChildrenByIdentifier("a");
