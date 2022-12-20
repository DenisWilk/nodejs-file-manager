import { rm as remove } from "fs/promises";
import { resolve } from "path";
import {
  errorMessage,
  sucsessMessage,
  invalidInputMessage,
  getCurrentDir,
} from "../index.js";

export async function rm(path) {
  if (path) {
    try {
      await remove(resolve(path));

      console.log(sucsessMessage);
      getCurrentDir();
    } catch (error) {
      console.log(errorMessage);
    }
  } else {
    console.log(invalidInputMessage);
  }
}
