import { promises as fs } from "fs";
import path from "path";
import { createHash } from "crypto";
import { currentDir, errorMessage } from "../index.js";

export async function hash(command) {
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
    const content = await fs.readFile(filePath);
    const hash = createHash("sha256").update(content).digest("hex");

    console.log(hash);
  } catch (error) {
    console.log(errorMessage);
  }
}
