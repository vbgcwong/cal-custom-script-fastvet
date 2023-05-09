import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { GeneralConstants } from "../../constants/general-constants";
import format from "date-fns/format";

const storage = multer.diskStorage({
  destination: function (_, __, callback) {
    callback(null, GeneralConstants.uploadLocation);
  },
  filename: function (req, file, callback) {
    callback(null, `${format(new Date(), "yyyyMMddHHmmss")}_${req.body.userId}_${file.originalname}`);
  }
});

const fileFilter = (_: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype !== "application/pdf") {
    callback(new Error("PDF file format only!"));
  } else {
    callback(null, true);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
