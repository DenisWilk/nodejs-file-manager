import fs from "fs/promises";
import {
  errorMessage,
  sucsessMessage,
  invalidInputMessage,
  // currentDir,
  getCurrentDir,
} from "../index.js";

export async function ls() {
  const currentDir = process.cwd();

  try {
    let folders = [];
    let files = [];

    await fs.access(currentDir);

    const items = await fs.readdir(currentDir, { withFileTypes: true });
    items.forEach((item) => {
      const element = {
        Name: item.name,
        Type: item.isFile() ? "file" : "directory",
      };

      item.isFile() ? files.push(element) : folders.push(element);
    });

    console.table([...folders, ...files]);
  } catch (err) {
    console.log(err.message);
  }
}
