export const toMethodShape = (method: itemTemplates.methods
): MethodShape => {
  return {
    name: method.name,
    description: method.description,
    type: method.type,
    parameters: method.parameters.map(toParameterShape),
    returns: method.returns.map(toReturnShape),
    modifiers: method.modifiers,
    decorators: method.decorators.map(toDecoratorShape),
  };
};
