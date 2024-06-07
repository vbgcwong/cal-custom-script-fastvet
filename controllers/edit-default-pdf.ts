import { Request, Response } from "express";
import path from "path";
import { AcroFieldFlags, PDFBool, PDFDocument, PDFField, PDFName, StandardFonts, TextAlignment } from "pdf-lib";
import { readFile, readdir, writeFile } from "fs/promises";
import { sendGoodResponse } from "../utils/send-good-response";
import { sendBadResponse } from "../utils/send-bad-response";

/**
 *
 * Modify properties of pdf document
 *
 * 1) font size
 * 2) left align texts
 * 3) Use HelveticaFont
 * 4) disable scrolling for long texts that overflow the textbox
 * 5) disable rich text formatting
 */
export const editDefaultPdf = async (req: Request, res: Response) => {
  try {
    // DO THIS: replace the file path
    const directoryPath = "C:\\Users\\CalWong\\Downloads";
    // const directoryPath = "c:\\Users\\CalWong\\Downloads\\DBQs - 2023 - Copy\\released 2022";
    const files = await readdir(directoryPath);
    // const filename = req.body.filename;
    // const filePath = path.resolve(GeneralConstants.uploadLocation, filename);

    // for (const filename of files) {
      // if (filename === ("Neck_Conditions_Cervical_Spine - Copy.pdf")) {
        const filePath = path.resolve(directoryPath, "IBS_2023.pdf");

        const pdfDoc = await PDFDocument.load(await readFile(filePath), { ignoreEncryption: true });
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pdfForm = pdfDoc.getForm();
        pdfForm.deleteXFA();
        const pdfFields: PDFField[] = pdfForm.getFields();

        pdfFields.forEach(async (field) => {
          try {
            if (field.constructor.name === "PDFTextField") {
              const fieldName = field.getName();
              const textField = pdfForm.getTextField(fieldName);
              textField.enableMultiline()
              textField.disableRichFormatting();

              textField.setFontSize(6.4);
              textField.updateAppearances(helveticaFont);
              textField.disableScrolling();
              textField.setAlignment(TextAlignment.Left);
              textField.disableReadOnly()

              // textField.setText("ffffffffff")

              // textField.setText(
              //   ""
              //   // "volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis"
              // );
            }

            if(field.constructor.name === "PDFRadioGroup") {
              const fieldName = field.getName();
              const radioField = pdfForm.getRadioGroup(fieldName);

              radioField.disableReadOnly()
            }

            if(field.constructor.name === "PDFCheckBox") {
              const fieldName = field.getName();
              const checkboxField = pdfForm.getCheckBox(fieldName);

              checkboxField.disableReadOnly()
            }
          } catch (e) {
            console.log(e);
          }
        });

        // pdfForm.acroForm.dict.set(PDFName.of("NeedAppearances"), PDFBool.True)

        const pdfBytes = await pdfDoc.save();
        await writeFile(filePath, pdfBytes);
      // }
    // }
    res.send(200)

    // sendGoodResponse(res, 200, "Font size changed successfully");
  } catch (e) {
    sendBadResponse(res, 500, "Failed to change font size", "Failed to change font size", {
      error: (e as Error).stack
    });
  }
};
