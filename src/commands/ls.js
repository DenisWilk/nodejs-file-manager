import fs from "fs/promises";
import { currentDir } from "../index.js";

export async function ls() {
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
