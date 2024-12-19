import { CommentGenerator } from "@/lib/templating/generator/comment.generator";
import { FunctionGenerator } from "@/lib/templating/generator/function.generator";
import { VariableGenerator } from "@/lib/templating/generator/variable.generator";

export type Command = {
  comment: CommentGenerator;
  export: FunctionGenerator | VariableGenerator;
};

export type MethodsShape = {
  Singleton?: {
    [key in keyof SingletonMethodName]: {
      comment: CommentGenerator;
      export: SingletonMethodName[key];
    };
  };
  Item?: {
    [key in keyof ItemMethodName]: {
      comment: CommentGenerator;
      export: ItemMethodName[key];
    };
  };
  Items?: {
    [key in keyof ItemsMethodName]: {
      comment: CommentGenerator;
      export: ItemsMethodName[key];
    };
  };
};

export type SingletonMethodName = {
  read?: FunctionGenerator;
  get?: VariableGenerator;
  update?: FunctionGenerator;
};
export type ItemMethodName = {
  read?: FunctionGenerator;
  get?: VariableGenerator;
  create?: FunctionGenerator;
  update?: FunctionGenerator;
  delete?: FunctionGenerator;
};
export type ItemsMethodName = {
  read?: FunctionGenerator;
  list?: VariableGenerator;
  create?: FunctionGenerator;
  update?: FunctionGenerator;
  updateBatch?: FunctionGenerator;
  delete?: FunctionGenerator;
  aggregate?: FunctionGenerator;
};
export type MethodName<T extends "Singleton" | "Items" | "Item"> =
  T extends "Singleton"
    ? keyof SingletonMethodName
    : T extends "Items"
      ? keyof ItemsMethodName
      : keyof ItemMethodName;
