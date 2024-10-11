import * as fs from "node:fs";
import path from "node:path";

export class Tree<T> {
  constructor() {}
  branches: Map<string, Tree<T> | T> = new Map();
  traverse(
    cb: (
      value: Tree<T> | T,
      path: string[],
      isEnd: boolean,
      tree: Tree<T>,
    ) => void,
    parent: Tree<T> = this,
    path: string[] = [],
  ) {
    this.branches.forEach((branch, key) => {
      cb(branch, [...path, key.toString()], true, parent ?? this);
      if (branch instanceof Tree) {
        branch.traverse(cb, parent, [...path, key]);
      }
    });
  }

  forEach(
    cb: (value: T, path: string[], isEnd: boolean, tree: this) => void,
    path: string[] = [],
  ) {
    this.traverse((branch, path) => {
      if (!(branch instanceof Tree)) {
        cb(branch, path, true, this);
      }
    }, this);
  }

  map<R>(
    cb: (value: T, path: string[], isEnd: boolean, tree: Tree<T>) => R,
    path: string[] = [],
  ) {
    const tree = new Tree<R>();
    this.branches.forEach((branch, key) => {
      if (branch instanceof Tree) {
        tree.branches.set(key, branch.map(cb));
      } else {
        tree.branches.set(key, cb(branch, [...path, key], true, this));
      }
    });
    return tree;
  }

  filter(
    cb: (value: T, path: string[], isEnd: boolean, tree: Tree<T>) => boolean,
    path: string[] = [],
  ) {
    const tree = new Tree<T>();
    this.branches.forEach((branch, key) => {
      if (branch instanceof Tree) {
        const filtered = branch.filter(cb, [...path, key]);
        if (filtered.branches.size) {
          tree.branches.set(key, filtered);
        }
      } else {
        if (cb(branch, [...path, key], true, this)) {
          tree.branches.set(key, branch);
        }
      }
    });
    return tree;
  }

  reduce<R>(
    cb: (acc: R, value: T, path: string[], isEnd: boolean, tree: Tree<T>) => R,
    acc: R,
  ) {
    let result = acc;
    this.forEach((value, path, isEnd, tree) => {
      result = cb(result, value, path, isEnd, tree);
    });
    return result;
  }
  
  toArrayWithMeta() {
    const arr: {value: T, path: string[], isEnd: boolean}[] = [];
    this.forEach((value, path, isEnd) => {
      arr.push({value, path, isEnd});
    });
    return arr;
  }
  
  toArray() {
    const arr: T[] = [];
    this.forEach((value) => {
      arr.push(value);
    });
    return arr;
  }
}

export const fsDeepTree = (dir: string) => {
  const files = fs.readdirSync(dir);
  const tree = new Tree<string>();
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      tree.branches.set(file, fsDeepTree(fullPath));
    } else if (stats.isFile()) {
      tree.branches.set(file, fullPath);
    }
  }
  return tree;
};
