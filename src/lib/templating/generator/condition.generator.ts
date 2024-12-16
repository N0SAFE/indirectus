import { TemplateGenerator } from "./utils";

export class IfConditionGenerator extends TemplateGenerator {
  private condition = "";
  private body = "";

  constructor(condition: string, body: string) {
    super();
    this.condition = condition;
    this.body = body;
  }

  setCondition(condition: string) {
    this.condition = condition;
    return this;
  }

  setBody(body: string) {
    this.body = body;
    return this;
  }

  generate() {
    return `if (${this.condition}) {\n${this.body}\n}`;
  }
}

export class ElseIfConditionGenerator extends TemplateGenerator {
  private condition = "";
  private body = "";

  constructor(condition: string, body: string) {
    super();
    this.condition = condition;
    this.body = body;
  }

  setCondition(condition: string) {
    this.condition = condition;
    return this;
  }

  setBody(body: string) {
    this.body = body;
    return this;
  }

  generate() {
    return `else if (${this.condition}) {\n${this.body}\n}`;
  }

  static create(condition: string, body: string) {
    return new ElseIfConditionGenerator(condition, body);
  }

  static generate(condition: string, body: string) {
    return ElseIfConditionGenerator.create(condition, body).generate();
  }
}

export class ElseConditionGenerator extends TemplateGenerator {
  private body = "";

  constructor(body: string) {
    super();
    this.body = body;
  }

  setBody(body: string) {
    this.body = body;
    return this;
  }

  generate() {
    return `else {\n${this.body}\n}`;
  }

  static create(body: string) {
    return new ElseConditionGenerator(body);
  }

  static generate(body: string) {
    return ElseConditionGenerator.create(body).generate();
  }
}

export class SwitchConditionGenerator extends TemplateGenerator {
  private condition = "";
  private cases: {
    condition: string;
    body: string;
  }[] = [];
  private defaultCase?: string = "";

  constructor(
    condition: string,
    options?: {
      cases?: { condition: string; body: string }[];
      defaultCase?: string;
    },
  ) {
    0;
    super();
    this.condition = condition;
    this.cases = options?.cases ?? [];
    this.defaultCase = options?.defaultCase;
  }

  setCondition(condition: string) {
    this.condition = condition;
    return this;
  }

  addCase(condition: string, body: string) {
    this.cases.push({ condition, body });
    return this;
  }

  setDefaultCase(body: string) {
    this.defaultCase = body;
    return this;
  }

  generate() {
    return `switch (${this.condition}) {\n${this.cases
      .map(({ condition, body }) => `case ${condition}: \n${body};\nbreak;\n`)
      .join(
        "\n",
      )}\n${this.defaultCase ? `default: {\n${this.defaultCase}\n` : ""}\n`;
  }

  static create(
    condition: string,
    options?: {
      cases?: { condition: string; body: string }[];
      defaultCase?: string;
    },
  ) {
    return new SwitchConditionGenerator(condition, options);
  }

  static generate(
    condition: string,
    options?: {
      cases?: { condition: string; body: string }[];
      defaultCase?: string;
    },
  ) {
    return SwitchConditionGenerator.create(condition, options).generate();
  }
}

export class ConditionGenerator extends TemplateGenerator {
  private ifCondition: IfConditionGenerator;
  private ifElseConditions?: ElseIfConditionGenerator[];
  private elseCondition?: ElseConditionGenerator;

  constructor(
    ifCondition: IfConditionGenerator | { condition: string; body: string },
    options?: {
      ifElseConditions?:
        | ElseIfConditionGenerator[]
        | { condition: string; body: string }[];
      elseCondition?:
        | ElseConditionGenerator
        | {
            body: string;
          };
    },
  ) {
    super();
    this.ifCondition =
      ifCondition instanceof IfConditionGenerator
        ? ifCondition
        : new IfConditionGenerator(ifCondition.condition, ifCondition.body);
    this.ifElseConditions =
      options?.ifElseConditions?.map((condition) =>
        condition instanceof ElseIfConditionGenerator
          ? condition
          : new ElseIfConditionGenerator(condition.condition, condition.body),
      ) ?? [];
    this.elseCondition = options?.elseCondition
      ? options?.elseCondition instanceof ElseConditionGenerator
        ? options?.elseCondition
        : new ElseConditionGenerator(options?.elseCondition?.body || "")
      : undefined;
  }

  setIfCondition(condition: string, body: string) {
    this.ifCondition = new IfConditionGenerator(condition, body);
    return this;
  }

  setIfElseConditions(conditions: { condition: string; body: string }[]) {
    this.ifElseConditions = conditions.map(
      ({ condition, body }) => new ElseIfConditionGenerator(condition, body),
    );
    return this;
  }

  setElseCondition(body: string) {
    this.elseCondition = new ElseConditionGenerator(body);
    return this;
  }

  addIfElseCondition(condition: string, body: string) {
    if (!this.ifElseConditions) {
      this.ifElseConditions = [];
    }
    this.ifElseConditions.push(new ElseIfConditionGenerator(condition, body));
    return this;
  }

  generate() {
    return `${this.ifCondition.generate()}${this.ifElseConditions?.map((condition) => condition.generate() || []).join("")}${this.elseCondition?.generate() ?? ""}`;
  }

  static create(
    ifCondition: IfConditionGenerator | { condition: string; body: string },
    options?: {
      ifElseConditions?:
        | ElseIfConditionGenerator[]
        | { condition: string; body: string }[];
      elseCondition?:
        | ElseConditionGenerator
        | {
            body: string;
          };
    },
  ) {
    return new ConditionGenerator(ifCondition, options);
  }

  static generate(
    ifCondition: IfConditionGenerator | { condition: string; body: string },
    options?: {
      ifElseConditions?:
        | ElseIfConditionGenerator[]
        | { condition: string; body: string }[];
      elseCondition?:
        | ElseConditionGenerator
        | {
            body: string;
          };
    },
  ) {
    return ConditionGenerator.create(ifCondition, options).generate();
  }
}
