import { dirname, resolve } from "path";
import { rename as createNewName } from "fs/promises";
import {
  errorMessage,
  sucsessMessage,
  invalidInputMessage,
  getCurrentDir,
} from "../index.js";

export async function rn(path, newPath) {
  if (path && newPath) {
    if (
      newPath.includes("/") ||
      newPath.includes("\\") ||
      newPath.includes(":") ||
      newPath.includes("*") ||
      newPath.includes("?") ||
      newPath.includes("<") ||
      newPath.includes(">") ||
      newPath.includes("|") ||
      newPath.includes('"')
    ) {
      console.log(errorMessage);
      return;
    }
    const oldFile = resolve(path);
    const newFile = resolve(dirname(oldFile), newPath);
    try {
      await createNewName(oldFile, newFile);
      console.log(sucsessMessage);
      cp;
      getCurrentDir();
    } catch (error) {
    }
  } else {
    console.log(invalidInputMessage);
  }
}
