import { promises as fs, createReadStream } from "fs";
import path from "path";
import { currentDir, errorMessage } from "../index.js";

export async function cat(command) {
  const enteredPath = command.split(" ")[1];
  try {
    let filePath = "";
    if (enteredPath.split(path.sep).length === 1) {
      await fs.access(path.join(currentDir, enteredPath));
      filePath = path.join(currentDir, enteredPath);
    } else {
      await fs.access(enteredPath);
      filePath = path.join(enteredPath);
    }
    const stat = await fs.lstat(filePath);
    if (stat.isDirectory()) {
      throw new Error();
    }
    const readStream = createReadStream(filePath, "utf-8");
    readStream.on("data", function (chunk) {
      console.log(chunk);
    });
  } catch (error) {
    console.log(errorMessage);
  }
}
