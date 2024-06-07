import { Request, Response } from "express";
import {
  // AppearanceProviderFor,
  PDFDocument, PDFField
  // PDFField,
  // PDFFont,
  // PDFHexString,
  // PDFName,
  // PDFRadioGroup,
  // PDFString,
  // PDFWidgetAnnotation,
  // StandardFonts,
  // cmyk,
  // defaultCheckBoxAppearanceProvider,
  // degrees,
  // drawCheckBox,
  // drawCheckMark,
  // drawEllipse,
  // drawRadioButton,
  // drawRectangle,
  // drawTextField,
  // grayscale,
  // rectangle,
  // rgb,
  // setFillingRgbColor
} from "pdf-lib";
import { sendBadResponse } from "../utils/send-bad-response";
import { GeneralConstants } from "../constants/general-constants";
import { readFile, writeFile, copyFile } from "fs/promises";
import { sendGoodResponse } from "../utils/send-good-response";
import path from "path";
// import fs from "fs";

export const labelPdf = async (req: Request, res: Response) => {
  try {
    const filename = req.body.filename;
    const filePath = path.resolve(GeneralConstants.uploadLocation, filename);

    const pdfDoc = await PDFDocument.load(await readFile(filePath), { ignoreEncryption: true });

    const newPdfDoc = await pdfDoc.copy();

    const pdfForm = newPdfDoc.getForm();
    const pdfFields: PDFField[] = pdfForm.getFields();
    console.log("🚀 ~ file: label-pdf.ts:45 ~ pdfFields:", pdfFields)

    pdfFields.forEach(field => {
      console.log(field.getName()) 
    })

    // const radioToBeRecreated: {
    //   radioFieldName: string;
    //   totalNumOfRadioOptions: number;
    //   dimens: { x: number; y: number; width: number; height: number }[];
    //   page: number;
    // }[] = [];

    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // pdfFields.forEach((field) => {
    //   try {
    //     if (field.constructor.name === "PDFTextField") {
    //       const fieldName = field.getName();
    //       const textField = pdfForm.getTextField(fieldName);
    //       textField.setText(fieldName);

    //       textField.updateAppearances(helveticaFont, (_, widget, __) => {
    //         const rectangle = widget.getRectangle();
    //         return drawTextField({
    //           color: rgb(1, 1, 1),
    //           x: rectangle.x,
    //           y: rectangle.y,
    //           width: rectangle.width,
    //           height: rectangle.height,
    //           borderWidth: 0,
    //           borderColor: undefined,
    //           textLines: [],
    //           textColor: rgb(1, 1, 1),
    //           font: "",
    //           fontSize: 0,
    //           padding: 0
    //         });
    //       });
    //     }
    //   } catch (e) {}
    // });

    // pdfFields.forEach(async (field) => {
    //   if (field.constructor.name === "PDFRadioGroup") {
    //     try {
    //       // radio group field name, it is the name used by all options that belong to one radio group
    //       const radioFieldName = field.getName();
    //       // reference to the radio group
    //       const radioGroup = pdfForm.getRadioGroup(radioFieldName);
    //       const radioOptions = radioGroup.getOptions();
    //       // total number of radio options of a radio group
    //       const totalNumOfRadioOptions = radioOptions.length;
    //       // acrofield of the pdf radio group component
    //       const radioGroupAcroField = radioGroup.acroField;
    //       // dimensions of each radio button widget
    //       const widgetDimens: { x: number; y: number; width: number; height: number }[] = [];
    //       // each radio button is a widget
    //       let currentWidgets = radioGroupAcroField.getWidgets();

    //       // get dimensions of each radio button widget for recreation in the later steps
    //       for (let i = 0; i < totalNumOfRadioOptions; i++) {
    //         const widget = currentWidgets[i];
    //         widgetDimens.push(widget.getRectangle());
    //       }

    //       // sort horizontal radio buttons so that the radio button value follows the ascending order (no value skipping)
    //       // correct: first button has value of 0, second button has value of 1
    //       // wrong: first button has value of 1, second button has value of 0
    //       for (let i = 0; i < widgetDimens.length - 1; i++) {
    //         if (widgetDimens[i].y === widgetDimens[i + 1].y) {
    //           widgetDimens.sort((a, b) => a.x - b.x);
    //         } else {
    //           widgetDimens.sort((a, b) => b.y - a.y);
    //         }
    //       }

    //       // get the page reference of the widget, only the first widget is required to be used as reference
    //       const pageRef = currentWidgets[0].P();
    //       // find which page has the same page reference object as the widget's page reference object, that indicates which page the widget is located
    //       const whichPage = pdfDoc.getPages().findIndex((page) => {
    //         return page.ref === pageRef;
    //       });

    //       // push widget info to an array for later recreation
    //       radioToBeRecreated.push({
    //         radioFieldName: radioFieldName,
    //         totalNumOfRadioOptions: totalNumOfRadioOptions,
    //         dimens: widgetDimens,
    //         page: whichPage
    //       });

    //       // remove widgets from PDF
    //       // this is required because removeField() itself is not sufficient to remove the whole radio group field without this
    //       while (currentWidgets.length) {
    //         radioGroupAcroField.removeWidget(0);
    //         currentWidgets = radioGroupAcroField.getWidgets();
    //       }

    //       // remove the field that holds the widgets
    //       const retrievedField = pdfForm.getField(radioFieldName);
    //       pdfForm.removeField(retrievedField);
    //     } catch (e) {
    //       console.log("🚀 ~ file: label-pdf.ts:54 ~ fields.forEach ~ e:", e);
    //     }
    //   }
    // });

    // recreate the radio group with the original field name, dimens, and style (as close as possible)
    // radioToBeRecreated.forEach(async (radioInfo, index) => {
    //   try {
    //     const radio = pdfForm.createRadioGroup(radioInfo.radioFieldName);
    //     for (let j = 0; j < radioInfo.totalNumOfRadioOptions; j++) {
    //       radio.addOptionToPage(j.toString(), pdfDoc.getPage(radioInfo.page));
    // radio.addOptionToPage(j.toString(), pdfDoc.getPage(radioInfo.page), {
    // x: radioInfo.dimens[j].x,
    // do not modify this value of 0.07
    // y: radioInfo.dimens[j].y,
    // do not modify this value of 0.5
    // width: radioInfo.dimens[j].width,
    // do not modify this value of 0.5
    // height: radioInfo.dimens[j].height
    // // // do not modify this value of 1
    // backgroundColor: undefined,
    // // // do not modify this value of 0.7
    // borderColor: undefined,
    // // // do not modify this value of 0.5
    // borderWidth: 0.6,

    //       radio.updateAppearances((field: any, widget: any) => {
    //         return {
    //           normal: {
    //             on: drawCheckBox({
    //               x: radioInfo.dimens[j].x,
    //               y: radioInfo.dimens[j].y,
    //               width: radioInfo.dimens[j].width,
    //               height: radioInfo.dimens[j].height,
    //               borderWidth: 0,
    //               color: rgb(123, 123, 0),
    //               borderColor: rgb(15, 152, 0),
    //               filled: false,
    //               markColor: rgb(123, 123, 0),
    //               thickness: 8
    //             }),
    //             off: drawCheckBox({
    //               x: radioInfo.dimens[j].x,
    //               y: radioInfo.dimens[j].y,
    //               width: radioInfo.dimens[j].width,
    //               height: radioInfo.dimens[j].height,
    //               borderWidth: 0,
    //               color: rgb(123, 123, 0),
    //               borderColor: rgb(15, 152, 0),
    //               filled: false,
    //               markColor: rgb(123, 123, 0),
    //               thickness: 8
    //             })
    //           },
    //           off: {
    //             on: drawCheckBox({
    //               x: radioInfo.dimens[j].x,
    //               y: radioInfo.dimens[j].y,
    //               width: radioInfo.dimens[j].width,
    //               height: radioInfo.dimens[j].height,
    //               borderWidth: 0,
    //               color: rgb(123, 123, 0),
    //               borderColor: rgb(15, 152, 0),
    //               filled: false,
    //               markColor: rgb(123, 123, 0),
    //               thickness: 8
    //             }),
    //             off: drawCheckBox({
    //               x: radioInfo.dimens[j].x,
    //               y: radioInfo.dimens[j].y,
    //               width: radioInfo.dimens[j].width,
    //               height: radioInfo.dimens[j].height,
    //               borderWidth: 0,
    //               color: rgb(123, 123, 0),
    //               borderColor: rgb(15, 152, 0),
    //               filled: false,
    //               markColor: rgb(123, 123, 0),
    //               thickness: 8
    //             })
    //           },
    //           on: {
    //             on: drawCheckBox({
    //               x: radioInfo.dimens[j].x,
    //               y: radioInfo.dimens[j].y,
    //               width: radioInfo.dimens[j].width,
    //               height: radioInfo.dimens[j].height,
    //               borderWidth: 0,
    //               color: rgb(123, 123, 0),
    //               borderColor: rgb(15, 152, 0),
    //               filled: false,
    //               markColor: rgb(123, 123, 0),
    //               thickness: 8
    //             }),
    //             off: drawCheckBox({
    //               x: radioInfo.dimens[j].x,
    //               y: radioInfo.dimens[j].y,
    //               width: radioInfo.dimens[j].width,
    //               height: radioInfo.dimens[j].height,
    //               borderWidth: 0,
    //               color: rgb(123, 123, 0),
    //               borderColor: rgb(15, 152, 0),
    //               filled: false,
    //               markColor: rgb(123, 123, 0),
    //               thickness: 8
    //             })
    //           }
    //         };
    //       });
    //     }
    //   } catch (e) {
    //     console.log("🚀 ~ file: label-pdf.ts:54 ~ fields.forEach ~ e:", e);
    //   }
    // });

    // const pdfBytes = await newPdfDoc.save();
    // await writeFile(filePath, pdfBytes);

    sendGoodResponse(res, 200, "PDF labelled and returned success");
  } catch (e: any) {
    sendBadResponse(res, 500, "return-labelled-pdf", "Fail to return labelled pdf", {
      error: e.stack
    });
  }
};
