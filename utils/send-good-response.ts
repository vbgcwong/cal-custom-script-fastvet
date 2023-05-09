import { Response } from "express";

/**
 *
 * @param res Response object
 * @param code HTTP status code
 * @param message Will return "No message" by default if message.length === 0
 * @param info Any info value of type string, object, and array will be accepted
 */
export function sendGoodResponse(res: Response, code: number, message: string, info?: string | Record<string, unknown> | unknown[]) {
  // TODO:  add logging

  res.status(200).send({
    code: code,
    message: message.length === 0 ? "No message" : message,
    info: info
  });
}
