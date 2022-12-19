import fs from "fs";
import path from "path";
import { currentDir, errorMessage } from "../index.js";

export async function cp(command) {
  if (command.split(" ").length < 3) {
    return console.log(errorMessage);
  }
  const enteredPath = command.split(" ")[1];
  const enteredNewPath = command.split(" ")[2];

  const filePath =
    enteredPath.split(path.sep).length === 1
      ? path.join(currentDir, enteredPath)
      : path.join(enteredPath);

  const folderPath =
    enteredNewPath.split(path.sep).length === 1
      ? path.join(currentDir, enteredNewPath)
      : enteredNewPath;

  const fullPath = path.join(folderPath, filePath.split(path.sep).slice(-1)[0]);

  try {
    await fs.promises.access(filePath);
    await fs.promises.access(fullPath);

    throw new Error("exist");
  } catch (error) {
    try {
      if (error.message === "exist") {
        throw new Error(errorMessage);
      }

      await fs.promises.access(filePath);
      fs.createReadStream(filePath)
        .pipe(fs.createWriteStream(fullPath))
        .on("error", () => {
          console.log(errorMessage);
        });
    } catch (error) {
      console.log(errorMessage);
    }
  }
}
