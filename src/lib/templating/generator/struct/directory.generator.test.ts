import { describe, expect, it, beforeEach, vi } from "vitest";
import { DirectoryGenerator } from "./directory.generator";
import {
    TemplateStringGenerator,
    TemplateFileGenerator,
    TemplateGenerator,
} from "../utils";
import * as fs from "node:fs";
import * as prettier from "prettier";

vi.mock("node:fs");
vi.mock("prettier");

describe("DirectoryGenerator", () => {
    let generator: DirectoryGenerator;
    let mockStruct: Record<string, TemplateStringGenerator>;
    
    const createFileSpy = vi.spyOn(fs, "writeFileSync");
    
    const unformatedContent = `
        const test =   "test";
    `
    const formatedContent = `const test = "test";`;

    class MockStringGenerator extends TemplateStringGenerator {
        generate() {
            return unformatedContent
        }

        clone(): this {
            throw new Error("Method not implemented.");
        }

        getChildrenByIdentifier(identifier: string): TemplateGenerator[] {
            throw new Error("Method not implemented.");
        }

        getAllChildren(): TemplateGenerator[] {
            throw new Error("Method not implemented.");
        }

        dryRun(basePath: string): Promise<void> {
            throw new Error("Method not implemented.");
        }
    }

    class MockFileGenerator extends TemplateFileGenerator {
        dryRun(basePath: string): Promise<void> {
            throw new Error("Method not implemented.");
        }
        clone(): this {
            throw new Error("Method not implemented.");
        }
        getChildrenByIdentifier(identifier: string): TemplateGenerator[] {
            throw new Error("Method not implemented.");
        }
        getAllChildren(): TemplateGenerator[] {
            throw new Error("Method not implemented.");
        }
        async generate(basePath: string) {
            fs.writeFileSync(basePath, "test content");
        }
    }
    
    beforeEach(() => {
        mockStruct = {
            "test.txt": new MockStringGenerator(),
            "test2.txt": new MockStringGenerator()
        };
        generator = new DirectoryGenerator(mockStruct);
        vi.clearAllMocks();
        vi.mocked(prettier.getFileInfo).mockResolvedValue({ inferredParser: null, ignored: false });
    });

    it("should create files with correct content", async () => {
        await generator.generate("/test");
        expect(createFileSpy).toHaveBeenCalledWith("/test/test.txt", unformatedContent);
        expect(createFileSpy).toHaveBeenCalledWith("/test/test2.txt", unformatedContent);
    });

    // it("should handle nested directories", async () => {
    //     const nestedStruct = {
    //         "dir": new DirectoryGenerator({
    //             "nested.txt": new MockStringGenerator()
    //         })
    //     };
    //     const nestedGenerator = new DirectoryGenerator(nestedStruct);
        
    //     const mkdirSpy = vi.spyOn(fs, "mkdirSync");
    //     await nestedGenerator.generate("/test");
        
    //     expect(mkdirSpy).toHaveBeenCalledWith("/test/dir", { recursive: true });
    //     expect(createFileSpy).toHaveBeenCalledWith("/test/dir/nested.txt", unformatedContent);
    // });

    // it("should format files using prettier when parser is available", async () => {
    //     vi.mocked(prettier.getFileInfo).mockResolvedValue({ inferredParser: "typescript", ignored: false });
    //     vi.mocked(prettier.format).mockResolvedValue(formatedContent);
        
    //     await generator.generate("/test");
        
    //     expect(prettier.format).toHaveBeenCalledWith(unformatedContent, {
    //         parser: "typescript"
    //     });
    //     expect(createFileSpy).toHaveBeenCalledWith("/test/test.txt", formatedContent);
    // });

    // it("should execute dryRun without writing files", async () => {
    //     const consoleSpy = vi.spyOn(console, "log");
        
    //     await generator.dryRun("/test");
        
    //     expect(consoleSpy).toHaveBeenCalledWith("write /test/test.txt");
    //     expect(consoleSpy).toHaveBeenCalledWith("write /test/test2.txt");
    //     expect(createFileSpy).not.toHaveBeenCalled();
    // });
});
