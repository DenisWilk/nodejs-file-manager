import { chdir } from "process";
import { resolve } from "path";
import { errorMessage, invalidInputMessage, getCurrentDir } from "../index.js";

export function up(path) {
  try {
    if (path) {
      console.log(invalidInputMessage);
    } else {
      chdir("..");
      getCurrentDir();
    }
  } catch {
    console.log(errorMessage);
  }
}

export function cd(path) {
  try {
    if (path) {
      chdir(resolve(path));
      console.log(getCurrentDir());
    } else {
      console.log(invalidInputMessage);
    }
  } catch {
    console.log(errorMessage);
  }
}
