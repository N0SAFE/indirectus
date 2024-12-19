import { StringGenerator } from "./string.generator";
import { TemplateGenerator, wrapInBraces } from "./utils";

// import { TemplateGenerator } from "./TemplateGenerator";
// import * as fs from "node:fs";
// import default, { wrapInBraces } from "./utils";
// import * from '';

export class NamedImportGenerator<
  Name extends string = string,
  As extends string | undefined = undefined,
> extends TemplateGenerator {
  private as?: As;
  private name: Name;

  constructor(name: Name, options?: { as?: As }) {
    super();
    this.as = options?.as;
    this.name = name;
  }

  setAs<NewAs extends string | undefined>(as: NewAs) {
    const This = this as unknown as NamedImportGenerator<Name, NewAs>;
    This.as = as;
    return This;
  }

  setName<NewName extends string>(name: NewName) {
    const This = this as unknown as NamedImportGenerator<NewName, As>;
    This.name = name;
    return This;
  }

  generate() {
    return `${this.name}${this.as ? ` as ${this.as}` : ""}`;
  }

  clone() {
    return new NamedImportGenerator(this.name, { as: this.as }) as this;
  }

  static create<
    Name extends string = string,
    As extends string | undefined = undefined,
  >(name: Name, options?: { as?: As }) {
    return new NamedImportGenerator(name, options);
  }

  static generate<
    Name extends string = string,
    As extends string | undefined = undefined,
  >(name: Name, options?: { as?: As }) {
    return NamedImportGenerator.create(name, options).generate();
  }
}

export type TemplateImportOptions<
  GlobalAll extends boolean = false,
  Type extends GlobalAll extends true ? never : boolean = GlobalAll extends true
    ? never
    : boolean,
  AllAs extends GlobalAll extends true
    ? string | true
    : undefined = GlobalAll extends true ? string | true : undefined,
  Default extends GlobalAll extends false
    ? string
    : undefined = GlobalAll extends false ? string : undefined,
  Named extends GlobalAll extends false
    ? NamedImportGenerator
    : never = GlobalAll extends false ? NamedImportGenerator : never,
> = { all?: GlobalAll; type?: Type } & (GlobalAll extends true
  ? { as: AllAs }
  : {
      default?: Default;
      named?: Named[];
    });

export class ImportGenerator<
  From extends string = string,
  GlobalAll extends boolean = false,
  Type extends GlobalAll extends true ? never : boolean = GlobalAll extends true
    ? never
    : boolean,
  AllAs extends GlobalAll extends true
    ? string | true
    : undefined = GlobalAll extends true ? string | true : undefined,
  Default extends GlobalAll extends false
    ? string
    : undefined = GlobalAll extends false ? string : undefined,
  Named extends GlobalAll extends false
    ? NamedImportGenerator
    : never = GlobalAll extends false ? NamedImportGenerator : never,
