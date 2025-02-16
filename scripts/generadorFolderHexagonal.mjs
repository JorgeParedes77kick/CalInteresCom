import { promises as fs } from "fs";
import { join, resolve } from "path";

const foldersToCreate = [
  "__test__",
  "assets",
  "components",
  "contexts",
  "hooks",
  "models",
  "pages",
  "redux",
  "services",
  "styled-components",
  "types",
  "utilities",
]; // X will be this array

async function createFolders(basePath, folders) {
  for (const folder of folders) {
    const folderPath = join(basePath, folder);
    try {
      await fs.mkdir(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    } catch (error) {
      console.error(`Error creating folder ${folderPath}:`, error);
    }
  }
}

async function main() {
  const basePath = resolve("src");
  await createFolders(basePath, foldersToCreate);
}

main().catch(console.error);
