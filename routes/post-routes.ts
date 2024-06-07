import express, { Router } from "express";
import { MultipleUploadMulter } from "../middlewares/custom/multiple-upload-multer";
import { SingleUploadMulter } from "../middlewares/custom/single-upload-multer";
import { UploadsFolderExists } from "../middlewares/custom/uploads-folder-exists";
import { uploadPdf } from "../controllers/upload-pdf";
import { labelPdf } from "../controllers/label-pdf";
import { editDefaultPdf } from "../controllers/edit-default-pdf";
import { sugarSeach } from "../controllers/sugar-search";
import { ClamFileScan } from "../middlewares/custom/clam-file-scan";
import { StreamMulter } from "../middlewares/custom/stream-multer";
import { comparePdfs } from "../controllers/compare-pdfs";
import { updateJson } from "../controllers/update-json";

export const postRouter: Router = express.Router();

// postRouter.post("/upload-pdf", UploadsFolderExists, SingleUploadMulter("single"), ClamFileScan, uploadPdf);
// postRouter.post("/upload-pdf", UploadsFolderExists, StreamMulter("single"), ClamFileScan, uploadPdf);
postRouter.post("/compare-pdfs", MultipleUploadMulter("multiple"), comparePdfs);
postRouter.post("/update-json", MultipleUploadMulter("multiple"), updateJson);
postRouter.post("/upload-multiple-pdfs", UploadsFolderExists, MultipleUploadMulter("multiple"), uploadPdf);
postRouter.post("/label-pdf", labelPdf);
postRouter.post("/edit-default-pdf", editDefaultPdf);

postRouter.post("/sugar-search", sugarSeach);
