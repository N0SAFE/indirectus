import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class CommentGenerator<
    Content extends string = string,
    ForceMultiline extends boolean = boolean,
    ForceComment extends boolean = boolean,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    private contents = [] as Content[];
    private forceMultiline = false as ForceMultiline;
    private forceComment = false as ForceComment;

    constructor(
        contents: Content[] = [],
        options?: {
            forceMultiline?: ForceMultiline;
            forceComment?: ForceComment;
        },
    ) {
        super();
        this.contents = contents;
        this.forceMultiline =
            options?.forceMultiline ?? (false as ForceMultiline);
        this.forceComment = options?.forceComment ?? (false as ForceComment);
    }

    setContents<NewContent extends string>(contents: NewContent[]) {
        const This = this as unknown as CommentGenerator<
            NewContent,
            ForceMultiline,
            ForceComment
        >;
        This.contents = contents;
        return This;
    }

    addContent<NewContent extends string>(content: NewContent) {
        const This = this as unknown as CommentGenerator<
            NewContent,
            ForceMultiline,
            ForceComment
        >;
        This.contents.push(content);
        return This;
    }

    setForceMultiline<NewForceMultiline extends boolean>(
        forceMultiline: NewForceMultiline,
    ) {
        const This = this as unknown as CommentGenerator<
            Content,
            NewForceMultiline,
            ForceComment
        >;
        This.forceMultiline = forceMultiline;
        return This;
    }

    setForceComment<NewForceComment extends boolean>(
        forceComment: NewForceComment,
    ) {
        const This = this as unknown as CommentGenerator<
            Content,
            ForceMultiline,
            NewForceComment
        >;
        This.forceComment = forceComment;
        return This;
    }

    generate() {
        return this.contents.length === 0
            ? this.forceComment
                ? this.forceMultiline
                    ? "/** */"
                    : "//"
                : ""
            : this.contents.length === 1 && !this.forceMultiline
              ? `// ${this.contents[0]}`
              : `/**\n${this.contents.map((content) => ` * ${content}`).join("\n* ")}\n */`;
    }

    clone() {
        return new CommentGenerator([...this.contents], {
            forceMultiline: this.forceMultiline,
            forceComment: this.forceComment,
        }) as this;
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<
        Content extends string = string,
        ForceMultiline extends boolean = boolean,
        ForceComment extends boolean = boolean,
    >(
        contents: Content[] = [],
        options?: {
            forceMultiline?: ForceMultiline;
            forceComment?: ForceComment;
        },
    ) {
        return new CommentGenerator(contents, options);
    }

    static generate<
        Content extends string = string,
        ForceMultiline extends boolean = boolean,
        ForceComment extends boolean = boolean,
    >(
        contents: Content[] = [],
        options?: {
            forceMultiline?: ForceMultiline;
            forceComment?: ForceComment;
        },
    ) {
        return CommentGenerator.create(contents, options).generate();
    }
}
