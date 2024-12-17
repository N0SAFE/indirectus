import semver from "semver";

const t = semver.compareIdentifiers("13.1.0", "13.0.0");
const r = semver.toComparators("13.1.0")!;

const dirs = ["13.0.0", "13.1.0", "13.2.0", "13.3.0", "12.0.0"];

console.log(dirs.sort(semver.compare))

const version = "13.1.0";

let smallest: string | null = null;

for (const dir of dirs) {
  console.log({
    dir,
    version,
    smallest,
  });
  if (
    semver.valid(dir) &&
    (semver.compareIdentifiers(dir, smallest) < 0 || smallest === null)
  ) {
    smallest = dir as `${number}.${number}.${number}`;
  }
}

console.log(smallest);
