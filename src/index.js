import fs from "fs/promises";
import path, { resolve, join } from "path";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { homedir } from "os";

export const errorMessage = "Error, operation failed!";
export let currentDir = process.cwd();

const readline = createInterface({ input, output });
const userName = process.argv.slice(2)[0].split("=")[1];

function sayHi() {
  console.log(`\x1b[35mWelcome to the File Manager, ${userName}!\n\x1b[0m
   You are currently in ${homedir()}\n`);
}
sayHi();

async function runEnteredCommand(command) {
  switch (command.split(/\s+/)[0]) {
    case "cd":
      
      const newDir = command.split(" ").slice(1).join(" ").replace(/["']/g, "");
      cd(newDir);
      break;

    case "up":
      if (currentDir === homedir()) {
        break;
      }
      currentDir = join(currentDir, "..");
      break;

    case "ls":
      ls();
      break;

    case "cat":
      cat(command);
      break;

    case "add":
      add(command);
      break;

    case "rn":
      rn(command);
      break;

    case "cp":
      cp(command);
      break;

    case "mv":
      mv(command);
      break;

    case "rm":
      rm(command);
      break;

    case "os":
      if (command.split(/\s+/)[1] === "--EOL") {
        displayEOL();
      }
      if (command.split(/\s+/)[1] === "--cpus") {
        displayCPUS();
      }
      if (command.split(/\s+/)[1] === "--homedir") {
        displayHomeDir();
      }
      if (command.split(/\s+/)[1] === "--username") {
        displayUserName();
      }
      if (command.split(/\s+/)[1] === "--architecture") {
        displayArchitecture();
      }
      break;

    case "hash":
      hash(command);
      break;

    case "compress":
      await compressFile(currentPath, argument, argument2);
      break;

    case ".exit":
      break;

    default:
      console.log(
        "\nIncorrect command! Enter 'help' for display a list of commands.\n"
      );
  }
}

readline
  .on("line", (command) => {
    runEnteredCommand(command);
    if (command.split(/\s+/)[0] !== "cd") {
      console.log(`Currently directory: ${currentDir}`, "\n");
    }
    if (command === ".exit") readline.close();
  })
  .on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}!\nGoodbye!`);
    process.exit(0);
  });
