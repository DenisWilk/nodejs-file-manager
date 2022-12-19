import fs from "fs";
import path from "path";
import { currentDir, errorMessage } from "../index.js";

export async function rm(command) {
  try {
    const enteredPath = command.split(" ")[1];
    const filePath =
      enteredPath.split(path.sep).length === 1
        ? path.join(currentDir, enteredPath)
        : path.join(enteredPath);

    await fs.promises.access(filePath);
    fs.promises.unlink(filePath);
  } catch (error) {
    console.log(errorMessage);
  }
}