> extends TemplateGenerator {
  private from: From; // from 'path'
  private all: GlobalAll;
  private type?: Type;

  private allAs?: AllAs; // if true: import * from ''; if string: import * as from ''; if undefined other option (can't be set if all is false)

  private default?: Default; // import default from 'path' (can't be set if all is true)
  private named: Named[] = [] as Named[]; // import { a, b, c } from 'path' (can't be set if all is true)

  constructor(
    from: From,
    options?: TemplateImportOptions<GlobalAll, Type, AllAs, Default, Named>,
  ) {
    super();
    this.from = from;
    this.type = options?.type ?? (false as Type);
    this.all = options?.all ?? (false as GlobalAll);
    if (options?.all) {
      const Opts = options as { as: AllAs };
      this.allAs = Opts.as;
    } else {
      const Opts = options as {
        default?: Default;
        named?: (
          | Named
          | {
              name: string;
              as?: string;
            }
        )[];
      };
      this.default = Opts?.default;
      this.named = (Opts?.named?.map((named) =>
        named instanceof NamedImportGenerator
          ? named
          : new NamedImportGenerator(named.name, { as: named.as }),
      ) ?? []) as Named[];
    }
  }

  setAll<
    NewGlobalAll extends boolean,
    NewAllAs extends NewGlobalAll extends true ? string | true : undefined,
    NewDefault extends NewGlobalAll extends false ? string : undefined,
    NewNamed extends NewGlobalAll extends false ? NamedImportGenerator : never,
  >(
    all: NewGlobalAll,
    options: NewGlobalAll extends true
      ? { as: NewAllAs }
      : {
          default?: NewDefault;
          named?: (
            | NewNamed
            | {
                name: string;
                as?: string;
              }
          )[];
        },
  ) {
    const This = this as unknown as ImportGenerator<
      From,
      NewGlobalAll,
      NewGlobalAll extends true ? never : boolean,
      NewAllAs,
      NewDefault,
      NewNamed
    >;
    This.all = all;
    if (all) {
      const Opts = options as { as: NewAllAs };
      This.allAs = Opts.as;
    } else {
      const Opts = options as {
        default?: NewDefault;
        named?: (
          | NewNamed
          | {
              name: string;
              as?: string;
            }
        )[];
      };
      This.default = Opts.default;
      This.named = Opts.named?.map((named) =>
        named instanceof NamedImportGenerator
          ? named
          : new NamedImportGenerator(named.name, { as: named.as }),
      ) as NewNamed[];
    }
    return This;
  }

  setType<
    NewType extends GlobalAll extends true
      ? never
      : boolean = GlobalAll extends true ? never : boolean,
  >(type: NewType) {
    const This = this as unknown as ImportGenerator<
      From,
      GlobalAll,
      NewType,
      AllAs,
      Default,
      Named
    >;
    This.type = type;
    return This;
  }

  setFrom<NewFrom extends string>(from: NewFrom) {
    const This = this as unknown as ImportGenerator<
      NewFrom,
      GlobalAll,
      Type,
      AllAs,
      Default,
      Named
    >;
    This.from = from;
    return This;
  }

  generate() {
    if (this.all) {
      return `import ${this.type ? "type " : ""}${this.allAs ? `* as ${this.allAs}` : "*"} from ${new StringGenerator(
        this.from,
        {
          quote: "double",
        },
      )}`;
    } else {
      return `import ${this.type ? "type " : ""}${this.default ? (this.named.length > 0 ? `${this.default}, ` : this.default) : ""}${this.named.length > 0 ? wrapInBraces(this.named.join(", ")) : ""} from ${new StringGenerator(
        this.from,
        {
          quote: "double",
        },
      )}`;
    }
  }

  clone() {
    return new ImportGenerator<From, GlobalAll, Type, AllAs, Default, Named>(
      this.from,
      (this.all
        ? { all: true, type: this.type, as: this.allAs as AllAs }
        : {
            all: false,
            type: this.type,
            default: this.default,
            named: this.named.map((named) => named.clone()),
          }) as unknown as {
        all?: GlobalAll;
        type?: Type;
      } & (GlobalAll extends true
        ? { as: AllAs }
        : {
            default?: Default;
            named?: Named[];
          }),
    ) as this;
  }

  static create<
    From extends string = string,
    GlobalAll extends boolean = false,
    Type extends GlobalAll extends true
      ? never
      : boolean = GlobalAll extends true ? never : boolean,
    AllAs extends GlobalAll extends true
      ? string | true
      : undefined = GlobalAll extends true ? string | true : undefined,
    Default extends GlobalAll extends false
      ? string
      : undefined = GlobalAll extends false ? string : undefined,
    Named extends GlobalAll extends false
      ? NamedImportGenerator
      : never = GlobalAll extends false ? NamedImportGenerator : never,
  >(
    from: From,
    options?: TemplateImportOptions<GlobalAll, Type, AllAs, Default, Named>,
  ) {
    return new ImportGenerator(from, options);
  }

  static generate<
    From extends string = string,
    GlobalAll extends boolean = false,
    Type extends GlobalAll extends true
      ? never
      : boolean = GlobalAll extends true ? never : boolean,
    AllAs extends GlobalAll extends true
      ? string | true
      : undefined = GlobalAll extends true ? string | true : undefined,
    Default extends GlobalAll extends false
      ? string
      : undefined = GlobalAll extends false ? string : undefined,
    Named extends GlobalAll extends false
      ? NamedImportGenerator
      : never = GlobalAll extends false ? NamedImportGenerator : never,
  >(
    from: From,
    options?: TemplateImportOptions<GlobalAll, Type, AllAs, Default, Named>,
  ) {
    return ImportGenerator.create(from, options).generate();
  }
}
