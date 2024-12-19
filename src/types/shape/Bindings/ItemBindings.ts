import {
  ClassMethodGenerator,
  ClassPropertyGenerator,
} from "@/lib/templating/generator/class.generator";

export type SingletonMethods = "read" | "update";
export type ItemsMethods =
  | "create"
  | "query"
  | "find"
  | "update"
  | "updateBatch"
  | "remove"
  | "aggregate";
export type ItemMethods = "create" | "get" | "update" | "remove";
export type Methods = {
  Singleton: SingletonMethods;
  Items: ItemsMethods;
  Item: ItemMethods;
};

export type ClassesOptions<Class extends keyof Methods> = {
  methods?: ClassMethodGenerator[];
  properties?: ClassPropertyGenerator[];
  methodLines?: Record<Methods[Class], string[]>;
};

export type Variables = {
  collectionName: string;
  collectionString: string;
  collectionType: string;
  genericQuery: string;
  genericQueryArray: string;
  genericOutput: string;
  genericOutputArray: string;
  genericOutputVoid: string;
  applyType: string;
};
