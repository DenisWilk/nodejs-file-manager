import { open } from "fs/promises";
import { resolve } from "path";
import {
  errorMessage,
  invalidInputMessage,
  sucsessMessage,
  getCurrentDir,
} from "../index.js";

export async function add(path) {
  let file;
  try {
    if (path) {
      file = await open(resolve(process.cwd(), path), "w");
      console.log(sucsessMessage);
      getCurrentDir();
    } else {
      console.log(invalidInputMessage);
    }
  } catch (error) {
    console.log(errorMessage);
  } finally {
    file?.close();
  }
}
