import { promises as fs } from "fs";
import path from "path";
import { currentDir, errorMessage } from "../index.js";

export async function rn(command) {
  let filePath = "";
  const enteredPath = command.split(" ")[1];
  const newName = command.split(" ")[2];

  try {
    if (enteredPath.split(path.sep).length === 1) {
      await fs.access(path.join(currentDir, enteredPath));
      filePath = path.join(currentDir, enteredPath);
    } else {
      await fs.access(enteredPath);
      filePath = path.join(enteredPath);
    }
    await fs.access(filePath, "..", newName);
    throw new Error(errorMessage);
  } catch (error) {
    try {
      if (error.message === errorMessage) {
        throw new Error(errorMessage);
      }
      await fs.rename(filePath, path.join(filePath, "..", newName));
      console.log("Files had been renamed succesfully");
    } catch (error) {
      console.log(errorMessage);
    }
  }
}
