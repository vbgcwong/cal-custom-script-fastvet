import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { GeneralConstants } from "../../constants/general-constants";
import { sendBadResponse } from "../../utils/send-bad-response";

export function UploadsFolderExists(_: Request, res: Response, next: NextFunction) {
  if (fs.existsSync(GeneralConstants.uploadLocation)) {
    next();
  } else {
    try {
      fs.mkdirSync(GeneralConstants.uploadLocation);
      next();
    } catch (e: any) {
      sendBadResponse(res, 500, "create-uploads-folder", "Failed to create uploads temp folder", e.toString());
    }
  }
}
