import { chdir } from "process";
import { resolve } from "path";
import { errorMessage, directoryMessage, noPathMessage } from "../index.js";

export function up(path) {
  try {
    if (path) {
      console.log(noPathMessage);
    } else {
      chdir("..");
    }
  } catch {
    console.log(errorMessage);
  }
}

export function cd(path) {
  try {
    if (path) {
      chdir(resolve(path));
      console.log(directoryMessage);
    } else {
      console.log(noPathMessage);
    }
  } catch {
    console.log(errorMessage);
  }
}
