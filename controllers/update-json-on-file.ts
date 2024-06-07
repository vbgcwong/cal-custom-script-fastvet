import { footJsonNew, footJsonOld } from "../constants/footJsonUpdate"
import fs from "fs"
import readline from 'readline'
export const updateJsonOnFile = () => {
  const filePath = "C:\\Users\\CalWong\\Desktop\\exam-builder-node\\constants\\wrongjson.txt";

  const readStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  let newFileContent = "";

  rl.on("line", (line) => {
    let modifiedLine = line
    for (let i = 0; i < footJsonOld.length; i++) {
      if (modifiedLine.includes(footJsonOld[i])) {
        modifiedLine = modifiedLine.replace(footJsonOld[i], footJsonNew[i])
      }
    }
    newFileContent += modifiedLine + "\n";
  });

  rl.on("close", () => {
    // All lines are read and processed
    console.log("File has been processed. Writing to the original file...");
    // Write the modified content back to the file
    fs.writeFile(filePath, newFileContent, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      console.log("File has been updated successfully.");
    });
  });
}