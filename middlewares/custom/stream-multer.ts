import { NextFunction, Request, Response } from "express";
import { sendBadResponse } from "../../utils/send-bad-response";
import { upload, uploadMemory } from "./common-multer-code";
import multer from "multer";

export function StreamMulter(fieldName: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    uploadMemory.single(fieldName)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        sendBadResponse(res, 400, "file-upload", "Multer error uploading file", err);
      } else if (err instanceof Error) {
        sendBadResponse(res, 400, "file-upload", "Error uploading file", err.message);
      } else if (err) {
        sendBadResponse(res, 400, "file-upload", "Error uploading file (other)", err);
      } else {
        if (!req.file) {
          sendBadResponse(res, 404, "file-upload", "No file is being uploaded as payload");
        } else {
          next();
        }
      }
    });
  };
}