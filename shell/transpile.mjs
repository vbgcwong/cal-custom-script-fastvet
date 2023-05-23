import shell from "shelljs";
import fs from "fs"

const SUCCESS = 0;
const appEnv = process.argv[2]
const STAGING = "staging"
const PROD = "prod"
const DEV = "dev"
const ORIGINAL_TSCONFIG_JSON = "tsconfig.json"
const TEMP_TSCONFIG_JSON = "tsconfig.temp.json"
const STAGING_BUILD_DIR = "./build/staging"
const PROD_BUILD_DIR = "./build/prod"
const DEV_BUILD_DIR = "./build/dev"

let buildDir = ""

if (appEnv === DEV) {
  buildDir = DEV_BUILD_DIR
} else if (appEnv === STAGING) {
  buildDir = STAGING_BUILD_DIR
} else if (appEnv === PROD) {
  buildDir = PROD_BUILD_DIR
}

shell.echo(`Transpiling exam builder......(${new Date()})`);

if (shell.cp("-f", ORIGINAL_TSCONFIG_JSON, TEMP_TSCONFIG_JSON).code === SUCCESS) {
  shell.echo(`Created ${TEMP_TSCONFIG_JSON}`)

  const tsconfigContents = fs.readFileSync(TEMP_TSCONFIG_JSON)
  const parsedTsConfigContents = JSON.parse(tsconfigContents)
  parsedTsConfigContents.compilerOptions.noEmit = false
  parsedTsConfigContents.compilerOptions.outDir = buildDir
  if (appEnv === DEV) {
    parsedTsConfigContents.compilerOptions.sourceMap = true
    parsedTsConfigContents.compilerOptions.declaration = true
  }
  const updatedTsConfigContents = JSON.stringify(parsedTsConfigContents, null, 2)
  try {
    fs.writeFileSync(TEMP_TSCONFIG_JSON, updatedTsConfigContents)
  } catch (e) {
    shell.echo(`Error updating ${TEMP_TSCONFIG_JSON} with error ${e}`)
  }
}

if (shell.test("-e", buildDir)) {
  shell.echo(`Removing old ${buildDir} folder...`)
  if (shell.rm("-r", buildDir).code === SUCCESS) {
    shell.echo(`Old ${buildDir} folder removed`);
  }
} else {
  shell.echo(`${buildDir} folder does not exist, proceed with the next transpiling steps`);
}

shell.echo("Transpiling...");

if (shell.exec(`tsc -p ${TEMP_TSCONFIG_JSON}`).code === SUCCESS) {
  shell.echo(`Transpile completed.(${new Date()})`);
} else {
  shell.echo("Failed to transpile exam builder");
}

if (shell.rm("-f", TEMP_TSCONFIG_JSON).code === SUCCESS) {
  shell.echo(`Removed temp file ${TEMP_TSCONFIG_JSON}`)
}

if (appEnv === PROD) {
  if (shell.rm("-r", `${buildDir}/__tests__`).code === SUCCESS) {
    shell.echo("Test folder removed from production build")
  }
}

if (appEnv === PROD) {
  const packageJsonContents = fs.readFileSync(`${PROD_BUILD_DIR}/package.json`)
  const parsedPackageJsonContents = JSON.parse(packageJsonContents)
  delete parsedPackageJsonContents.scripts
  delete parsedPackageJsonContents.devDependencies
  const updatedPackageJsonContents = JSON.stringify(parsedPackageJsonContents, null, 2)

  try {
    fs.writeFileSync(`${PROD_BUILD_DIR}/package.json`, updatedPackageJsonContents)
  } catch (e) {
    shell.echo(`Error updating ${PROD_BUILD_DIR}/package.json with error ${e}`)
  }
}

shell.exit(0);
