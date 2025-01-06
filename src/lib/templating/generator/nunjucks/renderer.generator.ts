import { TemplateLoader } from "@/types/template-loader";
import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";
import { TemplateRenderer } from "@/types/template";

export class NunjucksRendererGenerator<
    Ctx extends Record<string, unknown> = Record<string, unknown>,
    Content extends TemplateStringGenerator = TemplateStringGenerator,
    Renderer extends TemplateRenderer = TemplateRenderer,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    constructor(
        private content: Content,
        private renderer: Renderer,
        private context?: Ctx,
    ) {
        super();
    }

    setContext<NewCtx extends Record<string, unknown>>(context: NewCtx) {
        const This = this as unknown as NunjucksRendererGenerator<
            NewCtx,
            Content
        >;
        This.context = context;
        return This;
    }

    setContent<NewContent extends TemplateStringGenerator>(
        content: NewContent,
    ) {
        const This = this as unknown as NunjucksRendererGenerator<
            Ctx,
            NewContent
        >;
        This.content = content;
        return This;
    }

    setRenderer<NewRenderer extends TemplateRenderer>(renderer: NewRenderer) {
        const This = this as unknown as NunjucksRendererGenerator<
            Ctx,
            Content,
            NewRenderer
        >;
        This.renderer = renderer;
        return This;
    }

    clone() {
        return new NunjucksRendererGenerator(
            this.content.clone(),
            this.renderer,
            this.context,
        ) as this;
    }

    generate() {
        return this.renderer.fromString(this.content.generate(), this.context);
    }

    override getAllChildren() {
        return (this.content instanceof TemplateGenerator
            ? [this.content]
            : []) as unknown as [
            Content extends TemplateGenerator ? Content : never,
        ];
    }

    static create<
        Ctx extends Record<string, unknown>,
        Content extends TemplateStringGenerator,
        Renderer extends TemplateRenderer,
    >(content: Content, renderer: Renderer, context?: Ctx) {
        return new NunjucksRendererGenerator(content, renderer, context);
    }

    static generate<
        Ctx extends Record<string, unknown>,
        Content extends TemplateStringGenerator,
        Renderer extends TemplateRenderer,
    >(content: Content, renderer: Renderer, context?: Ctx) {
        return new NunjucksRendererGenerator(
            content,
            renderer,
            context,
        ).generate();
    }
}
