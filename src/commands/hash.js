import { readFile } from "fs/promises";
import { resolve } from "path";
import { createHash } from "crypto";
import {
  errorMessage,
  sucsessMessage,
  invalidInputMessage,
  getCurrentDir,
} from "../index.js";

export async function hash(path) {
  if (path) {
    try {
      const text = await readFile(resolve(path));
      const hash = createHash("sha256").update(text).digest("hex");

      console.log(hash);
      console.log(sucsessMessage);

      getCurrentDir();
    } catch (error) {
      console.log(errorMessage);
    }
  } else {
    console.log(invalidInputMessage);
  }
}
