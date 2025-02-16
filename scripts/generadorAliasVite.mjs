import { readdir } from "fs/promises";
import { resolve } from "path";

// Function to read the 'src' directory and list all folders
async function generateViteAliases() {
  const srcPath = resolve("src");
  try {
    const files = await readdir(srcPath, { withFileTypes: true });
    const folders = files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Generate aliases for Vite config
    const aliases = folders.map((acc, folder) => {
      const alias = acc.match(/[^a-zA-Z0-9_]/) ? `"${acc}"` : acc;
      return `${alias}: path.resolve(__dirname, "src/${acc}")`;
    });

    console.log("\n");
    console.log(aliases.join(",\n"));
    console.log("\n");
    console.log(
      "Copy the aliases above and paste them in your Vite config file."
    );
  } catch (error) {
    console.error("Error reading src directory:", error);
  }
}

generateViteAliases();
