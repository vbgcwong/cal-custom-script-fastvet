import express, { Router } from "express";
import { MultipleUploadMulter } from "../middlewares/custom/multiple-upload-multer";
import { SingleUploadMulter } from "../middlewares/custom/single-upload-multer";
import { UploadsFolderExists } from "../middlewares/custom/uploads-folder-exists";
import { uploadPdf } from "../controllers/upload-pdf";

export const postRouter: Router = express.Router();

postRouter.post("/upload-pdf", UploadsFolderExists, SingleUploadMulter("single"), uploadPdf);
postRouter.post("/upload-multiple-pdfs", UploadsFolderExists, MultipleUploadMulter("multiple"), uploadPdf);
