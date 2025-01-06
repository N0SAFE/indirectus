import {
    getChildrenByIdentifier,
    RecursiveGet,
    TemplateGenerator,
    TemplateStringGenerator,
} from "../utils";

export class NunjucksVariableGenerator<
    Name extends string = string,
    Value extends string = string,
> extends TemplateStringGenerator {
    getChildrenByIdentifier = getChildrenByIdentifier
    
    constructor(
        private name: Name,
        private value: Value,
    ) {
        super();
    }

    setName<NewName extends string>(name: NewName) {
        const This = this as unknown as NunjucksVariableGenerator<
            NewName,
            Value
        >;
        This.name = name;
        return This;
    }

    setValue<NewValue extends string>(value: NewValue) {
        const This = this as unknown as NunjucksVariableGenerator<
            Name,
            NewValue
        >;
        This.value = value;
        return This;
    }

    generate() {
        return `{% set ${this.name} = ${this.value} %}`;
    }

    clone() {
        return new NunjucksVariableGenerator(this.name, this.value) as this;
    }

    override getAllChildren() {
        return [] as never[];
    }

    static create<Name extends string = string, Value extends string = string>(
        name: Name,
        value: Value,
    ) {
        return new NunjucksVariableGenerator(name, value);
    }
}
