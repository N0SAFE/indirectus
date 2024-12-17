import semver from "semver";

export type Version = `${number}.${number}.${number}`;

export class Versionner {
  public static getSmallestVersion(versions: Version[]) {
    let smallest: Version | null = null;

    for (const version of versions) {
      if (
        semver.valid(version) &&
        (semver.compareIdentifiers(version, smallest) < 0 || smallest === null)
      ) {
        smallest = version;
      }
    }

    return smallest;
  }

  public static getCLosestVersion(
    versions: Version[],
    versionToCheck: Version,
  ) {
    let closest: Version | null = null;

    for (const version of versions) {
      if (
        semver.valid(version) &&
        semver.compareIdentifiers(versionToCheck, version) >= 0 &&
        (semver.compareIdentifiers(version, closest) >= 0 || closest === null)
      ) {
        closest = version;
      }
    }

    return closest;
  }

  public static sortVersions(versions: Version[]) {
    return versions.sort(semver.compare);
  }

  public static getAllPreviousVersions(
    versions: Version[],
    versionToCheck: Version,
  ) {
    return versions.filter((version) =>
      semver.compareIdentifiers(version, versionToCheck) < 0,
    );
  }
}
