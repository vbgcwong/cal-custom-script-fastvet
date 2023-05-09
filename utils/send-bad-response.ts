import { Response } from "express";
import { getShortUid } from "./get-short-uid";

/**
 *
 * @param res Response object
 * @param code HTTP status code
 * @param operation Type of operation (indicator to tell which operation it fails)
 * @param message Will return "No message" by default if message.length === 0
 * @param info Any info value of type string, object, and array will be accepted
 */
export function sendBadResponse(
  res: Response,
  code: number,
  operation: string = "general",
  message: string,
  info?: string | Record<string, unknown> | unknown[] | unknown
): void {
  // TODO:  add logging
  res.status(code).send({
    code: code,
    errorOperation: operation,
    errorId: `${operation}-${getShortUid()}`,
    message: message.length === 0 ? "No message" : message,
    info: info
  });
}
