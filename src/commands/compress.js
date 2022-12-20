import fs from "fs";
import path from "path";
import { createBrotliCompress } from "zlib";
import {
  errorMessage,
  sucsessMessage,
  currentDir,
} from "../index.js";

export async function compress(path, newPath) {
  if (command.split(" ").length < 3) {
    return console.log(errorMessage);
  }

  const filePath =
    path.split(path.sep).length === 1
      ? path.join(currentDir, path)
      : path.join(path);

  const archivePath =
    newPath.split(path.sep).length === 1
      ? path.join(currentDir, newPath)
      : newPath;

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
