import { Request, Response } from "express";
import { sendGoodResponse } from "../utils/send-good-response";

export function uploadPdf(req: Request, res: Response) {
  sendGoodResponse(res, 200, "", req.body);
}
