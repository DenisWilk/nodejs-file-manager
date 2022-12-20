import { chdir } from "process";
import { homedir } from "os";
import { Writable } from "stream";
import { add } from "./commands/add.js";
import { cat } from "./commands/cat.js";
import { cd, up } from "./commands/cd.js";
import { cp } from "./commands/cp.js";
import { ls } from "./commands/ls.js";
import { mv } from "./commands/mv.js";
import { rm } from "./commands/rm.js";
import { rn } from "./commands/rn.js";
import { hash } from "./commands/hash.js";
import { compress } from "./commands/compress.js";
import { decompress } from "./commands/decompress.js";
import {
  displayArchitecture,
  displayCPUS,
  displayEOL,
  displayHomeDir,
  displayUserName,
} from "./commands/os.js";

export const sucsessMessage = "Operation completed successfully!";
export const errorMessage = "Error, operation failed!";
export const invalidInputMessage = "Check if the input is correct.";
export const currentDir = process.cwd();

const userName = process.argv.slice(2)[0].split("=")[1];

const runEnteredCommand = async (data) => {
  const [command, path, newPath] = data.toString().trim().split(" ");

  switch (command) {
    case "up":
      up(path);
      break;

    case "cd":
      cd(path);
      break;

    case "ls":
      await ls();
      break;

    case "cat":
      await cat(path);
      break;

    case "add":
      await add(path);
      break;

    case "rn":
      await rn(path, newPath);
      break;

    case "cp":
      await cp(path, newPath);
      break;

    case "mv":
      await mv(path, newPath);
      break;

    case "rm":
      await rm(path);
      break;

    case "os":
      if (path === "--EOL") {
        displayEOL();
      }
      if (path === "--cpus") {
        displayCPUS();
      }
      if (path === "--homedir") {
        displayHomeDir();
      }
      if (path === "--username") {
        displayUserName();
      }
      if (path === "--architecture") {
        displayArchitecture();
      }
      break;

    case "hash":
      await hash(path);
      break;

    case "compress":
      await compress(path, newPath);
      break;

    case "decompress":
      await decompress(path, newPath);
      break;

    case ".exit":
      path ? console.log(invalidInputMessage) : sayBye();
      break;

    default:
      console.log(invalidInputMessage);
      break;
  }
};

export function getCurrentDir() {
  console.log(`Current directory ${process.cwd()}`);
}

export function output() {
  return new Writable({
    decodeStrings: false,
    write(chunk, encoding, callback) {
      console.log(chunk);
      callback();
    },
  });
}

function sayHi() {
  console.log(`\x1b[35mWelcome to the File Manager, ${userName}!\n\x1b[0m`);
}

function sayBye() {
  console.log(`Thank you for using File Manager, ${userName}!\nGoodbye!`);
  process.exit();
}

chdir(homedir());
sayHi();
getCurrentDir();

process.stdin.on("data", runEnteredCommand);

process.on("SIGINT", () => {
  sayBye();
});
