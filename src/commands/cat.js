import { promises as fs, createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { resolve } from "path";
import {
  errorMessage,
  invalidInputMessage,
  getCurrentDir,
  output,
} from "../index.js";

export async function cat(path) {
  try {
    if (path) {
      const readStream = createReadStream(resolve(path), { encoding: "utf8" });
      await pipeline(readStream, output());
      getCurrentDir();
    } else {
      console.log(invalidInputMessage);
    }
  } catch (error) {
    console.log(errorMessage);
  }
}
