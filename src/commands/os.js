import { arch, cpus, EOL, homedir, userInfo } from "os";

export function displayArchitecture() {
  console.log(`Processor architecture: ${arch()}`);
}

export function displayCPUS() {
  console.log(cpus());
}

export function displayEOL() {
  console.log("End-Of-Line:", JSON.stringify(EOL));
}

export function displayHomeDir() {
  console.log("Home directory:", homedir());
}

export function displayUserName() {
  console.log(`User name: ${userInfo().username}`);
}
