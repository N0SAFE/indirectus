import * as path from "node:path";
import type { Registry } from "../registry";
import type { Schema } from "../schema";
import { fsDeepTree, Tree } from "../utils/tree";
import * as fs from 'node:fs';

export class DirGenerator {
  constructor(
    public readonly schema: Schema,
    public readonly registry: Registry,
  ) {}
  
  public generateTree(src: string) {
    if (!fs.existsSync(src)) {
        throw new Error(`the path ${src}`);
      }
      return fsDeepTree(src);
  }

  public getDirPaths(src: string) {
    const tree = this.generateTree(src);
    return tree.filter((value, p, isEnd) => {
      return value.endsWith('.dir.js')
    });
  }
}
