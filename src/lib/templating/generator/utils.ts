export abstract class TemplateGenerator {
  abstract generate(): string;
  
  public readonly toString = () => this.generate();
}

export function wrapInParentheses(content: string) {
  return `(${content})`;
}

export function wrapInBrackets(content: string) {
  return `[${content}]`;
}

export function wrapInBraces(content: string) {
  return `{${content}}`;
}