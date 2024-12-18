import { StringGenerator } from "./string.generator";
import { TemplateGenerator, wrapInBraces } from "./utils";

// import { TemplateGenerator } from "./TemplateGenerator";
// import * as fs from "node:fs";
// import default, { wrapInBraces } from "./utils";
// import * from '';

export class NamedImportGenerator extends TemplateGenerator {
  private as?: string;
  private name: string;

  constructor(name: string, options?: { as?: string }) {
    super();
    this.as = options?.as;
    this.name = name;
  }

  generate() {
    return `${this.name}${this.as ? ` as ${this.as}` : ""}`;
  }

  static create(name: string, options?: { as?: string }) {
    return new NamedImportGenerator(name, options);
  }

  static generate(name: string, options?: { as?: string }) {
    return NamedImportGenerator.create(name, options).generate();
  }
}

export class ImportGenerator<
  GlobalAll extends boolean = boolean,
> extends TemplateGenerator {
  private from: string; // from 'path'
  private all: GlobalAll;
  private type?: boolean;

  private allAs?: string | true; // if true: import * from ''; if string: import * as from ''; if undefined other option (can't be set if all is false)

  private default?: string; // import default from 'path' (can't be set if all is true)
  private named: NamedImportGenerator[] = []; // import { a, b, c } from 'path' (can't be set if all is true)

  constructor(
    from: string,
    options?: { all?: GlobalAll; type?: boolean } & (GlobalAll extends true
      ? { as: string | true }
      : {
          default?: string;
          named?: (
            | NamedImportGenerator
            | {
                name: string;
                as?: string;
              }
          )[];
        }),
  ) {
    super();
    this.from = from;
    this.type = options?.type ?? false;
    this.all = options?.all ?? (false as GlobalAll);
    if (options?.all) {
      const Opts = options as { as: string | true };
      this.allAs = Opts.as;
    } else {
      const Opts = options as {
        default?: string;
        named?: (
          | NamedImportGenerator
          | {
              name: string;
              as?: string;
            }
        )[];
      };
      this.default = Opts?.default;
      this.named =
        Opts?.named?.map((named) =>
          named instanceof NamedImportGenerator
            ? named
            : new NamedImportGenerator(named.name, { as: named.as }),
        ) ?? [];
    }
  }

  setAll<All extends GlobalAll>(
    all: All,
    options: All extends true
      ? { as: string | true }
      : { default?: string; named?: NamedImportGenerator[] },
  ) {
    this.all = all;
    if (all) {
      const Opts = options as { as: string | true };
      this.allAs = Opts.as;
    } else {
      const Opts = options as {
        default?: string;
        named?: NamedImportGenerator[];
      };
      this.default = Opts.default;
      this.named = Opts.named ?? [];
    }
    return this;
  }

  setType(type: boolean) {
    this.type = type;
    return this;
  }

  setFrom(from: string) {
    this.from = from;
    return this;
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

  static create<GlobalAll extends boolean>(
    from: string,
    options?: { all?: GlobalAll; type?: boolean } & (GlobalAll extends true
      ? { as: string | true }
      : {
          default?: string;
          named?: (
            | NamedImportGenerator
            | {
                name: string;
                as?: string;
              }
          )[];
        }),
  ) {
    return new ImportGenerator(from, options);
  }

  static generate<GlobalAll extends boolean>(
    from: string,
    options?: { all?: GlobalAll; type?: boolean } & (GlobalAll extends true
      ? { as: string | true }
      : {
          default?: string;
          named?: (
            | NamedImportGenerator
            | {
                name: string;
                as?: string;
              }
          )[];
        }),
  ) {
    return ImportGenerator.create(from, options).generate();
  }
}
