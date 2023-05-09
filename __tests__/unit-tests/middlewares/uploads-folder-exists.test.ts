import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { UploadsFolderExists } from "../../../middlewares/custom/uploads-folder-exists";

describe("UploadsFolderExists middleware unit test", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = { status: jest.fn(), send: jest.fn() } as unknown as Response;
    next = jest.fn() as NextFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next function if uploads folder exists", () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    jest.spyOn(fs, "mkdirSync").mockImplementation();

    UploadsFolderExists(req, res, next);

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should call next function after the creation of uploads folder", () => {
    jest.spyOn(fs, "existsSync").mockImplementation().mockReturnValue(false);
    jest.spyOn(fs, "mkdirSync").mockImplementation();

    UploadsFolderExists(req, res, next);

    expect(fs.mkdirSync).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
