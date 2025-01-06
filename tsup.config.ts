import { defineConfig } from "tsup";
import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";
import * as fs from "node:fs";

export default defineConfig((o) => ({
    entry: ["./src/**/*.{ts,tsx}", "!./src/**/*.test.{ts,tsx}"],
    format: ["cjs"],
    clean: true,
    minify: false,
    skipNodeModulesBundle: true,
    external: [],
    sourcemap: true,
    outDir: "dist",
    target: "esnext", // Set the target to the desired ECMAScript version
    tsconfig: "./tsconfig.json",
    bundle: false, // Enable bundling to handle imports correctly
    ...o,
}));
