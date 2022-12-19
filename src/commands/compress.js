import fs from "fs";
import path from "path";
import { createBrotliCompress } from "zlib";
import { currentDir, errorMessage, sucsessMessage } from "../index.js";

export function compress(command) {
  if (command.split(" ").length < 3) {
    return console.log(errorMessage);
  }
  const enteredPath = command.split(" ")[1];
  const enteredTargetPath = command.split(" ")[2];

  const filePath =
    enteredPath.split(path.sep).length === 1
      ? path.join(currentDir, enteredPath)
      : path.join(enteredPath);

  const archivePath =
    enteredTargetPath.split(path.sep).length === 1
      ? path.join(currentDir, enteredTargetPath)
      : enteredTargetPath;

  try {
    const brotli = createBrotliCompress();
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(archivePath);
    const stream = readStream.pipe(brotli).pipe(writeStream);

    readStream.on("error", () => {
      console.log(errorMessage);
    });
    writeStream.on("error", () => {
      console.log(errorMessage);
    });
    stream.on("finish", () => {
      console.log(sucsessMessage);
    });
  } catch (error) {
    console.log(error.message);
  }
}
