import { Request, Response } from "express";
import { readFile } from "fs/promises";
import { PDFDocument, PDFField, rgb } from "pdf-lib";
import { PDFExtract } from "pdf.js-extract";

export const comparePdfs = async (req: Request, res: Response) => {
  console.log(req.files);

  const pdfExtract = new PDFExtract()

  if (req.files) {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const pdfDocOld = await PDFDocument.load(await readFile(files[0].path), { ignoreEncryption: true });
    const pdfFormOld = pdfDocOld.getForm();
    const pdfFieldsOld: PDFField[] = pdfFormOld.getFields();

    const pdfExtractLastPageOptions = {
      firstPage: 9,
      lastPage: 10,
    };

    const pdfExtractedData = await pdfExtract
    .extract(files[0].path, pdfExtractLastPageOptions)
    .then((data) => {
      // console.log("🚀 ~ file: patient.controller.js:2987 ~ .then ~ data:", data)

      let signatureObject = data.pages[0].content.filter((item) =>
        item.str.match(/[A-Za-z]+'s\ssignature*/i)
      )[0];
      console.log("🚀 ~ file: compare-pdfs.ts:38 ~ .then ~ data.pages[0].content:", data.pages[0].content)
      console.log("🚀 ~ file: compare-pdfs.ts:38 ~ .then ~ signatureObject:", signatureObject)

      if(!signatureObject) {
        signatureObject = data.pages[1].content.filter((item) =>
          item.str.match(/[A-Za-z]+'s\ssignature*/i)
        )[0];
      } else {

      }

      const pages = pdfDocOld.getPages()

      console.log(pages[9].getWidth())
      console.log(pages[9].getHeight())

      pages[9].drawRectangle({
        x: signatureObject.x,
        y: signatureObject.y,
        width: 100,
        height: 10,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1.5,
      })
    })


    const pdfDocNew = await PDFDocument.load(await readFile(files[1].path), { ignoreEncryption: true });
    const pdfFormNew = pdfDocNew.getForm();
    const pdfFieldsNew: PDFField[] = pdfFormNew.getFields();

    const numOfFields = pdfFieldsOld.length > pdfFieldsNew.length ? pdfFieldsOld.length : pdfFieldsNew.length;
    console.log("🚀 ~ file: compare-pdfs.ts:19 ~ comparePdfs ~ pdfFieldsOld.length:", pdfFieldsOld.length);
    console.log("🚀 ~ file: compare-pdfs.ts:19 ~ comparePdfs ~ pdfFieldsNew.length:", pdfFieldsNew.length);

    try {
      for (let i = 0; i < numOfFields; i++) {
        if (pdfFieldsOld[i].getName() !== pdfFieldsNew[i].getName()) {
          // console.log("🚀 ~ file: compare-pdfs.ts:24 ~ comparePdfs ~ pdfFieldsOld[i]:", pdfFieldsOld[i].getName());
          // console.log("🚀 ~ file: compare-pdfs.ts:24 ~ comparePdfs ~ pdfFieldsNew[i]:", pdfFieldsNew[i].getName());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  res.status(200).json("Ok");
};
