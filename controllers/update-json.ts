import { Request, Response } from "express";
import fs from "fs";
import readline from "readline";
import { readFile } from "fs/promises";
import { PDFDocument, PDFField } from "pdf-lib";

export const updateJson = async (req: Request, res: Response) => {
  if (req.files) {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const pdfDocOld = await PDFDocument.load(await readFile(files[0].path), { ignoreEncryption: true });
    const pdfFormOld = pdfDocOld.getForm();
    const pdfFieldsOld: PDFField[] = pdfFormOld.getFields();

    const pdfDocNew = await PDFDocument.load(await readFile(files[1].path), { ignoreEncryption: true });
    const pdfFormNew = pdfDocNew.getForm();
    const pdfFieldsNew: PDFField[] = pdfFormNew.getFields();

    if (pdfFieldsOld.length !== pdfFieldsNew.length) {
      res.status(200).json("Different PDFs detected");
      return;
    }

    const oldFieldNameArray: string[] = [];
    const newFieldNameArray: string[] = [];
    const fieldNameRegex = /[^"`]*\[[^"`]*\][^"`]*\.[^"`]*/g;

    try {
      for (let i = 0; i < pdfFieldsOld.length; i++) {
        oldFieldNameArray.push(pdfFieldsOld[i].getName());
      }

      for (let i = 0; i < pdfFieldsNew.length; i++) {
        newFieldNameArray.push(pdfFieldsNew[i].getName());
      }
    } catch (e) {
      console.log(e);
    }

    const readStream = fs.createReadStream(files[2].path);
    const writeStream = fs.createWriteStream(files[2].destination + "/" + files[2].originalname);
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });

    rl.on("line", (line) => {
      const match = fieldNameRegex.exec(line);

      if (match !== null) {        
        const foundIndex = oldFieldNameArray.findIndex((item) => {
          return item === match[0]
        });

        if(foundIndex !== -1) {
          const newLine = line.replace(fieldNameRegex, `${newFieldNameArray[foundIndex]}`);
          writeStream.write(newLine + "\n");
        } else {
          const newLine = line;
          writeStream.write(newLine + "\n");
        }
      } else {
        writeStream.write(line + "\n");
      }
    });

    rl.on("close", () => {
      console.log("Finished processing the file.");
      writeStream.close();
    });

    readStream.on("error", (err) => {
      console.error("Error reading the file:", err);
    });

    writeStream.on("error", (err) => {
      console.error("Error writing to the file:", err);
    });
  }

  res.status(200).json("Ok");
};
