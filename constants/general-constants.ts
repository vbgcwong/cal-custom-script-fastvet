import path from "path";
import { GeneralConstantsType } from "./general-constants.types";

export const GeneralConstants: GeneralConstantsType = {
  uploadLocation: path.resolve(__dirname, "../uploads"),
  development: "development",
  staging: "staging",
  production: "production"
};
