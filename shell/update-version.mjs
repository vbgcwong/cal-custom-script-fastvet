import fs from "fs"

const appVersion = process.argv[2];

const packageJsonContents = fs.readFileSync("package.json");
const parsedPackageJsonContents = JSON.parse(packageJsonContents);
parsedPackageJsonContents.version = appVersion.toString();
const updatedPackageJsonContents = JSON.stringify(parsedPackageJsonContents, null, 2);
try {
  fs.writeFileSync(`package.json`, updatedPackageJsonContents);
} catch (e) {
  console.log(`Error updating package.json with error ${e}`);
}
