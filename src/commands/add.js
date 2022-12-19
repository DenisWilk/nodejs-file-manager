import fs from "fs/promises";
import path from "path";
import { currentDir, errorMessage, sucsessMessage } from "../index.js";

export async function add(command) {
  const fileName = command.split(" ")[1];
  const filePath = path.join(currentDir, fileName);

  try {
    await fs.access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    try {
      if (error.message === errorMessage) {
        throw new Error(errorMessage);
      }
      await fs.writeFile(filePath, "");
      console.log(sucsessMessage);
    } catch (error) {
      console.log(errorMessage);
    }
  }
}
