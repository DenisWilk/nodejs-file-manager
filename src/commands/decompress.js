import fs from "fs";
import { createBrotliDecompress } from "zlib";
import {
  errorMessage,
  sucsessMessage,
  currentDir,
} from "../index.js";

export async function decompress(path, newPath) {
  if (command.split(" ").length < 3) {
    return console.log(errorMessage);
  }

  const archivePath =
    path.split(path.sep).length === 1
      ? path.join(currentDir, path)
      : path.join(path);

  const newFilePath =
    newPath.split(path.sep).length === 1
      ? path.join(currentDir, newPath)
      : newPath;

  try {
    const brotli = createBrotliDecompress();
    const readStream = fs.createReadStream(archivePath);
    const writeStream = fs.createWriteStream(newFilePath);
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
