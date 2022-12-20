import { resolve, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { rm } from "fs/promises";
import {
  errorMessage,
  sucsessMessage,
  invalidInputMessage,
  currentDir,
  getCurrentDir,
} from "../index.js";

export async function mv(path, newPath) {
  if (path && newPath) {
    const filePath = resolve(path);
    const { base } = parse(filePath);
    const targetFilePath = resolve(newPath, base);
    try {
      const readStream = createReadStream(filePath);
      const writeStream = createWriteStream(targetFilePath);

      await pipeline(readStream, writeStream);
      await rm(filePath);
      console.log(sucsessMessage);
      getCurrentDir();
    } catch (error) {
      console.log(errorMessage);
    }
  } else {
    console.log(invalidInputMessage);
  }
}
