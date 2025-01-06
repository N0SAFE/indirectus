import prettier from "prettier";
import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateFileGenerator,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";
import * as fs from "node:fs";

export class DirectoryGenerator<
    Content extends TemplateStringGenerator | TemplateFileGenerator =
        | TemplateStringGenerator
        | TemplateFileGenerator,
> extends TemplateFileGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier;

    private struct: Record<string, Content>;

    constructor(struct: Record<string, Content>) {
        super();
        this.struct = struct;
    }

    setStruct<
        NewContent extends TemplateStringGenerator | TemplateFileGenerator,
    >(struct: Record<string, NewContent>) {
        const This = this as unknown as DirectoryGenerator<NewContent>;
        This.struct = struct;
        return This;
    }

    async writeFileWithPrettier(path: string, content: string) {
        fs.writeFileSync(path, content);
        const info = await prettier.getFileInfo(path);
        if (info.inferredParser) {
            try {
                fs.writeFileSync(
                    path,
                    await prettier.format(content, {
                        parser: info.inferredParser,
                    }),
                    {
                        flag: "w",
                    },
                );
            } catch (err) {
                console.error(err);
            }
        }
    }

    getAllChildren() {
        return Object.values(this.struct) as Content[];
    }

    async generate(basePath: string) {
        await Promise.all(
            Object.entries(this.struct).map(async ([key, value]) => {
                if (Array.isArray(value)) {
                    for (const item of value) {
                        if (item instanceof TemplateFileGenerator) {
                            fs.mkdirSync(`${basePath}/${key}`);
                            await item.generate(`${basePath}/${key}`);
                        } else {
                            const file = item.generate();
                            await this.writeFileWithPrettier(
                                `${basePath}/${key}`,
                                file,
                            );
                        }
                    }
                } else {
                    if (value instanceof TemplateFileGenerator) {
                        fs.mkdirSync(`${basePath}/${key}`, {
                            recursive: true,
                        });
                        await value.generate(`${basePath}/${key}`);
                    } else {
                        const file = value.generate();
                        await this.writeFileWithPrettier(
                            `${basePath}/${key}`,
                            file,
                        );
                    }
                }
            }),
        );
    }

    async dryRun(basePath: string) {
        await Promise.all(
            Object.entries(this.struct).map(async ([key, value]) => {
                if (Array.isArray(value)) {
                    for (const item of value) {
                        if (item instanceof TemplateFileGenerator) {
                            console.log(`mkdir ${basePath}/${key}`);
                            await item.dryRun(`${basePath}/${key}`);
                        } else {
                            const file = item.generate();
                            console.log(`write ${basePath}/${key}`);
                        }
                    }
                } else {
                    if (value instanceof TemplateFileGenerator) {
                        console.log(`mkdir ${basePath}/${key}`);
                        await value.dryRun(`${basePath}/${key}`);
                    } else {
                        const file = value.generate();
                        console.log(`write ${basePath}/${key}`);
                    }
                }
            }),
        );
    }

    clone() {
        return new DirectoryGenerator({ ...this.struct }) as this;
    }

    static create<
        Content extends TemplateStringGenerator | TemplateFileGenerator =
            | TemplateStringGenerator
            | TemplateFileGenerator,
    >(struct: Record<string, Content>) {
        return new DirectoryGenerator(struct);
    }

    static generate<
        Content extends TemplateStringGenerator | TemplateFileGenerator =
            | TemplateStringGenerator
            | TemplateFileGenerator,
    >(struct: Record<string, Content>, basePath: string) {
        return DirectoryGenerator.create(struct).generate(basePath);
    }
}
